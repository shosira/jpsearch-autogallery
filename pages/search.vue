<template>
  <div>
    <v-sheet color="grey lighten-3">
      <v-container class="py-4">
        <h1>
          <template v-if="$i18n.locale === 'ja'">
            {{ $t(title) }}{{ $t('browse_by') }}
          </template>
          <template v-else>
            {{ $t('browse_by') }}
            {{ $t(title) }}
          </template>
          （{{ total.toLocaleString() }}）
        </h1>
      </v-container>
    </v-sheet>
    <v-container>
      <template v-if="loadingFlag">
        <div class="text-center my-10">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </template>
      <template v-else>
        <v-row align="center" class="mt-5">
          <v-col cols="12">
            <v-text-field
              v-model="keywordStr"
              single-line
              background-color="grey lighten-3"
              class="px-4"
              filled
              rounded
              dense
              hide-details
              :label="$t('add_a_search_term')"
              append-icon="mdi-magnify"
              clearable
              clear-icon="mdi-close-circle"
              @click:append="updateQuery()"
              @keydown.enter="trigger"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center my-5">
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
            :total-visible="7"
            @input="setCurrentPage"
          ></v-pagination>
        </div>

        <Grid cols="12" :sm="2" :list="people"></Grid>

        <div class="text-center my-5">
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
            :total-visible="7"
            @input="setCurrentPage"
          ></v-pagination>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import Grid from '~/components/Grid.vue'

@Component({
  components: {
    Grid,
  },
  watchQuery: true,
})
export default class about extends Vue {
  endpoint: string = 'https://jpsearch.go.jp/rdf/sparql?query='

  title: any = this.$t('人物')

  total: number = 0
  perPage: number = 20

  people: any[] = []

  loadingFlag: boolean = true

  currentPage: number = 1

  keywordStr: any = ''

  @Watch('$route')
  watchR(): void {
    this.search()
  }

  async getTotal() {
    const keyword = this.keywordStr
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
      SELECT DISTINCT (count(distinct ?cho) as ?c) WHERE {
        ?s schema:creator ?cho .
        ?cho rdfs:label ?label;
        schema:image ?thumbnail . 
        ${keyword !== '' ? '?label bif:contains \'"' + keyword + '"\'' : ''}
      }
    `

    const url = this.endpoint + encodeURIComponent(query) + '&output=json'

    const results = await axios.get(url)

    return Number(results.data.results.bindings[0].c.value)
  }

  // state
  created() {
    this.search()
  }

  get paginationLength() {
    return Math.ceil(this.total / this.perPage)
  }

  async search() {
    this.loadingFlag = true

    const keyword = this.$route.query.keyword || ''
    this.keywordStr = keyword

    const total = await this.getTotal()
    this.total = total

    const from = Number(this.$route.query.from) || 0
    this.currentPage = from / this.perPage + 1

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
      select distinct count(?s) as ?count ?cho ?label ?thumbnail WHERE {
        ?s schema:creator ?cho .
        ?cho rdfs:label ?label;
        schema:image ?thumbnail . 
        ${keyword !== '' ? '?label bif:contains \'"' + keyword + '"\'' : ''}
      }
      ORDER BY desc(?count)
      LIMIT ${this.perPage}
      OFFSET ${from}
    `

    axios
      .get(this.endpoint + encodeURIComponent(query) + '&output=json')
      .then((response) => {
        const people = []

        const results = response.data.results.bindings

        for (let i = 0; i < results.length; i++) {
          const obj = results[i]

          const person: any = {
            label: obj.label.value,
            description: this.$t('Item') + ': ' + obj.count.value,
            path: {
              name: 'item',
              query: {
                id: obj.cho.value,
              },
            },
          }

          if (obj.thumbnail) {
            person.image = obj.thumbnail.value
          } else {
            person.image = process.env.BASE_URL + '/img/icons/no-image.png'
          }

          people.push(person)
        }

        this.people = people

        this.loadingFlag = false
      })
  }

  setCurrentPage(value: number) {
    const from: any = (value - 1) * this.perPage
    const query: any = Object.assign({}, this.$route.query)
    query.from = from
    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return

    this.updateQuery()
  }

  updateQuery() {
    const query: any = Object.assign({}, this.$route.query)

    let keywordStr = this.keywordStr

    if (!keywordStr) {
      keywordStr = ''
    }

    let keywords
    if (keywordStr.startsWith('"') && keywordStr.endsWith('"')) {
      keywords = [keywordStr]
    } else {
      keywords = keywordStr.split(' ')
    }

    query.keyword = keywords

    delete query.from

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }
}
</script>
