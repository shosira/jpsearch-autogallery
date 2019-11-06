<template>
  <v-app>

    <v-toolbar>
      <v-toolbar-title>JPS自動ギャラリー</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text v-bind:to="{name: 'index'}">HOME</v-btn>
        <v-btn text v-bind:to="{name: 'list'}">著者から探す</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
            <router-view/>
        </v-content>

       <v-footer padless dark class="mt-5">
    <v-col
      class="text-center py-5"
      cols="12"
    >
      {{ new Date().getFullYear() }} — Satoru Nakamura
    </v-col>
  </v-footer>
    
  </v-app>
</template>
