<template>
  <v-container grid-list-md text-xs-center v-show="results.length > 0">
    <h2 class="my-5">
      関連ギャラリー
      <br />
      <small>
        <a :href="link">すべてを見る</a>
      </small>
    </h2>
    <v-layout row wrap>
      <v-flex xs12 sm2 class="py-3 px-3" v-for="(result, index) in results" v-bind:key="index">
        <v-card>
          <router-link :to="{ path: 'search', query: { q: result.plabel.value }}">
            <div style="background-color: black; height: 300px;">
              <v-img
                height="300px"
                contain="true"
                v-if="result.pthumbnail"
                v-bind:src="result.pthumbnail.value"
              />
            </div>
          </router-link>

          <v-card-text>
            <h3>
              <router-link
                :to="{ path: 'search', query: { q: result.plabel.value }}"
              >{{ result.plabel.value }}</router-link>
            </h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- <iframe :src="iframe_url" width="100%" height="600px" style="border: 0; display: block;" scrolling="no" class="mt-5"></iframe> -->
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["term"],
  data: () => ({
    results: [],
    link: null
  }),
  methods: {
    search(term) {
      this.results = [];

      let query = "";

      query += "SELECT DISTINCT ?dest ?plabel ?pthumbnail WHERE { \n";
      query += "	?s jps:agential\n";
      query +=
        '		[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value/owl:sameAs? chname:' +
        term +
        " ],\n";
      query +=
        '		[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ]\n';
      query += "	FILTER(?dest != chname:" + term + ")\n";
      query +=
        '	FILTER(strstarts(str(?dest), "https://jpsearch.go.jp/entity/chname/"))\n';
      query += "  ?dest schema:image ?pthumbnail;\n";
      query += "      rdfs:label ?plabel\n";
      query += "} LIMIT 12 \n";

      this.link =
        "https://jpsearch.go.jp/rdf/sparql/easy/?query=" +
        encodeURIComponent(query.split("LIMIT ")[0]);

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          this.results = response.data.results.bindings;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    term: function() {
      this.search(this.term);
    }
  },
  created() {
    this.search(this.term);
  }
};
</script>