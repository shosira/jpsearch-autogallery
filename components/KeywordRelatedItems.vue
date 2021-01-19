<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ $t('Items') }}</h2>
    <HorizontalItems :data="results.results_w_thumbnail" />

    <v-card flat class="my-5 pa-5">
      <div class="text-center">
        <small>
          <h3 class="mb-5">{{ $t('データベース（上位10件）') }}</h3>
        </small>
      </div>
      <Chart :height="300" :query="query" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import HorizontalItems from '~/components/display/HorizontalItems.vue'
import Chart from '~/components/ChartQ.vue'

@Component({
  components: {
    HorizontalItems,
    Chart,
  },
})
export default class about extends Vue {
  @Prop()
  u!: any

  results: any = {
    results_w_thumbnail: [],
  }

  @Watch('u')
  watchU(): void {
    this.init()
  }

  created() {
    this.init()
  }

  get query() {
    const lang = this.$i18n.locale

    const u = this.u

    // OPTIONAL {?cho schema:image ?thumbnail}

    const query = `
        PREFIX schema: <http://schema.org/>
        PREFIX type: <https://jpsearch.go.jp/term/type/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX hpdb: <https://w3id.org/hpdb/api/>
        PREFIX sh: <http://www.w3.org/ns/shacl#>
        SELECT (count(distinct ?cho) as ?c) ?pLabel ?name ?provider WHERE {
          {
            ?cho rdfs:label ?label;
            schema:about <${u}> .
          } 

          
          
          ?cho jps:sourceInfo ?source .

          ?source schema:provider ?provider .
          ?provider rdfs:label ?pLabel . 

          ${
            lang === 'ja'
              ? ''
              : '?provider schema:name ?name . filter(lang(?name) = "en")'
          }
        }
        group by ?pLabel ?name ?provider order by desc(?c)
        LIMIT 10
    `

    /*
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
    */
    return query
  }

  init() {
    for (const key in this.results) {
      this.results[key] = []
    }
    this.search()
  }

  async search(searchNoThumbFlag = false) {
    const limit = 20

    const u = this.u

    const lang = this.$i18n.locale

    // ?cho schema:image ?thumbnail .

    const query = `
        PREFIX schema: <http://schema.org/>
        PREFIX type: <https://jpsearch.go.jp/term/type/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX hpdb: <https://w3id.org/hpdb/api/>
        PREFIX sh: <http://www.w3.org/ns/shacl#>
        SELECT distinct ?cho ?label ?thumbnail ?p_label ?name ?p_name WHERE {
          {
            ?cho rdfs:label ?label;
            schema:about <${u}> .
          } 
          
          ${searchNoThumbFlag ? '' : '?cho schema:image ?thumbnail .'}
          ?cho jps:sourceInfo ?sourceInfo .
          ?sourceInfo schema:provider ?p .
          ?p rdfs:label ?p_label .

          ${
            lang === 'ja'
              ? ''
              : "OPTIONAL {?cho schema:name ?name . filter (lang(?name) = 'en')} OPTIONAL {?p schema:name ?p_name . filter (lang(?p_name) = 'en')}"
          }
        }
        ORDER BY RAND()
        LIMIT ${limit}
      `

    const result = await axios.get(
      'https://jpsearch.go.jp/rdf/sparql?query=' +
        encodeURIComponent(query) +
        '&output=json'
    )

    const results = result.data.results.bindings
    for (let i = 0; i < results.length; i++) {
      const obj = results[i]

      let label = obj.label.value
      label = obj.name ? obj.name.value : label

      let plabel = obj.p_label.value
      plabel = obj.p_name ? obj.p_name.value : plabel

      const nObj = {
        _id: obj.cho.value,
        href: obj.cho.value.replace('/data/', '/item/'),
        _source: {
          _label: label,
          description: plabel,
          _url: obj.cho.value,
          _thumbnail: obj.thumbnail ? obj.thumbnail.value : process.env.NO_IMG,
        },
      }
      this.results.results_w_thumbnail.push(nObj)
    }

    if (!searchNoThumbFlag && results.length === 0) {
      this.search(true)
    }
  }
}
</script>
