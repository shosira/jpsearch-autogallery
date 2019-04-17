<template>
    <v-container>
    
        <v-layout row wrap>
            <v-flex xs12 sm10>
                <v-form ref="form">
                    <v-text-field v-model="term"></v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn color="primary" @click="getAll(term)">
                    <v-icon>search</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    
        <v-flex xs12 sm4 offset-sm4>
            <br/><br/><br/>
            <v-card>
                <v-img v-if="result_target.thumbnail" v-bind:src="result_target.thumbnail.value" style="max-height: 20rem;"></v-img>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{result_target.label.value}}</h3>
                        <div> {{result_target.comment.value}} </div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    
    
    
        <v-container grid-list-md text-xs-center v-show="results_related.length > 0">
            <br/><br/><br/>
            <h2>関連ギャラリー</h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_related">
                    <v-card>
                        <a @click="getAll(result.plabel.value)">
                            <v-img v-if="result.pthumbnail" v-bind:src="result.pthumbnail.value" style="max-height: 20rem;"></v-img>
                        </a>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0"><a @click="getAll(result.plabel.value)">{{ result.plabel.value }}</a></h3>
                                <!-- <div> {{ result.comment.value }} </div> -->
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    
        <v-container grid-list-md text-xs-center v-show="results_items.length > 0">
            <br/><br/><br/>
            <h2>作品で知る</h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_items">
                    <v-card>
                        <a target="snorql" v-bind:href="result.cho.value">
                            <v-img v-if="result.thumbnail" v-bind:src="result.thumbnail.value" style="max-height: 20rem;"></v-img>
                        </a>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0"><a target="snorql" v-bind:href="result.cho.value">{{ result.label.value }}</a></h3>
                                <!-- <div> {{ result.comment.value }} </div> -->
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    
        <v-container grid-list-md text-xs-center v-show="results_event.length > 0">
            <br/><br/><br/>
            <h2>過去の展覧会を探す</h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_event">
                    <v-card>
                        <a target="snorql" v-bind:href="result.s.value">
                            <v-img v-if="result.thumbnail" v-bind:src="result.thumbnail.value" style="max-height: 20rem;"></v-img>
                        </a>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0"><a target="snorql" v-bind:href="result.s.value">{{ result.label.value }}</a></h3>
                                <!-- <div> {{ result.comment.value }} </div> -->
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    
        <v-container grid-list-md text-xs-center v-show="results_europeana.length > 0">
            <br/><br/><br/>
            <h2>Europeanaで探す</h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_europeana">
                    <v-card>
                        <a target="snorql" v-bind:href="result.uri.value">
                            <v-img v-if="result.image" v-bind:src="result.image.value" style="max-height: 20rem;"></v-img>
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
    
        <v-container grid-list-md text-xs-center v-show="results_dpla.length > 0">
            <br/><br/><br/>
            <h2>DPLAで探す</h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_dpla">
                    <v-card>
                        <a target="snorql" v-bind:href="result.uri.value">
                            <v-img v-if="result.image" v-bind:src="result.image.value" style="max-height: 20rem;"></v-img>
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
    
    </v-container>
</template>

<script>
function buildTargetAgentUrl(term) {
    let query = "PREFIX schema: <http://schema.org/> \n";
    query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
    query += "SELECT distinct * WHERE { \n";
    query += "?s rdfs:label ?label. \n";
    query += "filter (?s = <http://ja.dbpedia.org/resource/" + term + ">) . \n";
    query += "?s rdfs:comment ?comment. \n";
    query += "OPTIONAL {?s <http://dbpedia.org/ontology/thumbnail> ?thumbnail} \n";
    query += "} \n";
    query += "LIMIT 1 \n";
    return query
}

function buildItemsUrl(term) {
    let query = "PREFIX schema: <http://schema.org/> \n";
    query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
    query += "SELECT ?cho ?label ?thumbnail WHERE { \n";
    query += "?cho rdfs:label ?label; \n";
    query += "schema:creator/owl:sameAs? chname:" + term + " . \n";

    query += "OPTIONAL {?cho schema:image ?thumbnail} \n";
    query += "} \n";
    query += "LIMIT 12 \n";
    return query
}

function buildRelatedAgentsUrl(term) {
    let query = "";

    query += "select distinct ?plabel ?pthumbnail ?pcomment where { \n";
    query += "    <http://ja.dbpedia.org/resource/" + term + "> <http://dbpedia.org/ontology/wikiPageWikiLink> ?o .   \n";
    query += "?o rdfs:label ?plabel.  \n";
    query += "?o rdfs:comment ?pcomment.  \n";
    query += "?o <http://dbpedia.org/ontology/thumbnail> ?pthumbnail.  \n";
    query += "?o <http://www.w3.org/2002/07/owl#sameAs> ?e \n";
    query += "           FILTER(strstarts(str(?e), \"http://www.wikidata.org/\")) \n";
    //query += "   ?o rdf:type <http://schema.org/Person> .  \n";
    query += "   SERVICE <https://jpsearch.go.jp/rdf/sparql> { \n";
    query += "  ?cho rdfs:label ?label; \n";
    query += "   owl:sameAs? ?e.  \n";
    //query += "   ?e rdf:type <https://jpsearch.go.jp/term/type/Agent> .  \n";
    query += "   ?cho schema:image ?thumbnail \n";
    query += " } \n";
    query += "} LIMIT 12 \n";
    return query
}

function buildRelatedPeopleUrl(term) {
    let query = "";

    query += "select distinct ?cho ?label ?thumbnail ?plabel where { \n";
    query += "    <http://ja.dbpedia.org/resource/" + term + "> <http://dbpedia.org/ontology/wikiPageWikiLink> ?o .   \n";
    query += "?o rdfs:label ?plabel.  \n";
    query += "?o <http://www.w3.org/2002/07/owl#sameAs> ?e \n";
    query += "           FILTER(strstarts(str(?e), \"http://www.wikidata.org/\")) \n";
    query += "   SERVICE <https://jpsearch.go.jp/rdf/sparql> { \n";
    query += "  ?cho rdfs:label ?label; \n";
    query += "   schema:creator/owl:sameAs? ?e.  \n";
    query += "   ?cho schema:image ?thumbnail \n";
    query += " } \n";
    query += "} LIMIT 12 \n";
    return query
}

function buildEventItemsUrl(term) {
    let query = "PREFIX type: <https://jpsearch.go.jp/term/type/> \n";

    query += "SELECT DISTINCT ?s ?label ?creator ?type WHERE { \n";
    query += "	?s rdfs:label ?label ; a type:展覧会  . \n";
    query += "	OPTIONAL {?s schema:creator ?creator .} \n";
    query += "	?s ?p ?value. \n";
    query += "	FILTER(bif:contains(?value, '\"" + term + "\"')) . \n";
    query += "	?s jps:sourceInfo ?source . \n";
    query += "} LIMIT 12 \n";
    return query
}

function buildEuropeanaItemsUrl(term) {
    let query = "";
    query += "PREFIX dc: <http://purl.org/dc/elements/1.1/> \n";
    query += "PREFIX edm: <http://www.europeana.eu/schemas/edm/> \n";
    query += "PREFIX ore: <http://www.openarchives.org/ore/terms/> \n";
    query += "SELECT ?uri ?label ?image WHERE{ \n";
    query += "	BIND(chname:" + term + " as ?cname) \n";
    query += "	{ \n";
    query += "		?cname schema:name ?ename. FILTER(lang(?ename)=\"en\") \n";
    query += "		BIND(replace(?ename, \", \", \" \") as ?name) \n";
    query += "		?loduri owl:sameAs ?cname ; rdfs:isDefinedBy <http://dbpedia.org/>. \n";
    query += "		SERVICE SILENT <http://sparql.europeana.eu/> { \n";
    query += "			{?uri dc:creator ?name .} UNION  \n";
    query += "			{?proxy dc:creator ?loduri ; ore:proxyFor ?cho .  \n";
    query += "?uri ore:proxyFor ?cho ; edm:europeanaProxy \"false\". } \n";
    query += "			?uri dc:title ?label . \n";
    //query += "			OPTIONAL{?uri ore:proxyIn [edm:isShownBy ?image ]} \n";
    query += "			?uri ore:proxyIn [edm:isShownBy ?image ] \n";
    query += "		} \n";
    query += "		} \n";
    query += "} limit 12\n";
    return query
}

function buildDPLAItemsUrl(term) {
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
    return query
}

import axios from 'axios';

export default {
    data: () => ({
        result_target: {
            label: "",
            comment: ""
        },
        results_items: [],
        results_related: [],
        results_event: [],
        results_europeana: [],
        results_dpla: [],
        term: "歌川広重",
    }),
    mounted() {
        this.getAll(this.term);
    },
    methods: {
        getAll(term) {
            this.term = term;
            this.getTargetAgent(term);
            this.getItems(term);
            this.getRelatedAgents(term);
            this.getRelatedPosts(term);
            this.getEventItems(term);
            this.getEuropeanaItems(term);
            this.getDPLAItems(term);
        },
        getTargetAgent(term) {

            this.result_target = {
                label: "",
                comment: ""
            }
            let query = buildTargetAgentUrl(term);

            axios.get("http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.result_target = response.data.results.bindings[0]
                }).catch(error => { console.log(error); });
        },
        getItems(term) {

            this.results_items = [];
            let query = buildItemsUrl(term);

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {

                    this.results_items = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getRelatedPosts(term) {
            this.results2 = [];
            let query = buildRelatedPeopleUrl(term);

            axios.get("http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results2 = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getRelatedAgents(term) {
            this.results_related = [];
            let query = buildRelatedAgentsUrl(term);

            axios.get("http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results_related = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getEventItems(term) {
            this.results_event = [];
            let query = buildEventItemsUrl(term);

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results_event = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getEuropeanaItems(term) {
            this.results_europeana = [];
            let query = buildEuropeanaItemsUrl(term);
            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {

                    this.results_europeana = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getDPLAItems(term) {
            this.results_dpla = [];
            let query = buildDPLAItemsUrl(term);
            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {

                    this.results_dpla = response.data.results.bindings
                }).catch(error => { console.log(error); });
        }
    }
}
</script>

<style>

</style>
