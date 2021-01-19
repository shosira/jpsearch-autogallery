<template>
  <v-container v-if="results.results_w_thumbnail.length > 0">
    <h2 class="mt-5 mb-3 text-center">
      {{ 'Digital Public Library of America' }}
    </h2>
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

  async search() {
    const limit = 20

    const u = this.u.split('/')
    const term = u[u.length - 1]

    const query = `
        PREFIX wrp: <http://purl.org/net/ld/wrapper/term#>
        SELECT distinct ?uri ?label ?image WHERE {
          BIND(chname:${term} as ?cname)
            {
              ?cname schema:name ?ename. 
              FILTER(lang(?ename)="en")

              BIND(concat(strafter(?ename, ", "), " ", strbefore(?ename, ",")) as ?name)

              SERVICE SILENT <http://www.kanzaki.com/works/ld/wrapper/dpla-sparqler> {
                ?uri a "image" ;
                  wrp:title ?label ;
                  wrp:creator ?name ;
                  wrp:image ?image
              
            }
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
