<template>
  <v-container grid-list-md text-xs-center>
    <h2 class="my-5">ギャラリーに使用されている作品</h2>
    <v-layout row wrap v-show="results.length > 0">
      <v-flex xs12 sm2 class="px-3 py-3" v-for="(result, index) in results" :key="index">
        <v-card>
          <router-link
            v-bind:to="{ name : 'item', query : { id: result.cho.value.split('/data/')[1] }}"
          >
            <div style="background-color: black;">
              <v-img
                v-bind:src="result.thumbnail ? result.thumbnail.value : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png'"
                contain
                height="150px"
              />
            </div>
          </router-link>

          <v-card-text>
            <h3>
              <router-link
                v-bind:to="{ name : 'item', query : { id: result.cho.value.split('/data/')[1] }}"
              >{{result.label.value}}</router-link>
            </h3>
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
      let query = "PREFIX oa: <http://www.w3.org/ns/oa#> \n";
      query += " PREFIX schema: <http://schema.org/> \n";
      query += " PREFIX jps: <https://jpsearch.go.jp/term/property#> \n";
      query += " SELECT distinct ?cho ?label ?thumbnail ?p_label WHERE { \n";
      query += " ?gallery rdfs:label ?glabel .  \n";
      query += " ?gallery oa:hasTarget ?cho . \n";

      query += " SERVICE SILENT <https://jpsearch.go.jp/rdf/sparql> { \n";
      query += " ?cho rdfs:label ?label . \n";
      query += " optional { ?cho schema:image ?thumbnail . } \n";
      query += " ?cho jps:sourceInfo ?sourceInfo . \n";
      query += " ?sourceInfo schema:provider ?p . \n";
      query += " ?p rdfs:label ?p_label . \n";

      query += " } . \n";

      query += " } \n";

      axios
        .get(
          "https://www.kanzaki.com/works/ld/jpsearch/ep/annot?query=" +
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