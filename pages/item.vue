<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="items">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <TargetAgent v-if="id" :u="id" class="mb-5" />
    <v-container> </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import Grid from '~/components/Grid.vue'
import TargetAgent from '~/components/TargetAgent.vue'

@Component({
  components: {
    Grid,
    TargetAgent,
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
