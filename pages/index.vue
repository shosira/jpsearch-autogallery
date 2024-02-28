<template>
  <div>
    <section v-if="top" class="grey lighten-2">
      <v-img max-height="400px" contain :src="top">
        <v-row align="center" class="white--text pa-2 fill-height text-center">
          <v-col v-if="false">
            <h1 class="display-1">
              <b>{{ $t(siteName) }} </b>
            </h1>
            <v-btn
              large
              class="mt-5"
              :to="
                localePath({
                  name: 'search',
                  /*
                  query: {
                    'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc',
                  },
                  */
                })
              "
              color="primary"
              >{{ $t('try_out') }}</v-btn
            >
          </v-col>
        </v-row>
      </v-img>
    </section>
    <v-container>
      <p class="text-right">
        <v-chip v-if="ref" class="text-right" label>{{ ref }}</v-chip>
      </p>
    </v-container>

    <v-container class="py-5">
      <v-card flat>
        <div class="my-5 pa-5 text-center">
          <img width="45px" class="mb-2" :src="icon" />
          <h1>{{ $t(siteName) }}</h1>
          <p class="py-5">
            {{ $t(siteDesc) }}
          </p>
        </div>

        <div v-if="items.length > 0">
          <h3 class="my-10 text-center">{{ $t('menu') }}</h3>

          <v-row class="mb-10">
            <v-col v-for="(obj, key) in items" :key="key" cols="12" :sm="3">
              <v-card flat no-body class="mb-4 jps-card">
                <template v-if="obj.href">
                  <a :href="obj.href" target="_blank">
                    <div class="text-center grey lighten-3 pa-10 rounded">
                      <v-icon size="100">{{ obj.icon }}</v-icon>
                    </div>
                  </a>
                  <div class="pa-2">
                    <a :href="obj.href" target="_blank">
                      <h4>{{ obj.label }}</h4>
                    </a>

                    <p v-if="obj.description" class="mt-2 mb-0">
                      {{ obj.description }}
                    </p>
                  </div>
                </template>
                <template v-else>
                  <nuxt-link :to="localePath(obj.path)">
                    <div class="text-center grey lighten-3 pa-10 rounded">
                      <v-icon size="100">{{ obj.icon }}</v-icon>
                    </div>
                  </nuxt-link>
                  <div class="pa-2">
                    <nuxt-link :to="localePath(obj.path)">
                      <h4>{{ obj.label }}</h4>
                    </nuxt-link>

                    <p v-if="obj.description" class="mt-2 mb-0">
                      {{ obj.description }}
                    </p>
                  </div>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''

  icon: string = 'https://jpsearch.go.jp/assets/img/brand/logo-sq-4c.svg'

  ref: string = ''

  top: string = ''

  get items(): any[] {
    return [
      {
        label: this.$t('agential'),
        path: {
          name: 'search',
        },
        description: '',
        icon: 'mdi-account-group',
      },
      {
        label: this.$t('map'),
        path: {
          name: 'map',
        },
        description: '',
        icon: 'mdi-map',
      },
      {
        label: this.$t('keyword'),
        path: {
          name: 'keywords',
        },
        description: '',
        icon: 'mdi-tag-multiple',
      },
    ]
  }

  get siteName(): any {
    const siteName: any = process.env.siteName || ''
    return this.$t(siteName)
  }

  get siteDesc(): any {
    const siteDesc: any = process.env.siteDesc || ''
    return this.$t(siteDesc)
  }

  head() {
    const title = this.siteName
    return {
      titleTemplate: null,
      title,
    }
  }
}
</script>
