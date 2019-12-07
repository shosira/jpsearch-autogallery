<template>
  <v-card v-if="Object.keys(results).length > 0">
    <v-card-text>
      <h1 class="my-4">
        {{label}}&nbsp;
        <v-btn text small @click="show_flg = !show_flg">
          <template v-if="show_flg">非表示</template>
          <template v-else>表示</template>
        </v-btn>
      </h1>

      <v-card
        class="mb-5"
        color="#F9F9F9"
        v-for="(arr, index) in results"
        v-bind:key="index"
        v-show="show_flg || show_all_flg"
      >
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm1 class="px-2 py-2">
              <div>
                <v-img
                  contain
                  max-height="90px"
                  src="https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"
                />
              </div>
            </v-flex>
            <v-flex xs12 sm11 class="px-2 py-2">
              <h1>{{index}}</h1>
            </v-flex>
          </v-layout>

          <ShowItems :map="{key : arr}" v-if="arr.length > 0" class="mt-5" />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ShowItems from "../components/ShowItems";

import axios from "axios";
export default {
  components: {
    ShowItems
  },
  props: ["id", "show_all_flg"],
  data: () => ({
    results: {},
    show_flg: false,
    label: "Gallery"
  }),
  methods: {
    search() {
      this.show_flg = false;
      this.results = {};

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX oa: <http://www.w3.org/ns/oa#> \n";
      query += " PREFIX schema: <http://schema.org/> \n";
      query += " PREFIX jps: <https://jpsearch.go.jp/term/property#> \n";
      query += " SELECT distinct * WHERE { \n";
      query += " ?gallery oa:hasTarget <" + cho + "> . \n";
      query += " ?gallery rdfs:label ?glabel .  \n";
      query += " ?gallery oa:hasTarget ?cho . \n";
      query += " filter(?cho != <" + cho + ">) . \n";
      query += " SERVICE SILENT <https://jpsearch.go.jp/rdf/sparql> { \n";
      query += " ?cho rdfs:label ?label . \n";
      query += " optional { ?cho schema:image ?thumbnail . } \n";
      query += " ?cho jps:sourceInfo ?sourceInfo . \n";
      query += " ?sourceInfo schema:provider ?p . \n";
      query += " ?p rdfs:label ?p_label . \n";

      query += " } . \n";

      query += " } \n";
      query += "ORDER BY RAND() \n";

      axios
        .get(
          "https://www.kanzaki.com/works/ld/jpsearch/ep/annot?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;
          let map = {};
          for (let i = 0; i < results.length; i++) {
            let obj = results[i];
            let glabel = obj.glabel.value;
            if (!map[glabel]) {
              map[glabel] = [];
            }
            let obj2 = {
              label: obj.label.value,
              thumbnail: obj.thumbnail
                ? obj.thumbnail.value
                : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png",
              provider: obj.p_label.value,
              id: obj.cho.value.split("/data/")[1]
            };
            map[glabel].push(obj2);
          }
          this.results = map;
        });
    }
  },

  watch: {
    id: function() {
      this.search();
    }
  },

  created() {
    this.search();
  }
};
</script>