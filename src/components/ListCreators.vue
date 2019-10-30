<template>
  <v-card>
    <v-card-text>
      <h1 class="my-4">
        作者&nbsp;
        <v-btn text small @click="show_flg = !show_flg">
          <template v-if="show_flg">非表示</template>
          <template v-else>表示</template>
        </v-btn>
      </h1>

      <v-card class="mb-5" color="#F9F9F9" v-for="(obj, index) in results" v-bind:key="index" v-show="show_flg">
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm2 class="px-2 py-2">
              <v-img
                v-bind:src="obj.thumbnail ? obj.thumbnail.value : 'http://simpleicon.com/wp-content/uploads/user1.png'"
              />
            </v-flex>
            <v-flex xs12 sm10 class="px-2 py-2">
              <h1>{{obj.label.value}}</h1>
              <p class="mt-2" v-if="obj.comment">{{obj.comment.value}}</p>
            </v-flex>
          </v-layout>

          <ListItemsWithSameCreator :id="id" :label="obj.label.value" :creator="obj.creator.value" class="mt-5" />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItemsWithSameCreator from "../components/ListItemsWithSameCreator";

import axios from "axios";
export default {
  components: {
    ListItemsWithSameCreator
  },
  props: ["id"],
  data: () => ({
    results: [],
    show_flg: false
  }),
  methods: {
    search() {
      this.show_flg = false;
      this.results = []

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho schema:creator ?creator. \n";
      query += "filter (?cho = <" + cho + ">)  \n";

      query += "?creator rdfs:label ?label . \n";
      query += "OPTIONAL {?creator schema:description ?comment . } \n";
      query += "OPTIONAL {?creator schema:image ?thumbnail . } \n";

      query += "} \n";
      query += "LIMIT 40 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;

          this.results = results;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  watch: {
    id: function() {
      this.search();
    }
  },

  created() {
    this.search();
  }
};
</script>