(function(t){function e(e){for(var r,l,i=e[0],o=e[1],c=e[2],h=0,p=[];h<i.length;h++)l=i[h],s[l]&&p.push(s[l][0]),s[l]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);u&&u(e);while(p.length)p.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,i=1;i<a.length;i++){var o=a[i];0!==s[o]&&(r=!1)}r&&(n.splice(e--,1),t=l(l.s=a[0]))}return t}var r={},s={app:0},n=[];function l(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=t,l.c=r,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(a,r,function(e){return t[e]}.bind(null,r));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=o;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"44be":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),s=a("bb71");a("da64");r["a"].use(s["a"],{iconfont:"md"});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",[a("v-toolbar-title",{staticClass:"headline"},[t._v("\n            電子展示プロトタイプ\n        ")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{flat:""}},[a("router-link",{attrs:{to:"/"}},[t._v("Home")])],1)],1)],1),a("v-content",[a("router-view")],1),a("v-footer",{attrs:{dark:"",height:"auto"}},[a("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[a("v-card-actions",{staticClass:"grey darken-3 justify-center my-5"},[t._v("\n                Satoru Nakamura（国立国会図書館　次世代システム開発研究室）\n            ")])],1)],1)],1)},l=[],i=a("2877"),o=a("6544"),c=a.n(o),u=a("7496"),h=a("8336"),p=a("b0af"),m=a("99d9"),d=a("549c"),v=a("553a"),g=a("9910"),b=a("71d9"),f=a("2a7f"),y={},_=Object(i["a"])(y,n,l,!1,null,null,null),x=_.exports;c()(_,{VApp:u["a"],VBtn:h["a"],VCard:p["a"],VCardActions:m["a"],VContent:d["a"],VFooter:v["a"],VSpacer:g["a"],VToolbar:b["a"],VToolbarItems:f["a"],VToolbarTitle:f["b"]});var w=a("8c4f"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{light:""}},[a("section",[a("v-parallax",{attrs:{src:"assets/hero.jpeg",height:"600"}},[a("v-layout",{staticClass:"white--text",attrs:{column:"","align-center":"","justify-center":""}},[a("h1",{staticClass:"white--text mb-2 display-1 text-xs-center"},[t._v("電子展示プロトタイプ")]),a("div",{staticClass:"subheading mb-3 text-xs-center"},[t._v("Japan Searchの活用例")]),a("v-btn",{staticClass:"blue lighten-2 mt-5",attrs:{dark:"",large:"",href:"#/search?q=葛飾北斎"}},[t._v("\n                    「葛飾北斎」を見てみる\n                ")])],1)],1)],1),a("v-content",[a("section",[a("v-layout",{staticClass:"my-5",attrs:{column:"",wrap:"","align-center":""}},[a("v-flex",{staticClass:"my-3",attrs:{xs12:"",sm4:""}},[a("div",{staticClass:"text-xs-center"},[a("h2",{staticClass:"headline"},[t._v("メニュー")]),a("span",{staticClass:"subheading"},[t._v("\n                    いずれも開発中のものです。\n                  ")])])]),a("v-flex",{attrs:{xs12:""}},[a("v-container",{attrs:{"grid-list-xl":""}},[a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("color_lens")])],1),a("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[a("div",{staticClass:"headline text-xs-center"},[a("router-link",{attrs:{to:"/list"}},[t._v("作品数の多い著者100人")])],1)]),a("v-card-text",[t._v("\n                                        作品数の多い著者100人から探します。\n                                    ")])],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("flash_on")])],1),a("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[a("div",{staticClass:"headline"},[t._v("開発中")])]),a("v-card-text",[t._v("\n                                        開発中です。\n                                    ")])],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("build")])],1),a("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[a("div",{staticClass:"headline text-xs-center"},[t._v("開発中")])]),a("v-card-text",[t._v("\n                                        開発中です。\n                                    ")])],1)],1)],1)],1)],1)],1)],1),a("section",[a("v-parallax",{attrs:{src:"assets/section.jpg",height:"380"}},[a("v-layout",{attrs:{column:"","align-center":"","justify-center":""}},[a("div",{staticClass:"headline white--text mb-3 text-xs-center"},[t._v("Japan Search")]),a("em",[t._v("Japan Search provides holding information for digital archives operated by a variety of organizations in Japan, thereby enabling users to search for digital content that is available for secondary use without written permission.")]),a("v-btn",{staticClass:"blue lighten-2 mt-5",attrs:{dark:"",large:"",href:"https://jpsearch.go.jp/"}},[t._v("\n                        View\n                    ")])],1)],1)],1),a("section",[a("v-container",{attrs:{"grid-list-xl":""}},[a("v-layout",{staticClass:"my-5",attrs:{row:"",wrap:"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",sm4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[a("div",{staticClass:"headline"},[t._v("目的")])]),a("v-card-text",[t._v("\n                                Japan Searchのギャラリーの自動生成\n                            ")])],1)],1),a("v-flex",{attrs:{xs12:"",sm4:"","offset-sm1":""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-title",{staticClass:"layout justify-center",attrs:{"primary-title":""}},[a("div",{staticClass:"headline"},[t._v("方法")])]),a("v-card-text",[t._v("\n                                Japan Search SPARQL Endpointほか、LODの利用\n                            ")]),a("v-list",{staticClass:"transparent"},[a("v-list-tile",[a("v-list-tile-action",[a("v-icon",{staticClass:"blue--text text--lighten-2"},[t._v("cloud")])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("Japan Search SPARQL Endpoint")])],1)],1),a("v-list-tile",[a("v-list-tile-action",[a("v-icon",{staticClass:"blue--text text--lighten-2"},[t._v("cloud")])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("DBpedia Japanese")])],1)],1)],1)],1)],1)],1)],1)],1)])],1)},I=[],j=a("12b2"),E=a("a523"),T=a("0e8f"),R=a("132d"),k=a("a722"),q=a("8860"),V=a("ba95"),S=a("40fe"),P=a("5d23"),O=a("8b9c"),A={},N=Object(i["a"])(A,C,I,!1,null,null,null),F=N.exports;c()(N,{VApp:u["a"],VBtn:h["a"],VCard:p["a"],VCardText:m["b"],VCardTitle:j["a"],VContainer:E["a"],VContent:d["a"],VFlex:T["a"],VIcon:R["a"],VLayout:k["a"],VList:q["a"],VListTile:V["a"],VListTileAction:S["a"],VListTileContent:P["a"],VListTileTitle:P["b"],VParallax:O["a"]});var M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("作品数の多い著者100人")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results,function(e){return a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",[e.thumbnail?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:e.thumbnail.value}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[a("router-link",{attrs:{to:{path:"/search",query:{q:e.label.value}}}},[t._v(t._s(e.label.value))])],1)])])],1)],1)}),1)],1)},U=[],D=a("bc3a"),X=a.n(D),$={data:()=>({results:[]}),mounted(){this.getAll()},methods:{getAll(){let t="";t+="select distinct count(?s) as ?count ?cho ?label ?thumbnail where { \n",t+="  ?s schema:creator ?cho . \n",t+="  ?cho rdfs:label ?label; \n",t+="  schema:image ?thumbnail \n",t+="} \n",t+="ORDER BY desc(?count) \n",t+="LIMIT 100 \n",X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(t)+"&output=json").then(t=>{this.results=t.data.results.bindings,console.log(this.results)}).catch(t=>{console.log(t)})}}},B=$,z=a("adda"),J=Object(i["a"])(B,M,U,!1,null,null,null),W=J.exports;c()(J,{VCard:p["a"],VCardTitle:j["a"],VContainer:E["a"],VFlex:T["a"],VImg:z["a"],VLayout:k["a"]});var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm10:""}},[a("v-form",{ref:"form"},[a("v-text-field",{model:{value:t.term,callback:function(e){t.term=e},expression:"term"}})],1)],1),a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.search()}}},[a("v-icon",[t._v("search")])],1)],1)],1),a("v-flex",{attrs:{xs12:"",sm4:"","offset-sm4":""}},[a("br"),a("br"),a("br"),a("v-card",[t.result_target.thumbnail?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:t.result_target.thumbnail.value}}):t._e(),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[t._v(t._s(t.result_target.label.value))]),a("div",[t._v(" "+t._s(t.result_target.comment.value)+" ")])])])],1)],1),a("div",{staticClass:"my-5"}),a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results_items.length>0,expression:"results_items.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("作品で知る"),a("br"),a("small",[a("a",{attrs:{target:"_blank",href:t.link_items}},[t._v("すべてを見る")])])]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results_items,function(e){return a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{attrs:{target:"snorql",href:e.cho.value}},[e.thumbnail?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:e.thumbnail.value}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[a("a",{attrs:{target:"snorql",href:e.cho.value}},[t._v(t._s(e.label.value))])])])])],1)],1)}),1),a("div",{staticClass:"mt-5",staticStyle:{width:"100%"}},[a("GChart",{attrs:{type:"ColumnChart",data:t.chartData,options:t.chartOptions}})],1)],1),a("div",{staticClass:"my-5"}),a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results_related.length>0,expression:"results_related.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("関連ギャラリー"),a("br"),a("small",[a("a",{attrs:{target:"_blank",href:t.link_related}},[t._v("すべてを見る")])])]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results_related,function(e){return a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{on:{click:function(a){return t.getAll(e.plabel.value)}}},[e.pthumbnail?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:e.pthumbnail.value}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[a("router-link",{attrs:{to:{path:"/search",query:{q:e.plabel.value}}}},[t._v(t._s(e.plabel.value))])],1)])])],1)],1)}),1),a("iframe",{staticClass:"mt-5",staticStyle:{border:"0"},attrs:{src:t.iframe_url,width:"100%",height:"600px",scrolling:"no"}})],1),a("div",{staticClass:"my-5"}),a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("過去の展覧会を探す")]),a("div",{staticStyle:{width:"100%",height:"600px"}},[a("l-map",{attrs:{zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,function(e,r){return a("l-marker",{attrs:{"lat-lng":e.latlng}},[a("l-popup",[a("a",{attrs:{target:"_blank",href:e.url}},[t._v(t._s(e.content))])])],1)})],2)],1)]),a("div",{staticClass:"my-5"}),a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results_europeana.length>0,expression:"results_europeana.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"mt-5 mb-5"},[t._v("Europeanaで探す")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results_europeana,function(e){return a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{attrs:{target:"snorql",href:e.uri.value}},[e.image?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:e.image.value}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[a("a",{attrs:{target:"snorql",href:e.uri.value}},[t._v(t._s(e.label.value))])])])])],1)],1)}),1)],1),a("div",{staticClass:"my-5"}),a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results_dpla.length>0,expression:"results_dpla.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"mt-5 mb-5"},[t._v("DPLAで探す")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results_dpla,function(e){return a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{attrs:{target:"snorql",href:e.uri.value}},[e.image?a("v-img",{staticStyle:{"max-height":"20rem"},attrs:{src:e.image.value}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[a("a",{attrs:{target:"snorql",href:e.uri.value}},[t._v(t._s(e.label.value))])])])])],1)],1)}),1)],1)],1)},G=[],Q=a("2699"),Y=a("a40a"),K=a("4e2b"),Z=a("f60f"),tt=a("e11e"),et=(a("6cc5"),a("cb43"));function at(t){let e="PREFIX schema: <http://schema.org/> \n";return e+="PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n",e+="SELECT distinct * WHERE { \n",e+="?s rdfs:label ?label. \n",e+="filter (?s = <http://ja.dbpedia.org/resource/"+t+">) . \n",e+="?s rdfs:comment ?comment. \n",e+="OPTIONAL {?s <http://dbpedia.org/ontology/thumbnail> ?thumbnail} \n",e+="} \n",e+="LIMIT 1 \n",e}function rt(t){let e="PREFIX schema: <http://schema.org/> \n";return e+="PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n",e+="SELECT ?cho ?label ?thumbnail WHERE { \n",e+="?cho rdfs:label ?label; \n",e+="schema:creator/owl:sameAs? chname:"+t+" . \n",e+="OPTIONAL {?cho schema:image ?thumbnail} \n",e+="} \n",e+="LIMIT 12 \n",e}function st(t){let e="";return e+="select distinct ?plabel ?pthumbnail ?pcomment where { \n",e+="    <http://ja.dbpedia.org/resource/"+t+"> <http://dbpedia.org/ontology/wikiPageWikiLink> ?o .   \n",e+="?o rdfs:label ?plabel.  \n",e+="?o rdfs:comment ?pcomment.  \n",e+="?o <http://dbpedia.org/ontology/thumbnail> ?pthumbnail.  \n",e+="?o <http://www.w3.org/2002/07/owl#sameAs> ?e \n",e+='           FILTER(strstarts(str(?e), "http://www.wikidata.org/")) \n',e+="   SERVICE <https://jpsearch.go.jp/rdf/sparql> { \n",e+="  ?cho rdfs:label ?label; \n",e+="   owl:sameAs? ?e.  \n",e+="   ?cho schema:image ?thumbnail \n",e+=" } \n",e+="} LIMIT 12 \n",e}function nt(t){let e="";return e+="select distinct ?cho ?label ?thumbnail ?plabel where { \n",e+="    <http://ja.dbpedia.org/resource/"+t+"> <http://dbpedia.org/ontology/wikiPageWikiLink> ?o .   \n",e+="?o rdfs:label ?plabel.  \n",e+="?o <http://www.w3.org/2002/07/owl#sameAs> ?e \n",e+='           FILTER(strstarts(str(?e), "http://www.wikidata.org/")) \n',e+="   SERVICE <https://jpsearch.go.jp/rdf/sparql> { \n",e+="  ?cho rdfs:label ?label; \n",e+="   schema:creator/owl:sameAs? ?e.  \n",e+="   ?cho schema:image ?thumbnail \n",e+=" } \n",e+="} LIMIT 12 \n",e}function lt(t){let e="PREFIX type: <https://jpsearch.go.jp/term/type/> \n";return e+="SELECT DISTINCT ?s ?label ?creator ?type WHERE { \n",e+="\t?s rdfs:label ?label ; a type:展覧会  . \n",e+="\tOPTIONAL {?s schema:creator ?creator .} \n",e+="\t?s ?p ?value. \n",e+="\tFILTER(bif:contains(?value, '\""+t+"\"')) . \n",e+="\t?s jps:sourceInfo ?source . \n",e+="} LIMIT 12 \n",e}function it(t){let e="";return e+="PREFIX dc: <http://purl.org/dc/elements/1.1/> \n",e+="PREFIX edm: <http://www.europeana.eu/schemas/edm/> \n",e+="PREFIX ore: <http://www.openarchives.org/ore/terms/> \n",e+="SELECT ?uri ?label ?image WHERE{ \n",e+="\tBIND(chname:"+t+" as ?cname) \n",e+="\t{ \n",e+='\t\t?cname schema:name ?ename. FILTER(lang(?ename)="en") \n',e+='\t\tBIND(replace(?ename, ", ", " ") as ?name) \n',e+="\t\t?loduri owl:sameAs ?cname ; rdfs:isDefinedBy <http://dbpedia.org/>. \n",e+="\t\tSERVICE SILENT <http://sparql.europeana.eu/> { \n",e+="\t\t\t{?uri dc:creator ?name .} UNION  \n",e+="\t\t\t{?proxy dc:creator ?loduri ; ore:proxyFor ?cho .  \n",e+='?uri ore:proxyFor ?cho ; edm:europeanaProxy "false". } \n',e+="\t\t\t?uri dc:title ?label . \n",e+="\t\t\t?uri ore:proxyIn [edm:isShownBy ?image ] \n",e+="\t\t} \n",e+="\t\t} \n",e+="} limit 12\n",e}function ot(t){let e="";return e+="PREFIX wrp: <http://purl.org/net/ld/wrapper/term#> \n",e+="SELECT ?uri ?label ?image WHERE{ \n",e+="\tBIND(chname:"+t+" as ?cname) \n",e+="\t{ \n",e+='\t\t?cname schema:name ?ename. FILTER(lang(?ename)="en") \n',e+='\t\tBIND(concat(strafter(?ename, ", "), " ", strbefore(?ename, ",")) as ?name) \n',e+="\t\tSERVICE SILENT <http://www.kanzaki.com/works/ld/wrapper/dpla-sparqler> { \n",e+='\t\t\t?uri a "image" ; \n',e+="\t\t\twrp:title ?label ; \n",e+="\t\t\twrp:creator ?name ; \n",e+="\t\t\twrp:image ?image \n",e+="\t\t} \n",e+="\t}  \n",e+="} limit 12\n",e}delete tt["Icon"].Default.prototype._getIconUrl,tt["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var ct={components:{GChart:et["GChart"],LMap:Q["a"],LTileLayer:Y["a"],LMarker:K["a"],LPopup:Z["a"]},data:()=>({result_target:{label:"",comment:""},results_items:[],results_related:[],results_event:[],results_europeana:[],results_dpla:[],term:"歌川広重",link_related:"",link_items:"",zoom:7,center:L.latLng(35.681489,139.767136),url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',markers:[],chartData:[],chartOptions:{},iframe_url:""}),watch:{$route(t,e){""!=this.$route.query.q&&(this.term=this.$route.query.q),this.getAll(this.term)}},mounted(){""!=this.$route.query.q&&(this.term=this.$route.query.q),this.getAll(this.term)},methods:{search(){var t=Object.assign({},this.$route.query);t.q=this.term,this.$router.push({query:t})},getAll(t){this.iframe_url="timeline.html?q="+t,this.term=t,this.getTargetAgent(t),this.getItems(t),this.getRelatedAgents(t),this.getRelatedPosts(t),this.getEventItems(t),this.getEuropeanaItems(t),this.getDPLAItems(t),this.showMap(t),this.showChart(t)},getTargetAgent(t){this.result_target={label:"",comment:""};let e=at(t);X.a.get("http://ja.dbpedia.org/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.result_target=t.data.results.bindings[0]}).catch(t=>{console.log(t)})},getItems(t){this.results_items=[];let e=rt(t);this.link_items="https://jpsearch.go.jp/rdf/sparql/easy/?query="+encodeURIComponent(e.split("LIMIT ")[0]),X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_items=t.data.results.bindings}).catch(t=>{console.log(t)})},getRelatedPosts(t){this.results2=[];let e=nt(t);X.a.get("http://ja.dbpedia.org/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results2=t.data.results.bindings}).catch(t=>{console.log(t)})},getRelatedAgents(t){this.results_related=[];let e=st(t);this.link_related="http://ja.dbpedia.org/sparql?query="+encodeURIComponent(e.split("LIMIT ")[0]),X.a.get("http://ja.dbpedia.org/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_related=t.data.results.bindings}).catch(t=>{console.log(t)})},getEventItems(t){this.results_event=[];let e=lt(t);X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_event=t.data.results.bindings}).catch(t=>{console.log(t)})},getEuropeanaItems(t){this.results_europeana=[];let e=it(t);X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_europeana=t.data.results.bindings}).catch(t=>{console.log(t)})},getDPLAItems(t){this.results_dpla=[];let e=ot(t);X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_dpla=t.data.results.bindings}).catch(t=>{console.log(t)})},showMap(t){let e="PREFIX type: <https://jpsearch.go.jp/term/type/> \n";e+="SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n",e+="\t?s rdfs:label ?label ; a type:展覧会  . \n",e+="\tOPTIONAL {?s schema:creator ?creator .} \n",e+="\t?s ?p ?value. \n",e+="\tFILTER(bif:contains(?value, '\""+t+"\"')) . \n",e+="\t?s jps:sourceInfo ?source . \n",e+="\t?s schema:spatial ?spatial . \n",e+="\t?spatial schema:geo ?geo . \n",e+="\t?geo schema:latitude ?lat  . \n",e+="\t?geo schema:longitude ?long . \n",e+="} ",X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{let e=t.data.results.bindings;this.markers=[];let a=0,r=0;for(let s=0;s<e.length;s++){let t=e[s],n={latlng:L.latLng(Number(t.lat.value),Number(t.long.value)),content:t.label.value,url:t.s.value};this.markers.push(n),a+=Number(t.lat.value),r+=Number(t.long.value)}this.center=L.latLng(a/e.length,r/e.length)}).catch(t=>{console.log(t)})},showChart(t){let e="PREFIX schema: <http://schema.org/> \n";e+="PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n",e+="SELECT ?cho ?label ?thumbnail ?pLabel WHERE { \n",e+="?cho rdfs:label ?label; \n",e+="schema:creator/owl:sameAs? chname:"+t+" . \n",e+="OPTIONAL {?cho schema:image ?thumbnail} \n",e+="?cho jps:sourceInfo ?source . \n",e+="?source schema:provider ?provider . \n",e+="?provider rdfs:label ?pLabel . \n",e+="} \n",X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{let e=t.data.results.bindings,a={};for(let n=0;n<e.length;n++){let t=e[n],r=t.pLabel.value;a[r]||(a[r]=0),a[r]+=1}let r=[];r.push(["Source","# of items"]);let s=Object.keys(a).sort(function(t,e){return-(a[t]-a[e])});for(let n=0;n<s.length;n++){let t=s[n];r.push([t,a[t]])}this.chartData=r}).catch(t=>{console.log(t)})}}},ut=ct,ht=a("4bd4"),pt=a("2677"),mt=Object(i["a"])(ut,H,G,!1,null,null,null),dt=mt.exports;c()(mt,{VBtn:h["a"],VCard:p["a"],VCardTitle:j["a"],VContainer:E["a"],VFlex:T["a"],VForm:ht["a"],VIcon:R["a"],VImg:z["a"],VLayout:k["a"],VTextField:pt["a"]});var vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",{staticStyle:{width:"100%",height:"600px"}},[a("l-map",{attrs:{zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,function(e,r){return a("l-marker",{attrs:{"lat-lng":e.latlng}},[a("l-popup",[a("a",{attrs:{target:"_blank",href:e.url}},[t._v(t._s(e.content))])])],1)})],2)],1)])},gt=[];delete tt["Icon"].Default.prototype._getIconUrl,tt["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var bt={components:{LMap:Q["a"],LTileLayer:Y["a"],LMarker:K["a"],LPopup:Z["a"]},data(){return{zoom:7,center:L.latLng(47.41322,-1.219482),url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',markers:[]}},methods:{removeMarker(t){this.markers.splice(t,1)},addMarker(t){this.markers.push(t.latlng)}},mounted(){let t="葛飾北斎",e="PREFIX type: <https://jpsearch.go.jp/term/type/> \n";e+="SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n",e+="\t?s rdfs:label ?label ; a type:展覧会  . \n",e+="\tOPTIONAL {?s schema:creator ?creator .} \n",e+="\t?s ?p ?value. \n",e+="\tFILTER(bif:contains(?value, '\""+t+"\"')) . \n",e+="\t?s jps:sourceInfo ?source . \n",e+="\t?s schema:spatial ?spatial . \n",e+="\t?spatial schema:geo ?geo . \n",e+="\t?geo schema:latitude ?lat  . \n",e+="\t?geo schema:longitude ?long . \n",e+="} ",X.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then(t=>{this.results_event=t.data.results.bindings,this.markers=[];let e=0,a=0;for(let r=0;r<this.results_event.length;r++){let t=this.results_event[r],s={latlng:L.latLng(Number(t.lat.value),Number(t.long.value)),content:t.label.value,url:t.s.value};this.markers.push(s),e+=Number(t.lat.value),a+=Number(t.long.value)}this.center=L.latLng(e/this.results_event.length,a/this.results_event.length)}).catch(t=>{console.log(t)})}},ft=bt,yt=(a("94dd"),Object(i["a"])(ft,vt,gt,!1,null,null,null)),_t=yt.exports;c()(yt,{VContainer:E["a"]}),r["a"].use(w["a"]);var xt=new w["a"]({scrollBehavior(){return{x:0,y:0}},base:"",routes:[{path:"/",name:"index",component:F},{path:"/list",name:"list",component:W},{path:"/search",name:"search",component:dt},{path:"/vis",name:"vis",component:_t}]});r["a"].config.productionTip=!1,new r["a"]({router:xt,render:function(t){return t(x)}}).$mount("#app")},"94dd":function(t,e,a){"use strict";var r=a("44be"),s=a.n(r);s.a}});
//# sourceMappingURL=app.80563e6f.js.map