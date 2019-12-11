<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>

    <br/>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">
          hogehoge
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
};
</script>
<style>
.v-btn {
  text-transform:none !important;
}
</style>
