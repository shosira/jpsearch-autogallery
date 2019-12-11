<template>
  <v-container grid-list-md text-xs-center v-show="results.results_w_thumbnail.length > 0">
    <h3 class="mt-5">Europeanaで探す</h3>
    <a :href="link" target="_blank">
      すべてを見る
      <i class="fas fa-external-link-alt"></i>
    </a>
    
    <ShowItems :map="results" target="direct" v-if="results.results_w_thumbnail.length > 0" class="mt-5" />
  </v-container>
</template>

<script>
import axios from "axios";
import ShowItems from "../components/ShowItems";

export default {
  components: {
    ShowItems
  },
  props: ["u"],
  data: () => ({
    results: {
      results_w_thumbnail: []
    },
    link: null
  }),
  methods: {
    init() {
      for (let key in this.results) {
        this.results[key] = [];
      }
      this.search();
    },
    search() {

      if(this.u == null){
          return;
      }

      let u = this.u.split("/")
      let term = u[u.length - 1]

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
      query += "} \n";
      query += "ORDER BY RAND() \n";
      query += "LIMIT 100\n";

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
          let results = response.data.results.bindings;
          for (let i = 0; i < results.length; i++) {
            let obj = results[i];
            let n_obj = {
              label: obj.label.value,
              thumbnail: obj.image
                ? obj.image.value
                : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png",
              id: obj.uri.value
            };
            this.results.results_w_thumbnail.push(n_obj);
          }
        })
    }
  },
  watch: {
    u: function() {
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>