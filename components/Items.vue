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
      <Chart :height="300" :u="u" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import HorizontalItems from '~/components/display/HorizontalItems.vue'
import Chart from '~/components/Chart.vue'

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

    const query = `
        SELECT distinct ?cho ?label ?thumbnail ?p_label ?name ?p_name WHERE {
          {
            ?cho rdfs:label ?label;
            schema:creator/owl:sameAs? <${u}> .
          } UNION {
            ?cho rdfs:label ?label;
              ?x ?y . ?y <https://jpsearch.go.jp/term/property#value> <${u}>
          }
          ${
            searchNoThumbFlag
              ? 'MINUS { ?cho schema:image ?thumbnail } '
              : '?cho schema:image ?thumbnail .'
          }
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

    if (!searchNoThumbFlag && results.length < 10) {
      this.search(true)
    }
  }
}
</script>
