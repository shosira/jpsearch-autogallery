<template>
  <v-container>
    <ShowItem :id="id" class="mt-5" />
    <ListCreators :id="id" class="mt-5" />
  </v-container>
</template>

<script>
import ShowItem from "../components/ShowItem.vue";
import ListCreators from "../components/ListCreators.vue";

export default {
  components: {
    ListCreators,
    ShowItem
  },
  data: () => ({
    id: ""
  }),
  watch: {
    $route() {
      this.id = this.$route.query.id;
    }
  },
  mounted() {
    let query_id = this.$route.query.id;
    if (query_id == "" || query_id == null) {
      query_id = "dignl-1901899"
    }
    this.id = query_id
    this.$router.replace({ name: "item", query: { id: this.id } }, () => {}, () => {});
  }
};
</script>

