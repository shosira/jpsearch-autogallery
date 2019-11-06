<template>
  <v-card v-show="results.length > 0">
    <v-card-text>
      <h1 class="my-4">
        {{label}}&nbsp;
        <v-btn text small @click="show_flg = !show_flg">
          <template v-if="show_flg">非表示</template>
          <template v-else>表示</template>
        </v-btn>
      </h1>

      <v-card
        class="mb-5"
        color="#F9F9F9"
        v-for="(obj, index) in results"
        v-bind:key="index"
        v-show="show_flg || show_all_flg"
      >
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm2 class="px-2 py-2">
              <div style="background-color: black; height: 300px;">
                <v-img
                  contain="true"
                  height="300px"
                  v-bind:src="obj.thumbnail ? obj.thumbnail.value : (property=='schema:creator' || property=='schema:publisher' ? 'http://simpleicon.com/wp-content/uploads/user1.png' : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png')"
                />
              </div>
            </v-flex>
            <v-flex xs12 sm10 class="px-2 py-2">
              <h1>{{obj.label.value}}</h1>
              <p class="mt-2" v-if="obj.comment">{{obj.comment.value}}</p>
            </v-flex>
          </v-layout>

          <ListItemsOfCategory
            :id="id"
            :label="obj.label.value"
            :creator="obj.creator.value"
            :property="property"
            :show_all_flg="show_all_flg"
            class="mt-5"
          />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItemsOfCategory from "../components/ListItemsOfCategory";

import axios from "axios";
export default {
  components: {
    ListItemsOfCategory
  },
  props: ["id", "label", "property", "show_all_flg"],
  data: () => ({
    results: [],
    show_flg: false
  }),
  methods: {
    search() {
      this.show_flg = false;
      this.results = [];

      let property = this.property;

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho " + property + " ?creator. \n";
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