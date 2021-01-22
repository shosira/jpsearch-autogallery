<template>
  <div v-if="Object.keys(item).length > 0">
    <v-sheet v-if="item._source._thumbnail" color="grey lighten-4">
      <v-img
        :src="item._source._thumbnail"
        contain
        style="height: 300px"
      ></v-img>
    </v-sheet>
    <v-container class="my-5">
      <h1>
        {{ item._source._label }}
      </h1>
      <span v-if="lang == 'ja'">{{ item._source.kana }}</span>
      <p class="my-5">{{ item._source.description }}</p>
      <div class="text-center my-5">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mr-5"
              target="_blank"
              :href="
                'https://jpsearch.go.jp/rdf/sparql/easy/?describe=' +
                encodeURIComponent(item._id) +
                '&qrel=contributor'
              "
              icon
              v-on="on"
              ><v-img
                contain
                width="30px"
                :src="baseUrl + '/img/icons/rdf-logo.svg'"
            /></v-btn>
          </template>
          <span>{{ $t('RDF') }}</span>
        </v-tooltip>
        <ResultOption
          :item="{
            label: item._source._label,
            url: item._source._url,
          }"
        />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class about extends Vue {
  baseUrl: any = process.env.BASE_URL

  @Prop()
  u!: string

  item: any = {}

  get lang() {
    return this.$i18n.locale
  }

  @Watch('$route')
  watchR(): void {
    this.init()
  }

  created() {
    this.init()
  }

  async init() {
    const id = this.u
    const lang = this.lang

    const query = `
      SELECT distinct * WHERE {
        BIND(<${id}> as ?s)
        ?s rdfs:label ?label.
        OPTIONAL {?s schema:description ?comment . }
        ${
          lang === 'ja'
            ? "OPTIONAL {?s schema:name ?kana . filter (lang(?kana) = 'ja-kana')}"
            : "OPTIONAL {?s schema:name ?name . filter (lang(?name) = 'en')}"
        }
        OPTIONAL {?s schema:image ?thumbnail . }
        OPTIONAL {?s owl:sameAs ?wid . ?wid rdfs:isDefinedBy <http://www.wikidata.org/> }
      }
      LIMIT 1
    `

    const result = await axios.get(
      'https://jpsearch.go.jp/rdf/sparql?query=' +
        encodeURIComponent(query) +
        '&output=json'
    )

    const obj = result.data.results.bindings[0]
    if (!obj.thumbnail && obj.wid) {
      obj.thumbnail = {
        value: await this.search4wiki(obj.wid.value),
      }
    }

    let label = obj.label.value
    label = obj.name ? obj.name.value : label

    const item = {
      _id: obj.s.value,
      _source: {
        _label: label,
        kana: obj.kana ? obj.kana.value : '',
        description: obj.comment ? obj.comment.value : '',
        _thumbnail: obj.thumbnail ? obj.thumbnail.value : null, // process.env.NO_IMG,
        _url: process.env.BASE_URL + this.$route.fullPath,
      },
    }
    this.item = item
  }

  async search4wiki(u: string) {
    let query = 'PREFIX schema: <http://schema.org/> \n'
    query += 'SELECT distinct * WHERE { \n'
    query += '<' + u + '> wdt:P18 ?thumbnail. \n'
    query += '} \n'
    query += 'LIMIT 1 \n'

    const result = await axios.get(
      'https://query.wikidata.org/sparql?query=' +
        encodeURIComponent(query) +
        '&output=json'
    )

    if (result.data.results.bindings.length > 0) {
      const obj = result.data.results.bindings[0]
      return obj.thumbnail.value
    } else {
      return null // process.env.NO_IMG
    }
  }
}
</script>
