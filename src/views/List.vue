<template>
  <v-container grid-list-md text-xs-center>
    <h2 class="my-5">作品数の多い著者100人</h2>
    <v-layout row wrap v-show="results.length > 0">
      <v-flex xs12 sm2 class="px-3 py-3" v-for="(result, index) in results" :key="index">
        <v-card>
          <router-link v-bind:to="{ path: 'search', query: { id : result.cho.value}}">
            <div style="background-color: black;">
              <v-img
                v-if="result.thumbnail"
                v-bind:src="result.thumbnail.value"
                contain
                height="150px"
              />
            </div>
          </router-link>

          <v-card-text>
            <b>
              <router-link
                v-bind:to="{ path: 'search', query: { id: result.cho.value}}"
              >{{result.label.value}}</router-link>
            </b>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    results: []
  }),
  mounted() {
    this.search();
  },
  methods: {
    search() {
      let query = "";

      query +=
        "select distinct count(?s) as ?count ?cho ?label ?thumbnail where { \n";
      query += "  ?s schema:creator ?cho . \n";
      query += "  ?cho rdfs:label ?label; \n";
      query += "  schema:image ?thumbnail \n";
      query += "} \n";
      query += "ORDER BY desc(?count) \n";
      query += "LIMIT 100 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          this.results = response.data.results.bindings;
        });
    }
  }
};
</script>