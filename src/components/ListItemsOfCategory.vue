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
                <b>{{obj.label.value.length > 20 ? obj.label.value.substr(0, 20)+"..." : obj.label.value}}</b>
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
      query += "ORDER BY RAND() \n";
      if (thumbnail_flg) {
        query += "LIMIT 70 \n";
      } else {
        query += "LIMIT 30 \n";
      }
      

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;
          let arr = []
          let map = {}
          for(let i = 0; i < results.length; i++){
            let obj = results[i]
            let p_label = obj.p_label.value
            if(!map[p_label]){
              map[p_label] = []
            }
            map[p_label].push(obj)
          }

          let index = 0
          let flg = true
          while(flg){
            let tmp_flg = false
            for(let key in map){
              let tmp = map[key]
              if(tmp[index]){
                arr.push(tmp[index])
                tmp_flg = true
              }
            }
            if(!tmp_flg){
              flg = false
            }
            index += 1
          }

          if (thumbnail_flg) {
            this.results.results_w_thumbnail = arr//results;
          } else {
            this.results.results_wo_thumbnail = arr//results;
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