<template>
  <div>
    <ul class="horizontal-list my-5">
      <template v-for="(result, index2) in results">
        <li v-for="(obj, index) in result" v-bind:key="index2+'_'+index">
          <v-card class="my-2 mx-2" style="max-width : 300px">
            <router-link
              v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
            >
              <div style="background-color: black; height: 150px;">
                <v-img
                  contain
                  height="150px"
                  v-bind:src="obj.thumbnail ? obj.thumbnail.value : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png'"
                />
              </div>
            </router-link>

            <v-card-text>
              <router-link
                v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
              >
                <b>{{obj.label.value}}</b>
              </router-link>
              <p class="my-1">{{obj.p_label.value}}</p>
            </v-card-text>
          </v-card>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

let search_size = 500;

export default {
  props: ["id", "creator", "label", "property"],
  data: () => ({
    results: {
      results_w_thumbnail: [],
      results_wo_thumbnail: []
    }
  }),
  methods: {
    search(thumbnail_flg) {
      let id = this.id;
      let creator = this.creator;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho " + this.property + "/owl:sameAs? ?creator . \n";
      query += "filter(?creator = <" + creator + ">) . \n";
      query += "filter(?cho != <" + cho + ">) . \n";
      query += "?cho rdfs:label ?label . \n";
      if (thumbnail_flg) {
        query += "?cho schema:image ?thumbnail . \n";
      } else {
        query += "MINUS {?cho schema:image ?thumbnail . } \n";
      }

      query += "?cho jps:sourceInfo ?sourceInfo . \n";
      query += "?sourceInfo schema:provider ?p . \n";
      query += "?p rdfs:label ?p_label . \n";

      query += "} \n";
      query += "LIMIT " + search_size + " \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;

          var arr = [];
          for (let i = 0; i < results.length; i++) {
            arr.push(i);
          }
          var a = arr.length;

          //シャッフルアルゴリズム
          while (a) {
            var j = Math.floor(Math.random() * a);
            var t = arr[--a];
            arr[a] = arr[j];
            arr[j] = t;
          }

          let max = search_size;
          if (arr.length < max) {
            max = arr.length;
          }

          //新しい配列
          let results2 = [];
          for (let i = 0; i < max; i++) {
            results2.push(results[arr[i]]);
          }
          if (thumbnail_flg) {
            this.results.results_w_thumbnail = results2;
          } else {
            this.results.results_wo_thumbnail = results2;
          }
        });
    }
  },

  watch: {
    id: function() {
      this.search(true);
      this.search(false);
    }
  },

  created() {
    this.search(true);
    this.search(false);
  }
};
</script>

<style>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}

.horizontal-list li {
  /* 横スクロール用 */
  display: inline-block;
}
</style>