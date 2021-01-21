<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ $t('Related place') }}</h2>
    <HorizontalItems :data="results.results_w_thumbnail" />

    <v-card flat class="my-5 pa-5">
      <div class="text-center">
        <small>
          <h3 class="mb-5">{{ $t('map') }}（{{ markers.length }}）</h3>
        </small>
      </div>
      <div id="map-wrap" style="height: 40vh" class="my-2">
        <mapc :markers="markers" :zoom="2" :center="center" />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import HorizontalItems from '~/components/display/HorizontalItems.vue'
import Mapc from '~/components/common/Map.vue'

@Component({
  components: {
    HorizontalItems,
    Mapc,
  },
})
export default class about extends Vue {
  @Prop()
  u!: any

  @Prop()
  type!: any

  results: any = {
    results_w_thumbnail: [],
  }

  center: number[] = [38, 0]

  markers: any[] = []

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

  getStmt(u: string, type: string) {
    if (type === 'agential') {
      return `?s jps:agential
          [jps:relationType/skos:broader?/rdfs:label "制作"; jps:value/owl:sameAs? <${u}> ] . `
    } else {
      return `?s schema:spatial <${u}> . `
    }
  }

  async search() {
    const limit = 20

    const u = this.u

    const lang = this.$i18n.locale

    const type = this.type
    const stmt = this.getStmt(u, type)

    const query = `
        SELECT DISTINCT ?keyword ?label ?name ?lat ?long WHERE { 
          ${stmt}
          ?s schema:spatial ?keyword . 
          FILTER(?keyword != <${u}> ) . 
          optional { ?keyword schema:geo ?loc. ?loc schema:latitude ?lat ; schema:longitude ?long . } 
          ?keyword rdfs:label ?label . 

          ${
            lang === 'ja'
              ? ''
              : "OPTIONAL {?keyword schema:name ?name . filter (lang(?name) = 'en')}"
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

    const markers = []

    let alat = 0
    let along = 0

    for (let i = 0; i < results.length; i++) {
      const obj = results[i]

      let label = obj.label.value
      label = obj.name ? obj.name.value : label

      const nObj = {
        _id: obj.keyword.value,
        to: this.localePath({
          name: 'entity',
          params: { entity: 'spatial' },
          query: {
            id: obj.keyword.value,
          },
        }),
        _source: {
          _label: label,
          _url: obj.keyword.value,
          _thumbnail: obj.thumbnail ? obj.thumbnail.value : 'mdi-map',
        },
      }
      this.results.results_w_thumbnail.push(nObj)

      if (obj.lat) {
        const param: any = {
          id: obj.keyword.value,
        }

        const marker: any = {
          latlng: [Number(obj.lat.value), Number(obj.long.value)],
          content: label,
          path: { name: 'entity', params: { entity: 'spatial' }, query: param },
        }

        if (obj.image) {
          marker.image = obj.image.value
        }

        alat += Number(obj.lat.value)
        along += Number(obj.long.value)

        markers.push(marker)
      }
    }

    if (markers.length > 0) {
      const size = markers.length
      this.center = [alat / size, along / size]
    }

    this.markers = markers
  }
}
</script>
