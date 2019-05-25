<template>
    <v-container>
        <div style="width : 100%; height : 600px">
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker v-for="marker, index in markers" :lat-lng="marker.latlng">
                    <l-popup><a target="_blank" :href="marker.url">{{marker.content}}</a></l-popup>
                </l-marker>
            </l-map>
        </div>
    </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios';

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
    data() {
        return {
            zoom: 7,
            center: L.latLng(47.413220, -1.219482),
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            markers: []
        }
    },
    methods: {
        removeMarker(index) {
            this.markers.splice(index, 1);
        },
        addMarker(event) {
            this.markers.push(event.latlng);
        }
    },
    mounted() {
        let term = "葛飾北斎"

        let query = "PREFIX type: <https://jpsearch.go.jp/term/type/> \n";

        query += "SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n";
        query += "	?s rdfs:label ?label ; a type:展覧会  . \n";
        query += "	OPTIONAL {?s schema:creator ?creator .} \n";
        query += "	?s ?p ?value. \n";
        query += "	FILTER(bif:contains(?value, '\"" + term + "\"')) . \n";
        query += "	?s jps:sourceInfo ?source . \n";
        query += "	?s schema:spatial ?spatial . \n";
        query += "	?spatial schema:geo ?geo . \n";
        query += "	?geo schema:latitude ?lat  . \n";
        query += "	?geo schema:longitude ?long . \n";
        query += "} " //LIMIT 12 \n";

        axios.get("https://jpsearch.go.jp/rdf/sparql?query=" + encodeURIComponent(query) + "&output=json")
            .then(response => {
                this.results_event = response.data.results.bindings
                this.markers = []
                let lat = 0
                let long = 0
                for (let i = 0; i < this.results_event.length; i++) {
                    let obj = this.results_event[i]
                    let marker = {
                        "latlng": L.latLng(Number(obj.lat.value), Number(obj.long.value)),
                        "content": obj.label.value,
                        "url": obj.s.value
                    }
                    this.markers.push(marker)
                    lat += Number(obj.lat.value)
                    long += Number(obj.long.value)
                }

                this.center = L.latLng(lat / this.results_event.length, long / this.results_event.length)
            }).catch(error => { console.log(error); });
    }
};
</script>

<style>
#map {
    width: 100%;
    height: 600px;
}
</style>
