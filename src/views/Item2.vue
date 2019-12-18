<template>
  <v-container>
    <ShowItem :id="id" class="mt-5" />

    <RelatedItems :id="id" class="mt-5" />
  </v-container>
</template>

<script>
import ShowItem from "../components/ShowItem.vue";
import RelatedItems from "../components/RelatedItems.vue";

export default {
  components: {
    ShowItem,
    RelatedItems
  },
  data: () => ({
    id: "",
    show_all_flg: true
  }),
  watch: {
    $route() {
      this.id = this.$route.query.id;
    }
  },
  mounted() {
    let query_id = this.$route.query.id;
    if (query_id == "" || query_id == null) {
      query_id = "dignl-1901899";
    }
    this.id = query_id;
    this.$router.replace(
      { name: "item2", query: { id: this.id } },
      () => {},
      () => {}
    );
  }
};
</script>

