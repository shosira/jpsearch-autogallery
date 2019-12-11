<template>
  <v-container grid-list-md text-xs-center>
    <h3 class="my-5">過去の展覧会を探す</h3>

    <div style="width : 100%; height : 600px">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker v-for="(marker, index) in markers" v-bind:key="index" :lat-lng="marker.latlng">
          <l-popup>
            <a target="_blank" :href="marker.url">{{marker.content}}</a>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  props: ["u"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data: () => ({
    //results: [],
    link: null,
    //Map
    zoom: 7,
    center: [35.681489, 139.767136],
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    markers: []
  }),
  methods: {
    search() {
      if (this.u == null) {
        return;
      }

      this.markers = [];

      let u = this.u.split("/");
      let term = u[u.length - 1];

      let query = "PREFIX type: <https://jpsearch.go.jp/term/type/> \n";

      query +=
        "SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n";
      query += "	?s rdfs:label ?label ; a type:展覧会  . \n";
      query += "	OPTIONAL {?s schema:creator ?creator .} \n";
      query += "	?s ?p ?value. \n";
      query += "	FILTER(bif:contains(?value, '\"" + term + "\"')) . \n";
      query += "	?s jps:sourceInfo ?source . \n";
      query += "	?s schema:spatial ?spatial . \n";
      query += "	?spatial schema:geo ?geo . \n";
      query += "	?geo schema:latitude ?lat  . \n";
      query += "	?geo schema:longitude ?long . \n";
      query += "} "; //LIMIT 12 \n";

      axios
        .get(
          "https://jpsearch.go.jp/rdf/sparql?query=" +
            encodeURIComponent(query) +
            "&output=json"
        )
        .then(response => {
          let results_event = response.data.results.bindings;

          if (results_event.length > 0) {
            let lat = 0;
            let long = 0;
            for (let i = 0; i < results_event.length; i++) {
              let obj = results_event[i];
              let marker = {
                latlng: [Number(obj.lat.value), Number(obj.long.value)],
                content: obj.label.value,
                url: obj.s.value
              };
              this.markers.push(marker);
              lat += Number(obj.lat.value);
              long += Number(obj.long.value);
            }

            let center = [
              lat / results_event.length,
              long / results_event.length
            ];
            this.center = center
          }
        })
    }
  },
  watch: {
    u: function() {
      this.search();
    }
  },
  created() {
    this.search();
  }
};
</script>