<template>
  <v-row>
    <v-col v-for="(obj, index) in list" :key="index" :cols="cols" :sm="sm">
      <v-card no-body flat class="mb-4">
        <nuxt-link :to="localePath(obj.path)">
          <v-img
            :src="obj.image"
            contain
            style="height: 150px"
            width="100%"
            class="grey lighten-2"
          ></v-img>
        </nuxt-link>
        <div class="pa-4">
          <nuxt-link :to="localePath(obj.path)">
            <h3>{{ obj.label }}</h3>
          </nuxt-link>

          <p v-if="obj.description" class="mt-2 mb-0">{{ obj.description }}</p>
        </div>
        <template v-if="obj.url">
          <v-divider />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <a target="_blank" :href="obj.url" v-on="on"
                  ><img width="30px" :src="baseUrl + '/img/icons/rdf-logo.svg'"
                /></a>
              </template>
              <span>{{ 'RDF' }}</span>
            </v-tooltip>
          </v-card-actions>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class grid extends Vue {
  @Prop({ default: 12 })
  cols!: number

  @Prop({ default: 3 })
  sm!: number

  @Prop({ default: [] })
  list!: any[]

  baseUrl: string = process.env.BASE_URL || ''
}
</script>
