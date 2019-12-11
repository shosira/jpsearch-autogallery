<template>
  <v-container>

    <v-flex xs12 sm4 offset-sm4>
      <TargetAgent v-if="id" :u="id" class="my-5" />
    </v-flex>


    <Items v-if="id" :u="id" class="my-5"/>

    <!-- 
    <Chart :u="id" class="my-5"/> -->

    <RelatedGallery :u="id" class="my-5"/>

    <Event :u="id" class="my-5"/>

    <Europeana :u="id" class="my-5"/>

    <DPLA :u="id" class="my-5"/>
  </v-container>
</template>

<script>
import TargetAgent from "../components/TargetAgent";
import Items from "../components/Items";
//import Chart from "../components/Chart";
import RelatedGallery from "../components/RelatedGallery";
import Event from "../components/Event";
import Europeana from "../components/Europeana";
import DPLA from "../components/DPLA";

export default {
  components: {
    TargetAgent,
    Items,
    //Chart,
    RelatedGallery,
    Event,
    Europeana,
    DPLA
  },
  data: () => ({
    //term: "歌川広重",
    link_related: "",
    link_items: "",
    id: null
  }),
  watch: {
    $route() {
      this.id = this.$route.query.id;
    }
  },
  mounted() {
    if (this.$route.query.id != "") {
      let id = this.$route.query.id;
      this.id = id
    }
  }
};
</script>

