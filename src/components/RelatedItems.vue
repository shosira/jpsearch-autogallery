<template>
  <div>
    <h3 class="my-5">
      おすすめ
    </h3>
    <ul class="horizontal-list my-5">
        <li v-for="(obj, index) in results" v-bind:key="index">
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
                v-bind:to="{ name : 'item2', query : { id: obj.cho.value.split('/data/')[1] }}"
              >
                <b>{{obj.label.value.length > 20 ? obj.label.value.substr(0, 20)+"..." : obj.label.value}}</b>
              </router-link>
              <p class="my-1">{{obj.p_label.value}}</p>
              <p class="my-1"><b class="red--text text--lighten-1">{{label_map[obj.p.value] ? label_map[obj.p.value] : obj.p.value}}</b>が同じ<b class="red--text text--lighten-1">{{localStr(obj.category.value)}}</b>のアイテムです。</p>
            </v-card-text>
          </v-card>
        </li>
    </ul>
  </div>
</template>

<script>

import axios from "axios";
export default {
  props: ["id"],
  data: () => ({
    results: [],
    show_flg: false,
    label_map: {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" : "タイプ",
      "https://jpsearch.go.jp/term/property#accessInfo" : "データベース",
      "http://schema.org/inLanguage" : "言語",
      "https://jpsearch.go.jp/term/property#sourceInfo" : "所蔵館",
      "http://schema.org/spatial" : "場所",
      "" : "",
      "" : "",
    }
  }),
  methods: {
    localStr(data){
      let tmp = data.split("/")
      return tmp[tmp.length - 1]
    },
    search() {
      this.results = [];

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      //schema
      query += " { \n";
      query += "?cho ?p ?category. \n";
      query += "?cho2 ?p ?category. \n";
      query += " } UNION { \n";
      //jps:source or jps:acceess
      query += "?cho ?p ?info. \n";
      query += "?info schema:provider ?category. \n";
      query += "?info2 schema:provider ?category. \n";
      query += "?cho2 ?p ?info2. \n";
      query += " } UNION { \n";
      //jps:agential
      query += "?cho ?x ?info. \n";
      query += "?info jps:value ?category. \n";
      query += "?info jps:relationType ?p. \n";
      query += "?info2 jps:value ?category. \n";
      query += "?cho2 ?p ?info2. \n";
      query += " } \n";

      query += "filter (?cho2 = <" + cho + ">)  \n";
      query += "filter (?p != <http://schema.org/description>)  \n";

      query += "?cho rdfs:label ?label . \n";
      query += "?cho jps:sourceInfo ?source. \n";
      query += "?source schema:provider ?p_source . \n";
      query += "?p_source rdfs:label ?p_label . \n";
      
      //query += "OPTIONAL {?cho schema:image ?thumbnail . } \n";
      query += "?cho schema:image ?thumbnail . \n";

      query += "} \n";
      query += "ORDER BY RAND() \n";
      query += "LIMIT 500 \n";

      console.log(query)

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
            this.results.push(obj);
          }
          //console.log("aaa:"+results.length)
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