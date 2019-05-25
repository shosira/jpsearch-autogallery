<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title class="headline">
                電子展示プロトタイプ
            </v-toolbar-title>
            <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat><router-link to="/">Home</router-link></v-btn>
    </v-toolbar-items>
        </v-toolbar>
    
        <v-content>
            <router-view/>
        </v-content>
    
        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
    
                <v-card-actions class="grey darken-3 justify-center my-5">
                    Satoru Nakamura（国立国会図書館　次世代システム開発研究室）
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>
