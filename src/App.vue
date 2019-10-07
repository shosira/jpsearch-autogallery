<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title class="headline">
                JPS自動ギャラリー
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat>
                    <router-link to="/">Home</router-link>
                </v-btn>
                <v-btn flat>
                    <router-link v-bind:to="{path: 'list'}">著者から探す</router-link>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    
        <v-content>
            <router-view/>
        </v-content>
    
        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
    
                <v-card-actions class="grey darken-3 justify-center my-5">
                    Satoru Nakamura
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>
