<template>
  <v-card v-show="label">
    <div style="background-color: black; height: 300px;">
      <v-img contain="true" height="300px" v-if="thumbnail" v-bind:src="thumbnail" />
    </div>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{label}}</h3>
        <div v-show="comment">{{comment}}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["term"],
  data: () => ({
    label: null,
    comment: null,
    thumbnail: null
  }),
  methods: {
    search(term) {
      this.label = null;
      this.comment = null;
      this.thumbnail = null;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?s rdfs:label ?label. \n";
      query += "filter (?s = chname:" + term + ") . \n";
      query += "OPTIONAL {?s schema:description ?comment . } \n";
      query += "OPTIONAL {?s schema:image ?thumbnail . } \n";
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
          this.label = obj.label.value;
          if (obj.comment) {
            this.comment = obj.comment.value;
          }
          if (obj.thumbnail) {
            this.thumbnail = obj.thumbnail.value;
          }
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