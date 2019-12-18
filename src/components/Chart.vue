<script>
import { Bar } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Bar,
  name: "chart",
  props: ["u"],
  methods: {
    init() {
      this.chartData = [];

      let query = "PREFIX schema: <http://schema.org/> \n";
      query += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
      query += "SELECT (count(?cho) as ?c) ?pLabel WHERE { \n";
      query += "?cho rdfs:label ?label; \n";
      query += "schema:creator/owl:sameAs? <" + this.u + "> . \n";

      query += "OPTIONAL {?cho schema:image ?thumbnail} \n";

      query += "?cho jps:sourceInfo ?source . \n";
      query += "?source schema:provider ?provider . \n";
      query += "?provider rdfs:label ?pLabel . \n";

      query += "} group by ?pLabel order by desc(?c) \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results = response.data.results.bindings;

          let labels = [];
          let values = [];
          for (let i = 0; i < results.length; i++) {
            let obj = results[i];

            labels.push(obj.pLabel.value);
            values.push(obj.c.value);
          }

          let data = {
            labels: labels,
            datasets: [
              {
                label: "Item",
                data: values,
                borderWidth: 1
              }
            ]
          };

          let options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: TextTrackCue
                  }
                }
              ]
            },
            responsive: true,
            maintainAspectRatio: false
          };

          this.renderChart(data, options);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    u: function() {
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>