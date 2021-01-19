<template>
  <div>
    <section class="mb-5 grey">
      <v-img height="300px" contain>
        <v-row align="center" class="white--text pa-2 fill-height text-center">
          <v-col>
            <h1 class="display-1">
              <b>{{ $t(siteName) }} </b>
            </h1>
            <v-btn
              large
              class="mt-5"
              :to="
                localePath({
                  name: 'search',
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
      <v-card class="my-5">
        <v-card-title>
          <h2>{{ $t('about_') }}</h2>
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
            <p>{{ $t(siteDesc) }}</p>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''
  // siteName: string = $t(process.env.siteName) || ''
  // siteDesc: string = $t(process.env.siteDesc) || ''

  get siteName() {
    return this.$t(process.env.siteName) || ''
  }

  get siteDesc() {
    return this.$t(process.env.siteDesc) || ''
  }

  head() {
    const title = this.$t(this.siteName)
    return {
      titleTemplate: null,
      title,
    }
  }
}
</script>
