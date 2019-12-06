<template>
  <div>
    <ul class="horizontal-list my-5">
      <li v-for="(obj, index) in arr" v-bind:key="index">
        <v-card class="my-2 mx-2" style="max-width : 300px">
          <router-link v-bind:to="{ name : 'item', query : { id: obj.id }}">
            <div style="background-color: black; height: 150px;">
              <v-img contain height="150px" v-bind:src="obj.thumbnail" />
            </div>
          </router-link>

          <v-card-text>
            <router-link v-bind:to="{ name : 'item', query : { id: obj.id }}">
              <b>{{obj.label}}</b>
            </router-link>
            <p class="my-1">{{obj.provider}}</p>
          </v-card-text>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["arr"]
};
</script>

<style>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}

.horizontal-list li {
  /* 横スクロール用 */
  display: inline-block;
}
</style>