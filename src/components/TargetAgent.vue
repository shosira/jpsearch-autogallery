<template>
  <v-card v-if="obj">
    <div style="background-color: black; height: 150px;">
      <v-img contain height="150px" v-if="obj.thumbnail" v-bind:src="obj.thumbnail.value" />
    </div>
    <v-card-text>
      <b>{{obj.label.value}}</b>
      <p class="my-1">{{obj.comment.value}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["u"],
  data: () => ({
    obj: null
  }),
  methods: {
    search() {
      this.obj = null;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?s rdfs:label ?label. \n";
      query += "filter (?s = <" + this.u + ">) . \n";
      query += "OPTIONAL {?s schema:description ?comment . } \n";
      query += "OPTIONAL {?s schema:image ?thumbnail . } \n";
      query +=
        "OPTIONAL {?s owl:sameAs ?wid . ?wid rdfs:isDefinedBy <http://www.wikidata.org/> } \n";
      query += "} \n";
      query += "LIMIT 1 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let obj = response.data.results.bindings[0];
          if (!obj.thumbnail && obj.wid) {
            this.search4wiki(obj.wid.value);
          }
          this.obj = obj;
        })
    },
    search4wiki(u) {
      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "<" + u + "> wdt:P18 ?thumbnail. \n";
      query += "} \n";
      query += "LIMIT 1 \n";

      axios
        .get(
          "https://query.wikidata.org/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let obj = response.data.results.bindings[0];
          this.obj.thumbnail = obj.thumbnail.value;
        })
    }
  },
  watch: {
    u: function() {
      this.search();
    }
  },
  created() {
    this.search();
  }
};
</script>