<template>
  <div>
    <ul class="horizontal-list my-5">
      <li v-for="(obj, index) in results" v-bind:key="index">
        <v-card class="my-2 mx-2">
          <router-link
            v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
          >
            <div style="background-color: black; height: 300px;">
              <v-img
                height="300px"
                contain="true"
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
            <!-- <p class="my-1">{{obj.creator.value}}</p> -->
          </v-card-text>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

let search_size = 200;

export default {
  props: ["id", "creator", "label", "property", "show_all_flg"],
  data: () => ({
    results: []
  }),
  methods: {
    search() {
      this.show_flg = false;
      this.results = [];

      let id = this.id;
      let creator = this.creator;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho " + this.property + "/owl:sameAs? ?creator . \n";
      query += "filter(?creator = <" + creator + ">) . \n";
      query += "filter(?cho != <" + cho + ">) . \n";
      query += "?cho rdfs:label ?label . \n";
      //query += "OPTIONAL {?cho schema:image ?thumbnail . } \n";
      query += "?cho schema:image ?thumbnail . \n";

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

          this.results = results2;
        })
        .catch(error => {
          console.log(error);
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