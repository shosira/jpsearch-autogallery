<template>
    <v-container grid-list-md text-xs-center>
        <h2 class="my-5">作品で知る<br/><small><a :href=link>すべてを見る</a></small></h2>
    
        <v-layout row wrap>
            <v-flex xs12 sm2 v-for="(result, index) in results" v-bind:key="index">
                <v-card>
                    <a v-bind:href="result.cho.value">
                        <v-img v-if="result.thumbnail" v-bind:src="result.thumbnail.value" />
                    </a>
                    <v-card-title primary-title>
                        <h3 class="headline mb-0"><a v-bind:href="result.cho.value">{{ result.label.value }}</a></h3>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    props: ['term'],
    data: () => ({
        results: [],
        link: null
    }),
    methods: {
        search(term) {

            this.results = [];

            let query = "PREFIX schema: <http://schema.org/> \n";
            query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
            query += "SELECT ?cho ?label ?thumbnail WHERE { \n";
            query += "?cho rdfs:label ?label; \n";
            query += "schema:creator/owl:sameAs? chname:" + term + " . \n";

            query += "OPTIONAL {?cho schema:image ?thumbnail} \n";
            query += "} \n";
            query += "LIMIT 12 \n";

            this.link = "https://jpsearch.go.jp/rdf/sparql/easy/?query=" + encodeURIComponent(query.split("LIMIT ")[0])

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results = response.data.results.bindings
                }).catch(error => { console.log(error); });
        }
    },
    watch: {
        term: function() {
            this.search(this.term);
        }
    },
    created() {
        this.search(this.term);
    }
}
</script>