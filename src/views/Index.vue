<template>
    <v-app light>
    
        <section>
            <v-parallax src="assets/hero.jpeg" height="600">
                <v-layout column align-center justify-center class="white--text">
                    <h1 class="white--text mb-2 display-1 text-xs-center">電子展示プロトタイプ</h1>
                    <div class="subheading mb-3 text-xs-center">Japan Searchの活用例</div>
                    <v-btn class="blue lighten-2 mt-5" dark large href="#/search?q=葛飾北斎">
                        「葛飾北斎」を見てみる
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>
    
        <v-content>
    
    
            <section>
                <v-layout column wrap class="my-5" align-center>
                    <v-flex xs12 sm4 class="my-3">
                        <div class="text-xs-center">
                            <h2 class="headline">メニュー</h2>
                            <span class="subheading">
                        いずれも開発中のものです。
                      </span>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <v-container grid-list-xl>
                            <v-layout row wrap align-center>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">
                                                <router-link to="/list">作品数の多い著者100人</router-link>
                                            </div>
                                        </v-card-title>
                                        <v-card-text>
                                            作品数の多い著者100人から探します。
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline">開発中</div>
                                        </v-card-title>
                                        <v-card-text>
                                            開発中です。
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">開発中</div>
                                        </v-card-title>
                                        <v-card-text>
                                            開発中です。
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </section>
    
            <section>
                <v-parallax src="assets/section.jpg" height="380">
                    <v-layout column align-center justify-center>
                        <div class="headline white--text mb-3 text-xs-center">Japan Search</div>
                        <em>Japan Search provides holding information for digital archives operated by a variety of organizations in Japan, thereby enabling users to search for digital content that is available for secondary use without written permission.</em>
                        <v-btn class="blue lighten-2 mt-5" dark large href="https://jpsearch.go.jp/">
                            View
                        </v-btn>
                    </v-layout>
                </v-parallax>
            </section>
    
            <section>
                <v-container grid-list-xl>
                    <v-layout row wrap justify-center class="my-5">
                        <v-flex xs12 sm4>
                            <v-card class="elevation-0 transparent">
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline">目的</div>
                                </v-card-title>
                                <v-card-text>
                                    Japan Searchのギャラリーの自動生成
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm4 offset-sm1>
                            <v-card class="elevation-0 transparent">
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline">方法</div>
                                </v-card-title>
                                <v-card-text>
                                    Japan Search SPARQL Endpointほか、LODの利用
                                </v-card-text>
                                <v-list class="transparent">
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-icon class="blue--text text--lighten-2">cloud</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title>Japan Search SPARQL Endpoint</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-icon class="blue--text text--lighten-2">cloud</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title>DBpedia Japanese</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
    
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </section>
    
    
        </v-content>
    </v-app>
</template>