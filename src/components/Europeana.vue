<template>
  <v-container grid-list-md text-xs-center v-show="results.length > 0">
    <h2 class="mt-5 mb-5">Europeanaで探す</h2>
    <v-layout row wrap>
      <v-flex xs12 sm2 v-for="(result, index) in results" v-bind:key="index">
        <v-card>
          <a v-bind:href="result.uri.value">
            <div style="background-color: black; height: 300px">
              <v-img
                height="300px"
                contain="true"
                v-if="result.image"
                v-bind:src="result.image.value"
              />
            </div>
          </a>
          <v-card-text>
            <h3>
              <a target="snorql" v-bind:href="result.uri.value">{{ result.label.value }}</a>
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
  props: ["term"],
  data: () => ({
    results: [],
    link: null
  }),
  methods: {
    search(term) {
      this.results = [];

      let query = "";
      query += "PREFIX dc: <http://purl.org/dc/elements/1.1/> \n";
      query += "PREFIX edm: <http://www.europeana.eu/schemas/edm/> \n";
      query += "PREFIX ore: <http://www.openarchives.org/ore/terms/> \n";
      query += "SELECT ?uri ?label ?image WHERE{ \n";
      query += "	BIND(chname:" + term + " as ?cname) \n";
      query += "	{ \n";
      query += '		?cname schema:name ?ename. FILTER(lang(?ename)="en") \n';
      query += '		BIND(replace(?ename, ", ", " ") as ?name) \n';
      query +=
        "		?loduri owl:sameAs ?cname ; rdfs:isDefinedBy <http://dbpedia.org/>. \n";
      query += "		SERVICE SILENT <http://sparql.europeana.eu/> { \n";
      query += "			{?uri dc:creator ?name .} UNION  \n";
      query += "			{?proxy dc:creator ?loduri ; ore:proxyFor ?cho .  \n";
      query += '?uri ore:proxyFor ?cho ; edm:europeanaProxy "false". } \n';
      query += "			?uri dc:title ?label . \n";
      //query += "			OPTIONAL{?uri ore:proxyIn [edm:isShownBy ?image ]} \n";
      query += "			?uri ore:proxyIn [edm:isShownBy ?image ] \n";
      query += "		} \n";
      query += "		} \n";
      query += "} limit 12\n";

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