// ./app.js

function buildPersonUrl(term) {
    let query = "PREFIX schema: <http://schema.org/> \n";
    query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
    query += "SELECT distinct * WHERE { \n";
    query += "?s rdfs:label ?label. \n";
    query += "filter (?s = <http://ja.dbpedia.org/resource/"+term+">) . \n";
    query += "?s rdfs:comment ?comment. \n";
    query += "OPTIONAL {?s <http://dbpedia.org/ontology/thumbnail> ?thumbnail} \n";
    query += "} \n";
    query += "LIMIT 1 \n";
    return query
}

function buildUrl(term) {
    let query = "PREFIX schema: <http://schema.org/> \n";
    query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
    query += "SELECT ?cho ?label ?thumbnail WHERE { \n";
    query += "?cho rdfs:label ?label; \n";
    query += "schema:creator/owl:sameAs? chname:"+term+" . \n";

    query += "OPTIONAL {?cho schema:image ?thumbnail} \n";
    query += "} \n";
    query += "LIMIT 10 \n";
    return query
}

function buildRelatedPeopleOnlyUrl(term) {
    let query = "\n";

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
    query += "   schema:creator/owl:sameAs? ?e.  \n";
    //query += "   ?e rdf:type <https://jpsearch.go.jp/term/type/Agent> .  \n";
    query += "   ?cho schema:image ?thumbnail \n";
    query += " } \n";
    query += "} LIMIT 10 \n";
    return query
}

function buildRelatedPeopleUrl(term){
    let query = "\n";

    query += "select distinct ?cho ?label ?thumbnail ?plabel where { \n";
    query += "    <http://ja.dbpedia.org/resource/"+term+"> <http://dbpedia.org/ontology/wikiPageWikiLink> ?o .   \n";
    query += "?o rdfs:label ?plabel.  \n";
    query += "?o <http://www.w3.org/2002/07/owl#sameAs> ?e \n";
    query += "           FILTER(strstarts(str(?e), \"http://www.wikidata.org/\")) \n";
    query += "   SERVICE <https://jpsearch.go.jp/rdf/sparql> { \n";
    query += "  ?cho rdfs:label ?label; \n";
    query += "   schema:creator/owl:sameAs? ?e.  \n";
    query += "   ?cho schema:image ?thumbnail \n";
    query += " } \n";
    query += "} LIMIT 10 \n";
    return query
}

function buildRelatedEventUrl(term){
    let query = "PREFIX type: <https://jpsearch.go.jp/term/type/> \n";

    query += "SELECT DISTINCT ?s ?label ?creator ?type WHERE { \n";
    query += "	?s rdfs:label ?label ; a type:展覧会  . \n";
    query += "	OPTIONAL {?s schema:creator ?creator .} \n";
    query += "	?s ?p ?value. \n";
    query += "	FILTER(bif:contains(?value, '\""+term+"\"')) . \n";
    query += "	?s jps:sourceInfo ?source . \n";
    query += "} LIMIT 10 \n";
    return query
}

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        results2: [],
        results3: [],
        results4: [],
        results6: [],
        term: "伊能忠敬",
        name: "AAA",
    },
    mounted() {
       this.getall(this.term);
    },
    methods: {
        getall(term){
            this.getPosts(term);
            this.getPersonPosts(term);
            this.getRelatedPeoplePosts(term);
            this.getRelatedPosts(term);
            this.getRelatedEventPosts(term);
        },
        getPersonPosts(term) {

            this.results = [];
            let query = buildPersonUrl(term);
            console.log(query);

            axios.get("http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results6 = response.data.results.bindings
                    console.log(response)
                }).catch(error => { console.log(error); });
        },
        getPosts(term){

            this.results = [];
            let query = buildUrl(term);

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    
                    this.results = response.data.results.bindings
                }).catch(error => { console.log(error); });
        },
        getRelatedPeoplePosts(term) {
            this.results3 = [];
            let query = buildRelatedPeopleOnlyUrl(term);

            axios.get("http://ja.dbpedia.org/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results3 = response.data.results.bindings
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
        getRelatedEventPosts(term) {
            this.results4 = [];
            let query = buildRelatedEventUrl(term);

            axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
                .then(response => {
                    this.results4 = response.data.results.bindings
                }).catch(error => { console.log(error); });
        }
    }
});