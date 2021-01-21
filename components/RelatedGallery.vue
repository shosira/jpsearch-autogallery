<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ $t('Related agential') }}</h2>
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
        SELECT DISTINCT ?dest ?plabel ?pthumbnail ?description ?name WHERE { 
          ?s jps:agential
          [jps:relationType/skos:broader?/rdfs:label "制作"; jps:value/owl:sameAs? <${u}> ],
          [jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ]
          FILTER(?dest != <${u}> )
          
          ${
            searchNoThumbFlag
              ? 'MINUS { ?dest schema:image ?pthumbnail } '
              : '?dest schema:image ?pthumbnail .'
          }
          ?dest rdfs:label ?plabel;
            schema:description ?description . 

          ${
            lang === 'ja'
              ? ''
              : "OPTIONAL {?dest schema:name ?name . filter (lang(?name) = 'en')}"
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

      let label = obj.plabel.value
      label = obj.name ? obj.name.value : label

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
          _thumbnail: obj.pthumbnail ? obj.pthumbnail.value : 'mdi-account',
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
