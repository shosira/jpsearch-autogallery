<template>
    <v-container grid-list-md text-xs-center v-show="results.length > 0">
        <h2 class="my-5">作品数の多い著者100人</h2>
        <v-layout row wrap>
            <v-flex xs12 sm2 v-for="result in results">
                <v-card>
                    <a>
                        <v-img v-if="result.thumbnail" v-bind:src="result.thumbnail.value" style="max-height: 20rem;"></v-img>
                    </a>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">
                                <router-link v-bind:to="{ path: '/search', query: { q: result.label.value}}">{{result.label.value}}</router-link>
                                <!-- <router-link v-bind:to="{ name: 'search', params: { id: result.label.value}}">{{result.label.value}}</router-link> -->
                            </h3>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        results: []
    }),
    mounted() {
        this.getAll();
    },
    methods: {
        getAll() {
            let query = "";

            query += "select distinct count(?s) as ?count ?cho ?label ?thumbnail where { \n";
            query += "  ?s schema:creator ?cho . \n";
            query += "  ?cho rdfs:label ?label; \n";
            query += "  schema:image ?thumbnail \n";
            query += "} \n";
            query += "ORDER BY desc(?count) \n";
            query += "LIMIT 100 \n";

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results = response.data.results.bindings
                    console.log(this.results)
                }).catch(error => { console.log(error); });


        }
    }
}
</script>