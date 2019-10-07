<template>
    <v-container>
    
        <v-layout row wrap>
    
            <v-flex xs12 sm10>
                <v-form ref="form">
                    <v-text-field v-model="term"></v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn color="primary" @click="search()">
                    <v-icon>search</v-icon>
                </v-btn>
            </v-flex>
    
        </v-layout>
    
        <v-flex xs12 sm4 offset-sm4>
            <TargetAgent :term=term class="mt-5"/>
        </v-flex>
    
        <div class="my-5"></div>

        <Items :term="term"/>
            
        <v-card style="width : 100%;" class="mt-5">
            <Chart :term="term"/>
        </v-card>
    
        <div class="my-5"></div>
    
        <RelatedGallery :term="term"/>
    
        <div class="my-5"></div>
    
        <Event :term="term"/>
    
        <div class="my-5"></div>
    
        <Europeana :term="term"/>
    
        <div class="my-5"></div>
    
        <DPLA :term="term"/>
    
    </v-container>
</template>

<script>


import TargetAgent from "../components/TargetAgent";
import Chart from "../components/Chart";
import Items from "../components/Items";
import RelatedGallery from "../components/RelatedGallery";
import Event from "../components/Event";
import Europeana from "../components/Europeana";
import DPLA from "../components/DPLA";

export default {
    components: {
        TargetAgent,
        Chart,
        Items,
        RelatedGallery,
        Event,
        Europeana,
        DPLA
    },
    data: () => ({
        term: "歌川広重",
        link_related: "",
        link_items: "",
        
        //iframe
        iframe_url: ""
    }),
    watch: {
        '$route' () {
            if (this.$route.query.q != "") {
                this.term = this.$route.query.q
            }
            this.getAll(this.term);
        }
    },
    mounted() {
        if (this.$route.query.q != "") {
            this.term = this.$route.query.q
        }
        this.getAll(this.term);
    },
    methods: {
        search() {
            var query = Object.assign({}, this.$route.query)
            query.q = this.term
            this.$router.push({ query: query })
        },
        getAll(term) {
            this.iframe_url = "timeline.html?q=" + term
            this.term = term;
        }
    }
}
</script>

