<template>
    <v-container>
    
        <v-layout row wrap>
    
            <v-flex xs12 sm10>
                <v-form ref="form">
                    <v-text-field v-model="term"></v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn color="primary" @click="search()">
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
            <h2>関連ギャラリー<br/><small><a target="_blank" :href=link_related>すべてを見る</a></small></h2>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm2 v-for="result in results_related">
                    <v-card>
                        <a @click="getAll(result.plabel.value)">
                            <v-img v-if="result.pthumbnail" v-bind:src="result.pthumbnail.value" style="max-height: 20rem;"></v-img>
                        </a>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">
                                    <router-link :to="{ path: '/search', query: { q: result.plabel.value }}">{{ result.plabel.value }}</router-link>
                                </h3>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    
        <v-container grid-list-md text-xs-center v-show="results_items.length > 0">
            <h2 class="my-5">作品で知る<br/><small><a target="_blank" :href=link_items>すべてを見る</a></small></h2>
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
            <div style="width : 100%;" class="mt-5">
                <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
            </div>
        </v-container>
    
        <div class="my-5"></div>
    
        <v-container grid-list-md text-xs-center>
            <h2 class="my-5">過去の展覧会を探す</h2>
    
            <div style="width : 100%; height : 600px">
                <l-map :zoom="zoom" :center="center">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker v-for="marker, index in markers" :lat-lng="marker.latlng">
                        <l-popup><a target="_blank" :href="marker.url">{{marker.content}}</a></l-popup>
                    </l-marker>
                </l-map>
            </div>
    
        </v-container>
    
        <div class="my-5"></div>
    
        <v-container grid-list-md text-xs-center v-show="results_europeana.length > 0">
            <h2 class="mt-5 mb-5">Europeanaで探す</h2>
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
    
        <div class="my-5"></div>
    
        <v-container grid-list-md text-xs-center v-show="results_dpla.length > 0">
            <h2 class="mt-5 mb-5">DPLAで探す</h2>
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
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GChart } from 'vue-google-charts'

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    components: {
        GChart,
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
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
        link_related: "",
        link_items: "",
        //Map
        zoom: 7,
        center: L.latLng(47.413220, -1.219482),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        markers: [],
        //chart
        chartData: [],
        chartOptions: {}
    }),
    watch: {
        '$route' (to, from) {
            if (this.$route.query.q != "") {
                this.term = this.$route.query.q
            }
            this.getAll(this.term);
        }
    },
    mounted() {
        if (this.$route.query.q != "") {
            this.term = this.$route.query.q
        }
        this.getAll(this.term);
    },
    methods: {
        search() {
            var query = Object.assign({}, this.$route.query)
            query.q = this.term
            this.$router.push({ query: query })
        },
        getAll(term) {
            this.term = term;
            this.getTargetAgent(term);
            this.getItems(term);
            this.getRelatedAgents(term);
            this.getRelatedPosts(term);
            this.getEventItems(term);
            this.getEuropeanaItems(term);
            this.getDPLAItems(term);
            this.showMap(term);
            this.showChart(term);
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

            this.link_items = "https://jpsearch.go.jp/rdf/sparql/easy/?query=" + encodeURIComponent(query.split("LIMIT ")[0])

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

            this.link_related = "http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query.split("LIMIT ")[0])

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
        },
        showMap(term) {
            let query = "PREFIX type: <https://jpsearch.go.jp/term/type/> \n";

            query += "SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n";
            query += "	?s rdfs:label ?label ; a type:展覧会  . \n";
            query += "	OPTIONAL {?s schema:creator ?creator .} \n";
            query += "	?s ?p ?value. \n";
            query += "	FILTER(bif:contains(?value, '\"" + term + "\"')) . \n";
            query += "	?s jps:sourceInfo ?source . \n";
            query += "	?s schema:spatial ?spatial . \n";
            query += "	?spatial schema:geo ?geo . \n";
            query += "	?geo schema:latitude ?lat  . \n";
            query += "	?geo schema:longitude ?long . \n";
            query += "} " //LIMIT 12 \n";

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    let results_event = response.data.results.bindings
                    this.markers = []
                    let lat = 0
                    let long = 0
                    for (let i = 0; i < results_event.length; i++) {
                        let obj = results_event[i]
                        let marker = {
                            "latlng": L.latLng(Number(obj.lat.value), Number(obj.long.value)),
                            "content": obj.label.value,
                            "url": obj.s.value
                        }
                        this.markers.push(marker)
                        lat += Number(obj.lat.value)
                        long += Number(obj.long.value)
                    }

                    this.center = L.latLng(lat / this.results_event.length, long / this.results_event.length)
                }).catch(error => { console.log(error); });
        },
        showChart(term) {
            let query = "PREFIX schema: <http://schema.org/> \n";
            query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
            query += "SELECT ?cho ?label ?thumbnail ?pLabel WHERE { \n";
            query += "?cho rdfs:label ?label; \n";
            query += "schema:creator/owl:sameAs? chname:" + term + " . \n";

            query += "OPTIONAL {?cho schema:image ?thumbnail} \n";

            query += "?cho jps:sourceInfo ?source . \n";
            query += "?source schema:provider ?provider . \n";
            query += "?provider rdfs:label ?pLabel . \n";

            query += "} \n";
            //query += "LIMIT 12 \n";

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {

                    let results_items = response.data.results.bindings
                    let source_map = {}
                    for (let i = 0; i < results_items.length; i++) {
                        let obj = results_items[i]
                        let source = obj.pLabel.value

                        if (!source_map[source]) {
                            source_map[source] = 0
                        }

                        source_map[source] += 1
                    }

                    let labels = []
                    let data = []

                    let arr = []
                    arr.push(['Source', '# of items'])

                    let keysSorted = Object.keys(source_map).sort(function(a, b) { return -(source_map[a] - source_map[b]) })

                    for (let i = 0; i < keysSorted.length; i++) {
                        let source = keysSorted[i]
                        arr.push([source, source_map[source]])
                    }

                    this.chartData = arr

                }).catch(error => { console.log(error); });
        }
    }
}
</script>

