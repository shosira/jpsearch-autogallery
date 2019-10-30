<template>
  <v-card>
    <v-card-text>
      <h1 class="my-4">
        {{creator.split("name/")[1]}}の作品&nbsp;
        <v-btn text small @click="show_flg = !show_flg">
          <template v-if="show_flg">非表示</template>
          <template v-else>表示</template>
        </v-btn>
      </h1>

      <v-layout row wrap v-show="show_flg">
        <v-flex xs12 sm2 v-for="(obj, index) in results" v-bind:key="index">
          <v-card class="my-2 mx-2">
            <router-link
              v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
            >
              <v-img
                v-bind:src="obj.thumbnail ? obj.thumbnail.value : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png'"
              />
            </router-link>

            <v-card-text>
              <router-link
                v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
              >
                <b>{{obj.label.value}}</b>
              </router-link>
              <p class="my-1">{{obj.p_label.value}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "creator"],
  data: () => ({
    results: [],
    show_flg: false
  }),
  methods: {
    search() {
      this.show_flg = false;

      let id = this.id;
      let creator = this.creator;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho schema:creator/owl:sameAs? <" + creator + ">. \n";
      query += "filter(?cho != <" + cho + ">) . \n";
      query += "?cho rdfs:label ?label . \n";
      query += "OPTIONAL {?cho schema:image ?thumbnail . } \n";

      query += "?cho jps:sourceInfo ?sourceInfo . \n";
      query += "?sourceInfo schema:provider ?p . \n";
      query += "?p rdfs:label ?p_label . \n";

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