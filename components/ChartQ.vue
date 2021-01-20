<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  name: 'Chart',
  extends: Bar,
  props: ['query', 'type', 'u'],
  data: () => ({
    uris: [],
    total: 0,
  }),
  watch: {
    u() {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    handle(point, event) {
      const item = event[0]
      if (!item) {
        console.log({ point })
        return
      }

      const uri = this.uris[item._index]

      const stmt = this.type === 'keyword' ? `schema:about <${this.u}> ` : ''

      const query = `
        SELECT DISTINCT ?cho ?label ?image WHERE {
          {
            ?cho rdfs:label ?label;
            ${stmt}
          } UNION {
            ?cho rdfs:label ?label;
            ?x ?y . ?y <https://jpsearch.go.jp/term/property#value> <${this.u}>
          }
          ?cho rdfs:label ?label ;  jps:sourceInfo/schema:provider <${uri}> .
          OPTIONAL {?cho schema:image ?image}
        }
      `

      const url =
        'https://jpsearch.go.jp/rdf/sparql/easy/?query=' +
        encodeURIComponent(query)

      open(url, '_blank')
    },
    init() {
      this.chartData = []

      const query = this.query

      axios
        .get(
          'https://jpsearch.go.jp/rdf/sparql?query=' +
            encodeURIComponent(query) +
            '&output=json'
        )
        .then((response) => {
          const results = response.data.results.bindings

          let total = 0

          const labels = []
          const values = []
          const uris = []
          for (let i = 0; i < results.length; i++) {
            const obj = results[i]

            const es = obj.provider.value.split('/')
            let label = obj.pLabel ? obj.pLabel.value : es[es.length - 1]
            label = obj.name ? obj.name.value : label

            labels.push(label)
            values.push(Number(obj.c.value))
            uris.push(obj.provider.value)

            total += Number(obj.c.value)
          }

          this.total = 0

          this.uris = uris

          const data = {
            labels,
            datasets: [
              {
                label: 'Item',
                data: values,
                borderWidth: 1,
              },
            ],
          }

          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: TextTrackCue,
                  },
                },
              ],
            },
            responsive: true,
            maintainAspectRatio: false,
            onClick: this.handle,
          }

          this.renderChart(data, options)
        })
    },
  },
}
</script>
