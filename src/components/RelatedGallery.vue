<template>
  <v-container grid-list-md text-xs-center v-show="Object.keys(results).length > 0">
    <h3 class="mt-5">関連する人物</h3>

    <a :href="link" target="_blank">
      すべてを見る
      <i class="fas fa-external-link-alt"></i>
    </a>
    <ShowItems :map="results" target="search" v-if="Object.keys(results).length > 0" class="mt-5" />
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
      let query = "";

      query += "SELECT DISTINCT ?dest ?plabel ?pthumbnail WHERE { \n";
      query += "	?s jps:agential\n";
      query +=
        '		[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value/owl:sameAs? <' +
        this.u +
        "> ],\n";
      query +=
        '		[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ]\n';
      query += "	FILTER(?dest != <" + this.u + "> )\n";
      query +=
        '	FILTER(strstarts(str(?dest), "https://jpsearch.go.jp/entity/chname/"))\n';
      query += "  ?dest schema:image ?pthumbnail;\n";
      query += "      rdfs:label ?plabel\n";
      query += "} \n";
      query += "ORDER BY RAND() \n";
      query += "LIMIT 100 \n";

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
              label: obj.plabel.value,
              thumbnail: obj.pthumbnail
                ? obj.pthumbnail.value
                : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png",
              id: obj.dest.value
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