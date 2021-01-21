<template>
  <div v-if="id">
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="items">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <TargetAgent :u="id" class="mb-5" />
    <RelatedGallery :u="id" class="mt-10 mb-5" />
    <Keywords :u="id" class="mt-10 mb-5" />

    <Items :u="id" class="mt-10 mb-5" />
    <Event :u="id" class="mt-10 mb-5" />
    <MapC :u="id" type="agential" class="mt-10 mb-5" />
    <Network :u="id" class="mt-10 mb-5" />
    <Europeana :u="id" class="mt-10 mb-5" />
    <DPLA :u="id" class="mt-10 mb-5" />
    <v-container class="my-10">
      <div class="text-center">
        <small>
          <h3 class="mb-5">{{ $t('二次利用について') }}</h3>

          <template v-if="$i18n.locale == 'ja'">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              ><img
                alt="クリエイティブ・コモンズ・ライセンス"
                style="border-width: 0"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
            ><br />この作品は<a
              rel="license"
              href="http://creativecommons.org/licenses/by/4.0/"
              >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
            >の下に提供されています。
          </template>
          <template v-else>
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              ><img
                alt="Creative Commons License"
                style="border-width: 0"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
            ><br />This work is licensed under a
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              >Creative Commons Attribution 4.0 International License</a
            >.
          </template>

          <p class="mt-5">{{ $t('ただし、画像は個々の権利表示による') }}</p>
        </small>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

import Grid from '~/components/Grid.vue'
import TargetAgent from '~/components/TargetAgent.vue'
import RelatedGallery from '~/components/RelatedGallery.vue'
import Items from '~/components/Items.vue'
import MapC from '~/components/Map.vue'
import Event from '~/components/Event.vue'
import Keywords from '~/components/Keywords.vue'
import Europeana from '~/components/Europeana.vue'
import DPLA from '~/components/DPLA.vue'
import Network from '~/components/Network.vue'

@Component({
  components: {
    Grid,
    TargetAgent,
    RelatedGallery,
    Items,
    Event,
    Europeana,
    DPLA,
    Keywords,
    MapC,
    Network,
  },
})
export default class about extends Vue {
  endpoint: string = 'https://jpsearch.go.jp/rdf/sparql?query='

  title: any = this.$t('Item')
  id: any = null

  name: string = 'search'
  type: string = 'agential'

  get items() {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
      },
      {
        text: this.$t(this.type),
        disabled: false,
        to: this.localePath({ name: this.name }),
      },
      {
        text: this.title + this.$t('の自動ギャラリー'),
      },
    ]
  }

  @Watch('$route')
  watchR(): void {
    this.init()
  }

  // state
  created() {
    this.init()
  }

  init() {
    const id: string =
      this.$route.query.id + '' ||
      'https://jpsearch.go.jp/entity/chname/葛飾北斎'
    this.id = id

    const es = id.split('/')
    this.title = es[es.length - 1]
  }

  head() {
    const title = this.title
    return {
      title,
    }
  }
}
</script>
