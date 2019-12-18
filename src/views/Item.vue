<template>
  <v-container>
    <ShowItem :id="id" class="mt-5" />

    <br />

    <hr class="my-5" />

    <br />

    <v-card class="my-5">
      <v-card-text>
        <RelatedItems :id="id" />
      </v-card-text>
    </v-card>

    <br />

    <hr class="my-5" />

    <br />

    <v-btn color="info" small @click="show_all_flg = !show_all_flg">
      <template v-if="show_all_flg">すべて非表示</template>
      <template v-else>すべて表示</template>
    </v-btn>
    <ListGalleries :id="id" :show_all_flg="show_all_flg" class="mt-5" />
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
    <ListCategories
      :id="id"
      label="Source"
      property="jps:sourceInfo"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
    <ListCategories
      :id="id"
      label="Access"
      property="jps:accessInfo"
      :show_all_flg="show_all_flg"
      class="mt-5"
    />
  </v-container>
</template>

<script>
import ShowItem from "../components/ShowItem.vue";
import ListCategories from "../components/ListCategories.vue";
import ListGalleries from "../components/ListGalleries.vue";
import RelatedItems from "../components/RelatedItems.vue";

export default {
  components: {
    ListCategories,
    ListGalleries,
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
      { name: "item", query: { id: this.id } },
      () => {},
      () => {}
    );
  }
};
</script>

