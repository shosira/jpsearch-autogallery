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
    <RelatedGallery :u="id" class="my-5" />
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

@Component({
  components: {
    Grid,
    TargetAgent,
    RelatedGallery,
  },
})
export default class about extends Vue {
  endpoint: string = 'https://jpsearch.go.jp/rdf/sparql?query='

  title: any = ''
  id: any = null

  get items() {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
      },
      {
        text: this.$t('search'),
        disabled: false,
        to: this.localePath({ name: 'search' }),
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
    this.title = id.replace('ncname', 'chname').split('chname/')[1]
  }
}
</script>
