<template>
  <v-container
    grid-list-md
    text-xs-center
    v-if="results.results_w_thumbnail.length > 0 || results.results_wo_thumbnail.length > 0"
  >
    <h3 class="mt-5">作品で知る</h3>

    <a :href="link" target="_blank">
      すべてを見る
      <i class="fas fa-external-link-alt"></i>
    </a>

    <ShowItems :map="results" class="mt-5" />
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
      results_w_thumbnail: [],
      results_wo_thumbnail: []
    },
    link: null
  }),
  methods: {
    init() {
      for (let key in this.results) {
        this.results[key] = [];
      }
      this.search(true);
      this.search(false);
    },
    search(thumbnail_flg) {
      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
      query += "SELECT ?cho ?label ?thumbnail ?p_label WHERE { \n";
      query += "?cho rdfs:label ?label; \n";
      query += "schema:creator/owl:sameAs? <" + this.u + "> . \n";

      if (thumbnail_flg) {
        query += "?cho schema:image ?thumbnail . \n";
      } else {
        query += "MINUS {?cho schema:image ?thumbnail . } \n";
      }

      query += " ?cho jps:sourceInfo ?sourceInfo . \n";
      query += " ?sourceInfo schema:provider ?p . \n";
      query += " ?p rdfs:label ?p_label . \n";

      query += "} \n";
      query += "ORDER BY RAND() \n";
      if (thumbnail_flg) {
        query += "LIMIT 70 \n";
      } else {
        query += "LIMIT 30 \n";
      }

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
              thumbnail: obj.thumbnail
                ? obj.thumbnail.value
                : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png",
              provider: obj.p_label.value,
              id: obj.cho.value.split("/data/")[1]
            };

            if (thumbnail_flg) {
              this.results.results_w_thumbnail.push(n_obj);
            } else {
              this.results.results_wo_thumbnail.push(n_obj);
            }
          }
        });
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