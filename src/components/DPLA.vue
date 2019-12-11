<template>
  <v-container grid-list-md text-xs-center v-show="results.results_w_thumbnail.length > 0">
    <h3 class="mt-5">DPLAで探す</h3>
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
      if (this.u == null) {
        return;
      }

      let u = this.u.split("/");
      let term = u[u.length - 1];

      let query = "";
      query += "PREFIX wrp: <http://purl.org/net/ld/wrapper/term#> \n";
      query += "SELECT ?uri ?label ?image WHERE{ \n";
      query += "	BIND(chname:" + term + " as ?cname) \n";
      query += "	{ \n";
      query += '		?cname schema:name ?ename. FILTER(lang(?ename)="en") \n';
      query +=
        '		BIND(concat(strafter(?ename, ", "), " ", strbefore(?ename, ",")) as ?name) \n';
      query +=
        "		SERVICE SILENT <http://www.kanzaki.com/works/ld/wrapper/dpla-sparqler> { \n";
      query += '			?uri a "image" ; \n';
      query += "			wrp:title ?label ; \n";
      query += "			wrp:creator ?name ; \n";
      query += "			wrp:image ?image \n";
      query += "		} \n";
      query += "	}  \n";
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