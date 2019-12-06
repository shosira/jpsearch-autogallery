<template>
  <v-container>
    <ShowItem :id="id" class="mt-5" />

    <v-btn text small @click="show_all_flg = !show_all_flg" color="primary">
      <template v-if="show_all_flg">すべて非表示</template>
      <template v-else>すべて表示</template>
    </v-btn>

    <ListCategories
      :id="id"
      label="Creator"
      property="schema:creator"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="Publisher"
      property="schema:publisher"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="Spatial"
      property="schema:spatial"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="Temporal"
      property="schema:temporal"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="About"
      property="schema:about"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="PartOf"
      property="schema:isPartOf"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="Type"
      property="rdf:type"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
  </v-container>
</template>

<script>
import ShowItem from "../components/ShowItem.vue";
import ListCategories from "../components/ListCategories.vue";

export default {
  components: {
    ListCategories,
    ShowItem
  },
  data: () => ({
    id: "",
    show_all_flg: false
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
      { name: "item", query: { id: this.id } },
      () => {},
      () => {}
    );
  }
};
</script>

