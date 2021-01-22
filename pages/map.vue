<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="bh">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>

    <v-container>
      <h1 class="my-5">{{ $t('map') }}</h1>
      <div id="map-wrap" style="height: 80vh" class="my-2">
        <mapc :markers="markers" :zoom="2" :center="center" />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import Mapc from '~/components/common/Map.vue'

@Component({
  components: {
    Mapc,
  },
})
export default class PageMap extends Vue {
  map: any = {}
  markers: any[] = []

  async asyncData({ payload }: any) {
    if (payload) {
      return { item: payload }
    } else {
      /*
      const url = 'https://jpsearch.go.jp/rdf/sparql?query='
      let query = ''
      query =
        'PREFIX schema: <http://schema.org/>' +
        'PREFIX jps: <https://jpsearch.go.jp/term/property#>' +
        'SELECT DISTINCT ?s ?label ?lat ?long WHERE {' +
        '?ac schema:spatial ?s . ' +
        '?s schema:geo ?loc. ' +
        // 'optional { ?ac schema:image ?image . } ' +
        '?loc schema:latitude ?lat ; schema:longitude ?long . ?s rdfs:label ?label }'

      // min(?image) as ?image

      url = url + encodeURIComponent(query) + '&output=json'

      const result = await axios.get(url)

      */

      const result = await axios.get(process.env.BASE_URL + '/data/map.json')

      const results = result.data.results.bindings
      const markers = []

      let lat = 0
      let long = 0

      for (let i = 0; i < results.length; i++) {
        const obj = results[i]

        const label = obj.label.value

        const param: any = {
          id: obj.s.value,
        }

        const marker: any = {
          latlng: [Number(obj.lat.value), Number(obj.long.value)],
          content: label,
          path: { name: 'entity', params: { entity: 'spatial' }, query: param },
        }

        if (obj.image) {
          marker.image = obj.image.value
        }

        markers.push(marker)

        lat += Number(obj.lat.value)
        long += Number(obj.long.value)
      }

      return {
        markers,
        center: [lat / markers.length, long / markers.length],
      }
    }
  }

  get title() {
    return this.$t('map')
  }

  head() {
    const title = this.title
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  }

  get bh() {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
      },
      {
        text: this.title,
      },
    ]
  }
}
</script>
