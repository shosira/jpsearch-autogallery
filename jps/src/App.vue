<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline">
                <span>電子展示プロトタイプ</span>
            </v-toolbar-title>
        </v-toolbar>
    
        <v-content>
            <Index/>
        </v-content>
    
        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
    
                <v-card-actions class="grey darken-3 justify-center">
                    Satoru Nakamura（国立国会図書館　次世代システム開発研究室）
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
import Index from './components/Index'

export default {
    name: 'App',
    components: {
        Index
    },
    data() {
        return {
            //
        }
    }
}
</script>
