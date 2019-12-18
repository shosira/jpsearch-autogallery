<template>
  <div>
    <h3 class="my-5">おすすめ</h3>
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
              v-bind:to="{ name : 'item', query : { id: obj.cho.value.split('/data/')[1] }}"
            >
              <b>{{obj.label.value.length > 20 ? obj.label.value.substr(0, 20)+"..." : obj.label.value}}</b>
            </router-link>
            <p class="my-1">{{obj.p_label.value}}</p>
            <p class="my-1">
              <b
                class="red--text text--lighten-1"
              >{{label_map[obj.p.value] ? label_map[obj.p.value] : obj.p.value.replace("https://jpsearch.go.jp/term/role/", "")}}</b>
              が同じ
              <b class="red--text text--lighten-1">
                <template
                  v-if="obj.type.value == 'https://jpsearch.go.jp/term/type/Agent' && (obj.p.value == 'http://schema.org/creator' || obj.p.value.indexOf('制作') != -1)"
                >
                  <router-link
                    v-bind:to="{ name : 'search', query : { id: obj.category_u.value }}"
                  >{{localStr(obj.category.value)}}</router-link>
                </template>
                <template v-else>{{localStr(obj.category.value)}}</template>
              </b>
              のアイテムです。
            </p>
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
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": "基本区分",

      "http://schema.org/contributor": "Contributor",
      "http://schema.org/creator": "Creator",
      "http://schema.org/publisher": "Publisher",
      "http://schema.org/temporal": "時間",

      "http://schema.org/dateCreated": "制作日",
      "http://schema.org/datePublished": "発行日",

      "http://schema.org/spatial": "場所",
      "http://schema.org/about": "主題",
      "http://schema.org/inLanguage": "記述言語",

      "https://jpsearch.go.jp/term/property#accessInfo": "所蔵機関",
      "https://jpsearch.go.jp/term/property#sourceInfo": "データベース"
    }
  }),
  methods: {
    localStr(data) {
      let tmp = data.split("/");
      return tmp[tmp.length - 1];
    },
    search() {
      this.results = [];

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query =
        `
        PREFIX jps: <https://jpsearch.go.jp/term/property#>
        PREFIX schema: <http://schema.org/>
        PREFIX type: <https://jpsearch.go.jp/term/type/>
        PREFIX chname: <https://jpsearch.go.jp/entity/chname/>
        PREFIX place: <https://jpsearch.go.jp/entity/place/>
        PREFIX time: <https://jpsearch.go.jp/entity/time/>
        PREFIX work: <https://jpsearch.go.jp/entity/work/>
        PREFIX role: <https://jpsearch.go.jp/term/role/>
        PREFIX keyword: <https://jpsearch.go.jp/term/keyword/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX gvname: <https://jpsearch.go.jp/entity/gvname/>
        PREFIX ncname: <https://jpsearch.go.jp/entity/ncname/>
        PREFIX ncplace: <https://jpsearch.go.jp/entity/ncplace/>
        PREFIX series: <https://jpsearch.go.jp/entity/series/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        SELECT distinct ?cho ?label ?p ?category ?p_label ?thumbnail ?category_u ?type WHERE { 
        { 
          ?cho ?p ?category_u. 
          ?cho2 ?p ?category_u. 
        } UNION { 
          ?cho ?p ?info. 
          ?info schema:provider ?category_u. 
          ?info2 schema:provider ?category_u. 
          ?cho2 ?p ?info2. 
        } UNION { 
          ?cho ?x ?info. 
          ?info jps:value ?category_u. 
          ?info jps:relationType ?p_u. 
          ?p_u rdfs:label ?p .  
          ?info2 jps:value ?category_u. 
          ?cho2 ?x ?info2. 
        } 
        ?category_u rdfs:label ?category .
        ?category_u rdf:type ?type .
        filter (?category_u != place:東京) .
        filter (?category_u != ncname:unknown) .
        filter (?category_u != ncplace:unknown) .
        filter (?cho2 = <` +
        cho +
        `>)  
        filter (?p != <http://schema.org/description>)  
        ?cho rdfs:label ?label . 
        ?cho jps:sourceInfo ?source. 
        ?source schema:provider ?p_source . 
        ?p_source rdfs:label ?p_label . 
        ?cho schema:image ?thumbnail . 
        } 
        ORDER BY RAND() 
        LIMIT 100
      `;

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;
          let map = {};
          for (let i = 0; i < results.length; i++) {
            let obj = results[i];
            let p_label = obj.p_label.value;
            if (!map[p_label]) {
              map[p_label] = [];
            }
            map[p_label].push(obj);
            //this.results.push(obj);
          }

          let index = 0;
          let flg = true;
          let arr = [];
          while (flg) {
            let tmp_flg = false;
            for (let key in map) {
              let tmp = map[key];
              if (tmp[index]) {
                arr.push(tmp[index]);
                tmp_flg = true;
              }
            }
            if (!tmp_flg) {
              flg = false;
            }
            index += 1;
          }

          this.results = arr;
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