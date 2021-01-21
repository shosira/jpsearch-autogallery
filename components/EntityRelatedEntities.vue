<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ $t('Related ' + out) }}</h2>
    <HorizontalItems :data="results.results_w_thumbnail" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import HorizontalItems from '~/components/display/HorizontalItems.vue'

@Component({
  components: {
    HorizontalItems,
  },
})
export default class about extends Vue {
  @Prop()
  u!: any;

  @Prop()
  in!: any

  @Prop()
  out!: any

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

  inStmt(type: string, u: string) {
    if (type === 'spatial') {
      return `?cho schema:spatial <${u}>;`
    } else {
      return `?cho schema:about <${u}>;`
    }
  }

  outStmt(type: string) {
    if (type === 'agential') {
      return `jps:agential
          [jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ] .`
    } else {
      return `jps:agential
          [jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ] .`
    }
  }

  async search(searchNoThumbFlag = false) {
    console.log({ searchNoThumbFlag })
    const limit = 20

    const u = this.u

    const lang = this.$i18n.locale

    // const stmt = `?cho schema:about <${u}>;`

    const query = `
        SELECT distinct ?dest ?label ?thumbnail ?description ?name WHERE {
          
          ${this.inStmt(this.in, u)}
          ${this.outStmt(this.out)}
          
          ${
            searchNoThumbFlag
              ? 'MINUS { ?dest schema:image ?thumbnail } '
              : '?dest schema:image ?thumbnail .'
          }
          ?dest rdfs:label ?label .
          optional { ?dest schema:description ?description . }

          ${
            lang === 'ja'
              ? ''
              : "OPTIONAL {?dest schema:name ?name . filter (lang(?name) = 'en')} OPTIONAL {?p schema:name ?p_name . filter (lang(?p_name) = 'en')}"
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

      // let plabel = obj.p_label.value
      // plabel = obj.p_name ? obj.p_name.value : plabel

      const nObj = {
        _id: obj.dest.value,
        to: this.localePath({
          name: 'item',
          query: {
            id: obj.dest.value,
          },
        }),
        _source: {
          _label: label,
          description: obj.description ? obj.description.value : '',
          _url: obj.dest.value,
          _thumbnail: obj.thumbnail ? obj.thumbnail.value : 'mdi-account',
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
