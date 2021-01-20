<template>
  <v-container v-if="markers.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ $t('過去の展覧会を探す') }}</h2>
    <div style="width: 100%; height: 600px">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
          v-for="(marker, index) in markers"
          :key="index"
          :lat-lng="marker.latlng"
        >
          <l-popup>
            <a target="_blank" :href="marker.url">{{ marker.content }}</a>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: ['u'],
  data: () => ({
    // results: [],
    link: null,
    // Map
    zoom: 5,
    center: [35.681489, 139.767136],
    center2: [],
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    markers: [],
  }),
  watch: {
    u() {
      this.search()
    },
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      if (this.u == null) {
        return
      }

      this.markers = []

      const u = this.u.split('/')
      const term = u[u.length - 1]

      let query = ''

      // ?creator
      query += 'SELECT DISTINCT ?s ?label ?type ?spatial ?lat ?long WHERE { \n'
      query += '	?s rdfs:label ?label ; a type:展覧会  . \n'
      // query += '	OPTIONAL {?s schema:about ?creator . ?creator a type:Person } \n'
      query += '	?s ?p ?value. \n'
      query += '	FILTER(bif:contains(?value, \'"' + term + '"\')) . \n'

      query += '	?s jps:accessInfo/schema:provider ?provider . \n'
      query += '	?provider schema:location ?spatial . \n'

      query += '	?spatial schema:geo ?geo . \n'
      query += '	?geo schema:latitude ?lat  . \n'
      query += '	?geo schema:longitude ?long . \n'
      query += '} ' // LIMIT 12 \n";

      axios
        .get(
          'https://jpsearch.go.jp/rdf/sparql?query=' +
            encodeURIComponent(query) +
            '&output=json'
        )
        .then((response) => {
          const results = response.data.results.bindings

          if (results.length > 0) {
            let lat = 0
            let long = 0
            for (let i = 0; i < results.length; i++) {
              const obj = results[i]
              const marker = {
                latlng: [Number(obj.lat.value), Number(obj.long.value)],
                content: obj.label.value,
                url: obj.s.value.replace('/data/', '/item/'),
              }
              this.markers.push(marker)
              lat += Number(obj.lat.value)
              long += Number(obj.long.value)
            }

            const center = [lat / results.length, long / results.length]
            this.center2 = center
          }
        })
    },
  },
}
</script>
