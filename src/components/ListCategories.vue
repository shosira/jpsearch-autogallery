<template>
  <v-card v-show="results.length > 0">
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
        v-for="(obj, index) in results"
        v-bind:key="index"
        v-show="show_flg || show_all_flg"
      >
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm1 class="px-2 py-2">
              <div>
                <v-img contain max-height="90px" v-bind:src="obj.thumbnail.value" />
              </div>
            </v-flex>
            <v-flex xs12 sm11 class="px-2 py-2">
              <template v-if="obj.wid">
                <h1>
                  <router-link
                    v-bind:to="{ name : 'search', query : {id: obj.category.value }}"
                  >{{obj.label ? obj.label.value : obj.category.value.split("/").slice(-1)[0]}}</router-link>
                </h1>
              </template>
              <template v-else>
                <h1>{{obj.label ? obj.label.value : obj.category.value.split("/").slice(-1)[0]}}</h1>
              </template>
              <p class="mt-2" v-if="obj.comment">{{obj.comment.value}}</p>
            </v-flex>
          </v-layout>

          <ListItemsOfCategory
            :id="id"
            :label="label"
            :creator="obj.category.value"
            :property="property"
            :show_all_flg="show_all_flg"
            class="mt-5"
          />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItemsOfCategory from "../components/ListItemsOfCategory";

import axios from "axios";
export default {
  components: {
    ListItemsOfCategory
  },
  props: ["id", "label", "property", "show_all_flg"],
  data: () => ({
    results: [],
    show_flg: false
  }),
  methods: {
    search() {
      this.show_flg = false;
      this.results = [];

      let property = this.property;

      let id = this.id;

      let cho = "https://jpsearch.go.jp/data/" + id;

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += "?cho " + property + " ?category. \n";
      query += "filter (?cho = <" + cho + ">)  \n";

      query += "OPTIONAL {?category rdfs:label ?label . } \n";
      query += "OPTIONAL {?category schema:description ?comment . } \n";
      query += "OPTIONAL {?category schema:image ?thumbnail . } \n";

      if(property == "schema:creator"){
        query +=
        "OPTIONAL {?category rdfs:isDefinedBy ?wid . filter (?wid = <https://jpsearch.go.jp/entity/chname/> ) } \n";
      }
      
      query += "} \n";
      query += "LIMIT 40 \n";

      //console.log(query)

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
            if (!obj.thumbnail) {
              obj.thumbnail = {
                value: this.get_thumbnail(obj.category.value)
              };
            }
            this.results.push(obj);
          }
        });
    },
    get_thumbnail(uri) {
      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "SELECT distinct * WHERE { \n";
      query += " <" + uri + "> ?v ?o \n";
      query += "} \n";
      query += "LIMIT 40 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;
          if (results.length > 0) {
            return "aaa";
          }
        });

      let flg = true;
      if (uri == null) {
        flg = false;
      }

      if (flg) {
        return "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png";
      }
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