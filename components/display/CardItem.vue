<template>
  <v-card
    no-body
    :class="horizontal ? '' : 'mb-4'"
    :style="horizontal ? 'width: ' + width + 'px;' : ''"
  >
    <template v-if="item.to">
      <nuxt-link :to="item.to">
        <v-img
          :src="item._source._thumbnail"
          contain
          style="height: 150px"
          width="100%"
          class="grey lighten-2"
        ></v-img>
      </nuxt-link>
    </template>
    <template v-else>
      <a :href="item.href" target="_blank">
        <v-img
          :src="item._source._thumbnail"
          contain
          style="height: 150px"
          width="100%"
          class="grey lighten-2"
        ></v-img>
      </a>
    </template>

    <div
      class="pa-4"
      :style="
        horizontal
          ? 'width: ' +
            width +
            'px; height: ' +
            /*height*/ 150 +
            'px; overflow-y: auto;'
          : ''
      "
    >
      <template v-if="item.to">
        <nuxt-link :to="item.to">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h4 v-html="item._source._label"></h4>
        </nuxt-link>
      </template>
      <template v-else>
        <a :href="item.href" target="_blank">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h4 v-html="item._source._label"></h4>
        </a>
      </template>
      <template v-if="item._source.description">
        <div class="mt-2">
          {{ item._source.description }}
        </div>
      </template>
    </div>

    <template v-if="!item.share_hide">
      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <ResultOption
          :item="{
            label: item._source._label,
            url: item._source._url,
          }"
        />
      </v-card-actions>
    </template>
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
export default class CardItem extends Vue {
  @Prop({ required: true })
  item!: any

  @Prop({
    default: 240,
  })
  width!: number

  @Prop({
    default: 300,
  })
  height!: number

  @Prop({
    default: false,
  })
  horizontal!: boolean
}
</script>
<style>
a {
  text-decoration: none;
}
</style>
