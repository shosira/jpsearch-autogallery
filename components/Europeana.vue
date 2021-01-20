<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">{{ 'Euroepeana' }}</h2>
    <HorizontalItems :data="results.results_w_thumbnail" />
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

  async search() {
    const u = this.u.split('/')
    const term = u[u.length - 1]

    const query = `
        PREFIX ore: <http://www.openarchives.org/ore/terms/>
        PREFIX edm: <http://www.europeana.eu/schemas/edm/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        SELECT distinct ?uri ?label ?image WHERE {
          BIND(chname:${term} as ?cname)
            {
              ?cname schema:name ?ename. 
              FILTER(lang(?ename)="en")
              BIND(replace(?ename, ", ", " ") as ?name)
              ?loduri owl:sameAs ?cname ; 
                rdfs:isDefinedBy <http://dbpedia.org/>.
              SERVICE SILENT <http://sparql.europeana.eu/> {
                {?uri dc:creator ?name .} 
                UNION
                {?proxy dc:creator ?loduri ; ore:proxyFor ?cho .
                ?uri ore:proxyFor ?cho ; edm:europeanaProxy "false". }
              ?uri dc:title ?label .
              ?uri ore:proxyIn [edm:isShownBy ?image ]
            }
          }
        }
        ORDER BY RAND()
        LIMIT 20
      `

    const result = await axios.get(
      'https://jpsearch.go.jp/rdf/sparql?query=' +
        encodeURIComponent(query) +
        '&output=json'
    )

    const results = result.data.results.bindings
    for (let i = 0; i < results.length; i++) {
      const obj = results[i]

      const label = obj.label.value

      const nObj = {
        _id: obj.uri.value,
        href: obj.uri.value.replace('/data/', '/item/'),
        _source: {
          _label: label,
          _url: obj.uri.value,
          _thumbnail: obj.image ? obj.image.value : process.env.NO_IMG,
        },
      }
      this.results.results_w_thumbnail.push(nObj)
    }
  }
}
</script>
