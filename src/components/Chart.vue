<template>
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" v-show="chartData.length > 0" />
</template>

<script>
import axios from 'axios';
import { GChart } from 'vue-google-charts';
export default {
    props: ['term'],
    components: {
        GChart
    },
    data: () => ({
        chartData: [],
        chartOptions: {}
    }),
    methods: {
        search(term) {

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