<template>
  <v-card>
    <v-row class="pa-4">
      <v-col cols="12" sm="3" class="mb-4">
        <a :href="item._source._url" target="_blank">
          <v-img
            :src="$utils.formatArrayValue(item._source._thumbnail)"
            contain
            style="height: 150px"
            width="100%"
            class="grey lighten-2"
          ></v-img>
        </a>
      </v-col>
      <v-col cols="12" sm="9">
        <h3 class="mb-4">
          <a :href="item._source._url" target="_blank">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="$utils.formatArrayValue(item._source._label)"></span>
          </a>
        </h3>

        <template v-if="item._source.description">
          <div>
            {{ $utils.formatArrayValue(item._source.description) }}
          </div>
        </template>

        <div class="text-right mt-4">
          <a
            v-if="item._source._related"
            class="mr-2 primary--text"
            :href="$utils.formatArrayValue(item._source._related)"
            target="_blank"
          >
            {{ $t('view_full_item') }}
            <v-icon>mdi-open-in-new</v-icon>
          </a>

          <ResultOption
            v-if="!item.share_hide"
            :item="{
              label: $utils.formatArrayValue(item._source._label),
              url: $utils.formatArrayValue(item._source._url),
            }"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class ListItem extends Vue {
  @Prop()
  item!: any

  sorted(source: any) {
    const obj: any = {}
    const keys = Object.keys(source).sort()
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      obj[key] = source[key]
    }
    return obj
  }
}
</script>
