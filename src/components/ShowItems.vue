<template>
  <div>
    <ul class="horizontal-list my-5">
      <template v-for="(result, index2) in map">
        <li v-for="(obj, index) in result" v-bind:key="index2+'_'+index">
          <v-card class="my-2 mx-2" style="max-width : 300px">
            
            <template v-if="target == 'direct'">
              <a :href="obj.id" target="_blank">
                <div style="background-color: black; height: 150px;">
                  <v-img contain height="150px" v-bind:src="obj.thumbnail" />
                </div>
              </a>

              <v-card-text>
                <a :href="obj.id" target="_blank">
                  <b>{{obj.label.length > 20 ? obj.label.substr(0, 20)+"..." : obj.label}}</b>
                </a>
              </v-card-text>
            </template>
            <template v-else>
              <router-link v-bind:to="{ name : target ? target : 'item', query : { id: obj.id }}">
                <div style="background-color: black; height: 150px;">
                  <v-img contain height="150px" v-bind:src="obj.thumbnail" />
                </div>
              </router-link>

              <v-card-text>
                <router-link v-bind:to="{ name : target ? target : 'item', query : { id: obj.id }}">
                  <b>{{obj.label.length > 20 ? obj.label.substr(0, 20)+"..." : obj.label}}</b>
                </router-link>
                <p class="my-1" v-if="obj.provider">{{obj.provider}}</p>
              </v-card-text>
            </template>
          </v-card>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["map", "target"]
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