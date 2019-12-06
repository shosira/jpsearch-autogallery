<template>
  <v-container>
    <v-layout row v-if="results.length > 0">
      <v-flex xs12 sm2 class="px-2 py-2">
        <a
          target="jps"
          :href="'https://jpsearch.go.jp/item/' + results[0].cho.value.split('/data/')[1]"
        >
          <div style="background-color: black; height:150px;">
            <v-img
              contain
              height="150px"
              v-bind:src="results[0].thumbnail ? results[0].thumbnail.value : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png'"
            />
          </div>
        </a>
      </v-flex>
      <v-flex xs12 sm10 class="px-2 py-2">
        <h1 class="mb-4">
          <a
            target="jps"
            :href="'https://jpsearch.go.jp/item/' + results[0].cho.value.split('/data/')[1]"
          >{{results[0].label.value}}</a>
        </h1>

        <p class="mt-2">{{results[0].p_label.value}}</p>
        <p class="mt-2">
          <a target="snorql" :href="results[0].cho.value">
            JPS利活用スキーマ
            <i class="fas fa-external-link-alt"></i>
          </a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data: () => ({
    results: []
  }),
  methods: {
    search() {
      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";

      query += "?cho rdfs:label ?label . \n";
      query += "filter (?cho = <" + cho + ">)  \n";
      query += "OPTIONAL {?cho schema:image ?thumbnail . } \n";

      query += "?cho jps:sourceInfo ?sourceInfo . \n";
      query += "?sourceInfo schema:provider ?p . \n";
      query += "?p rdfs:label ?p_label . \n";

      query += "} \n";
      query += "LIMIT 1 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;
          this.results = results;
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