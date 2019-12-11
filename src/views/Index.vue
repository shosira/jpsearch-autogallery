<template>
  <div>
    <section class="mb-5">
      <v-parallax src="assets/hero.jpeg" height="600">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>JPS自動ギャラリー</b>
          </h1>
          <v-btn large class="mt-5" :to="{name: 'item'}" color="primary">試してみる</v-btn>
        </v-layout>
      </v-parallax>
    </section>
  </div>
</template>
