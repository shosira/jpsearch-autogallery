<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  name: 'Chart',
  extends: Bar,
  props: ['u'],
  data: () => ({
    uris: [],
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

      const query = `
        SELECT DISTINCT ?cho ?label ?image WHERE {
          {
            ?cho rdfs:label ?label;
            schema:creator/owl:sameAs? <${this.u}> 
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

      const lang = this.$i18n.locale

      let query = 'PREFIX schema: <http://schema.org/> \n'
      query += 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n'
      query +=
        'SELECT (count(distinct ?cho) as ?c) ?pLabel ?name ?provider WHERE { \n'

      query += ' { '
      query += '?cho rdfs:label ?label; \n'
      query += 'schema:creator/owl:sameAs? <' + this.u + '> . \n'
      query += ' } UNION { '
      query += '?cho rdfs:label ?label; \n'
      query +=
        '?x ?y . ?y <https://jpsearch.go.jp/term/property#value> <' +
        this.u +
        '> . \n'
      query += ' } '

      query += 'OPTIONAL {?cho schema:image ?thumbnail} \n'

      query += '?cho jps:sourceInfo ?source . \n'
      query += '?source schema:provider ?provider . \n'
      query += '?provider rdfs:label ?pLabel . \n'

      query +=
        lang === 'en'
          ? '?provider schema:name ?name . filter(lang(?name) = "en") . \n'
          : ''

      query += '} group by ?pLabel ?name ?provider order by desc(?c) limit 10\n'

      axios
        .get(
          'https://jpsearch.go.jp/rdf/sparql?query=' +
            encodeURIComponent(query) +
            '&output=json'
        )
        .then((response) => {
          const results = response.data.results.bindings

          const labels = []
          const values = []
          const uris = []
          for (let i = 0; i < results.length; i++) {
            const obj = results[i]

            let label = obj.pLabel.value
            label = obj.name ? obj.name.value : label

            labels.push(label)
            values.push(Number(obj.c.value))
            uris.push(obj.provider.value)
          }

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
