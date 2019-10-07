<template>
    <v-container grid-list-md text-xs-center v-show="results.length > 0">
            <h2 class="mt-5 mb-5">DPLAで探す</h2>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="(result, index) in results" v-bind:key="index">
                    <v-card>
                        <a v-bind:href="result.uri.value">
                            <v-img v-if="result.image" v-bind:src="result.image.value"/>
                        </a>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0"><a target="snorql" v-bind:href="result.uri.value">{{ result.label.value }}</a></h3>
                                <!-- <div> {{ result.comment.value }} </div> -->
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
    props: ['term'],
    data: () => ({
        results: [],
        link: null,
    }),
    methods: {
        search(term) {

            this.results = [];

            let query = "";
            query += "PREFIX wrp: <http://purl.org/net/ld/wrapper/term#> \n";
            query += "SELECT ?uri ?label ?image WHERE{ \n";
            query += "	BIND(chname:" + term + " as ?cname) \n";
            query += "	{ \n";
            query += "		?cname schema:name ?ename. FILTER(lang(?ename)=\"en\") \n";
            query += "		BIND(concat(strafter(?ename, \", \"), \" \", strbefore(?ename, \",\")) as ?name) \n";
            query += "		SERVICE SILENT <http://www.kanzaki.com/works/ld/wrapper/dpla-sparqler> { \n";
            query += "			?uri a \"image\" ; \n";
            query += "			wrp:title ?label ; \n";
            query += "			wrp:creator ?name ; \n";
            query += "			wrp:image ?image \n";
            query += "		} \n";
            query += "	}  \n";
            query += "} limit 12\n";

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