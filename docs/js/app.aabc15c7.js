(function(t){function e(e){for(var r,l,o=e[0],i=e[1],c=e[2],h=0,m=[];h<o.length;h++)l=o[h],Object.prototype.hasOwnProperty.call(s,l)&&s[l]&&m.push(s[l][0]),s[l]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var i=a[o];0!==s[i]&&(r=!1)}r&&(n.splice(e--,1),t=l(l.s=a[0]))}return t}var r={},s={app:0},n=[];function l(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=t,l.c=r,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(a,r,function(e){return t[e]}.bind(null,r));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=i;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",[a("v-toolbar-title",[t._v("JPS自動ギャラリー")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{text:"",to:{name:"index"}}},[t._v("HOME")]),a("v-btn",{attrs:{text:"",to:{name:"list"}}},[t._v("著者から探す")])],1)],1),a("v-content",[a("router-view")],1),a("v-footer",{staticClass:"mt-5",attrs:{padless:"",dark:""}},[a("v-col",{staticClass:"text-center py-5",attrs:{cols:"12"}},[t._v(" "+t._s((new Date).getFullYear())+" — Satoru Nakamura ")])],1)],1)},n=[],l=a("2877"),o=a("6544"),i=a.n(o),c=a("7496"),u=a("8336"),h=a("62ad"),m=a("a75b"),p=a("553a"),d=a("2fa4"),v=a("71d9"),f=a("2a7f"),g={},b=Object(l["a"])(g,s,n,!1,null,null,null),x=b.exports;i()(b,{VApp:c["a"],VBtn:u["a"],VCol:h["a"],VContent:m["a"],VFooter:p["a"],VSpacer:d["a"],VToolbar:v["a"],VToolbarItems:f["a"],VToolbarTitle:f["b"]});var _=a("8c4f"),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{light:""}},[a("section",[a("v-parallax",{attrs:{src:"assets/hero.jpeg",height:"600"}},[a("v-layout",{staticClass:"white--text",attrs:{column:"","align-center":"","justify-center":""}},[a("h1",{staticClass:"white--text mb-2 display-1 text-xs-center"},[t._v("JPS自動ギャラリー")]),a("v-btn",{staticClass:"blue lighten-2 mt-5",attrs:{dark:"",large:"",to:{path:"search",query:{q:"葛飾北斎"}}}},[t._v("試してみる")])],1)],1)],1),a("v-content",[a("section",[a("v-layout",{staticClass:"my-5",attrs:{column:"",wrap:"","align-center":""}},[a("v-flex",{staticClass:"my-3",attrs:{xs12:"",sm4:""}},[a("div",{staticClass:"text-xs-center"},[a("h2",{staticClass:"headline"},[t._v("メニュー")])])]),a("v-flex",{attrs:{xs12:""}},[a("v-container",{attrs:{"grid-list-xl":""}},[a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("mdi-account-group")])],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",{staticClass:"headline text-xs-center"},[t._v("著者")])]),a("v-card-text",{staticClass:"text-xs-center"},[t._v(" 著者から探す "),a("v-btn",{staticClass:"blue lighten-2 mt-4",attrs:{dark:"",to:"/list"}},[t._v("探す")])],1)],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("mdi-image")])],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",{staticClass:"headline text-xs-center"},[t._v("アイテム")])]),a("v-card-text",{staticClass:"text-xs-center"},[t._v(" アイテムから探す "),a("v-btn",{staticClass:"blue lighten-2 mt-4",attrs:{dark:"",to:"/item"}},[t._v("探す")])],1)],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",{staticClass:"elevation-0 transparent"},[a("v-card-text",{staticClass:"text-xs-center"},[a("v-icon",{staticClass:"blue--text text--lighten-2",attrs:{"x-large":""}},[t._v("mdi-account-group")])],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",{staticClass:"headline text-xs-center"},[t._v("開発中")])])],1)],1)],1)],1)],1)],1)],1)])],1)},w=[],C=a("b0af"),I=a("99d9"),j=a("a523"),E=a("0e8f"),k=a("132d"),V=a("a722"),L=a("8b9c"),T={},q=Object(l["a"])(T,y,w,!1,null,null,null),O=q.exports;i()(q,{VApp:c["a"],VBtn:u["a"],VCard:C["a"],VCardText:I["a"],VCardTitle:I["b"],VContainer:j["a"],VContent:m["a"],VFlex:E["a"],VIcon:k["a"],VLayout:V["a"],VParallax:L["a"]});var R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("作品数の多い著者100人")]),a("v-layout",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],attrs:{row:"",wrap:""}},t._l(t.results,(function(e,r){return a("v-flex",{key:r,staticClass:"px-3 py-3",attrs:{xs12:"",sm2:""}},[a("v-card",[a("router-link",{attrs:{to:{path:"search",query:{q:e.label.value}}}},[a("div",{staticStyle:{"background-color":"black"}},[e.thumbnail?a("v-img",{attrs:{src:e.thumbnail.value,contain:"true",height:"300px"}}):t._e()],1)]),a("v-card-text",[a("h3",[a("router-link",{attrs:{to:{path:"search",query:{q:e.label.value}}}},[t._v(t._s(e.label.value))])],1)])],1)],1)})),1)],1)},S=[],P=(a("ac1f"),a("841c"),a("bc3a")),F=a.n(P),N={data:function(){return{results:[]}},mounted:function(){this.search()},methods:{search:function(){var t=this,e="";e+="select distinct count(?s) as ?count ?cho ?label ?thumbnail where { \n",e+="  ?s schema:creator ?cho . \n",e+="  ?cho rdfs:label ?label; \n",e+="  schema:image ?thumbnail \n",e+="} \n",e+="ORDER BY desc(?count) \n",e+="LIMIT 100 \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json").then((function(e){t.results=e.data.results.bindings,console.log(t.results)})).catch((function(t){console.log(t)}))}}},$=N,A=a("adda"),M=Object(l["a"])($,R,S,!1,null,null,null),U=M.exports;i()(M,{VCard:C["a"],VCardText:I["a"],VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{staticClass:"mt-5",attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm10:""}},[a("v-form",{ref:"form"},[a("v-text-field",{model:{value:t.term,callback:function(e){t.term=e},expression:"term"}})],1)],1),a("v-flex",{attrs:{xs12:"",sm2:""}},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.search()}}},[a("v-icon",[t._v("fas fa-search")])],1)],1)],1),a("v-flex",{attrs:{xs12:"",sm4:"","offset-sm4":""}},[a("TargetAgent",{staticClass:"mt-5",attrs:{term:t.term}})],1),a("div",{staticClass:"my-5"}),a("Items",{attrs:{term:t.term}}),a("v-card",{staticClass:"mt-5",staticStyle:{width:"100%"}},[a("Chart",{attrs:{term:t.term}})],1),a("div",{staticClass:"my-5"}),a("RelatedGallery",{attrs:{term:t.term}}),a("div",{staticClass:"my-5"}),a("Event",{attrs:{term:t.term}}),a("div",{staticClass:"my-5"}),a("Europeana",{attrs:{term:t.term}}),a("div",{staticClass:"my-5"}),a("DPLA",{attrs:{term:t.term}})],1)},X=[],B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.label,expression:"label"}]},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[t.thumbnail?a("v-img",{attrs:{contain:"true",height:"300px",src:t.thumbnail}}):t._e()],1),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[t._v(t._s(t.label))]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.comment,expression:"comment"}]},[t._v(t._s(t.comment))])])])],1)},H=[],W={props:["term"],data:function(){return{label:null,comment:null,thumbnail:null}},methods:{search:function(t){var e=this;this.label=null,this.comment=null,this.thumbnail=null;var a="PREFIX schema: <http://schema.org/> \n";a+="SELECT distinct * WHERE { \n",a+="?s rdfs:label ?label. \n",a+="filter (?s = chname:"+t+") . \n",a+="OPTIONAL {?s schema:description ?comment . } \n",a+="OPTIONAL {?s schema:image ?thumbnail . } \n",a+="} \n",a+="LIMIT 1 \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){var a=t.data.results.bindings[0];e.label=a.label.value,a.comment&&(e.comment=a.comment.value),a.thumbnail&&(e.thumbnail=a.thumbnail.value)})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},z=W,G=Object(l["a"])(z,B,H,!1,null,null,null),J=G.exports;i()(G,{VCard:C["a"],VCardTitle:I["b"],VImg:A["a"]});var Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("GChart",{directives:[{name:"show",rawName:"v-show",value:t.chartData.length>0,expression:"chartData.length > 0"}],attrs:{type:"ColumnChart",data:t.chartData,options:t.chartOptions}})},K=[],Q=(a("4e82"),a("b64b"),a("cb43")),Z={props:["term"],components:{GChart:Q["GChart"]},data:function(){return{chartData:[],chartOptions:{}}},methods:{search:function(t){var e=this,a="PREFIX schema: <http://schema.org/> \n";a+="PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n",a+="SELECT ?cho ?label ?thumbnail ?pLabel WHERE { \n",a+="?cho rdfs:label ?label; \n",a+="schema:creator/owl:sameAs? chname:"+t+" . \n",a+="OPTIONAL {?cho schema:image ?thumbnail} \n",a+="?cho jps:sourceInfo ?source . \n",a+="?source schema:provider ?provider . \n",a+="?provider rdfs:label ?pLabel . \n",a+="} \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){for(var a=t.data.results.bindings,r={},s=0;s<a.length;s++){var n=a[s],l=n.pLabel.value;r[l]||(r[l]=0),r[l]+=1}var o=[];o.push(["Source","# of items"]);for(var i=Object.keys(r).sort((function(t,e){return-(r[t]-r[e])})),c=0;c<i.length;c++){var u=i[c];o.push([u,r[u]])}e.chartData=o})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},tt=Z,et=Object(l["a"])(tt,Y,K,!1,null,null,null),at=et.exports,rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v(" 作品で知る "),a("br"),a("small",[a("a",{attrs:{href:t.link}},[t._v("すべてを見る")])])]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results,(function(e,r){return a("v-flex",{key:r,staticClass:"py-3 px-3",attrs:{xs12:"",sm2:""}},[a("v-card",[a("router-link",{attrs:{to:{name:"item",query:{id:e.cho.value.split("/data/")[1]}}}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[e.thumbnail?a("v-img",{attrs:{height:"300px",contain:"true",src:e.thumbnail.value}}):t._e()],1)]),a("v-card-text",[a("h3",[a("router-link",{attrs:{to:{name:"item",query:{id:e.cho.value.split("/data/")[1]}}}},[t._v(t._s(e.label.value))])],1)])],1)],1)})),1)],1)},st=[],nt=(a("1276"),a("9911"),{props:["term"],data:function(){return{results:[],link:null}},methods:{search:function(t){var e=this;this.results=[];var a="PREFIX schema: <http://schema.org/> \n";a+="PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n",a+="SELECT ?cho ?label ?thumbnail WHERE { \n",a+="?cho rdfs:label ?label; \n",a+="schema:creator/owl:sameAs? chname:"+t+" . \n",a+="OPTIONAL {?cho schema:image ?thumbnail} \n",a+="} \n",a+="LIMIT 12 \n",this.link="https://jpsearch.go.jp/rdf/sparql/easy/?query="+encodeURIComponent(a.split("LIMIT ")[0]),F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){e.results=t.data.results.bindings})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}}),lt=nt,ot=Object(l["a"])(lt,rt,st,!1,null,null,null),it=ot.exports;i()(ot,{VCard:C["a"],VCardText:I["a"],VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var ct=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v(" 関連ギャラリー "),a("br"),a("small",[a("a",{attrs:{href:t.link}},[t._v("すべてを見る")])])]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results,(function(e,r){return a("v-flex",{key:r,staticClass:"py-3 px-3",attrs:{xs12:"",sm2:""}},[a("v-card",[a("router-link",{attrs:{to:{path:"search",query:{q:e.plabel.value}}}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[e.pthumbnail?a("v-img",{attrs:{height:"300px",contain:"true",src:e.pthumbnail.value}}):t._e()],1)]),a("v-card-text",[a("h3",[a("router-link",{attrs:{to:{path:"search",query:{q:e.plabel.value}}}},[t._v(t._s(e.plabel.value))])],1)])],1)],1)})),1)],1)},ut=[],ht={props:["term"],data:function(){return{results:[],link:null}},methods:{search:function(t){var e=this;this.results=[];var a="";a+="SELECT DISTINCT ?dest ?plabel ?pthumbnail WHERE { \n",a+="\t?s jps:agential\n",a+='\t\t[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value/owl:sameAs? chname:'+t+" ],\n",a+='\t\t[jps:relationType/skos:broader?/rdfs:label "制作"; jps:value ?dest ]\n',a+="\tFILTER(?dest != chname:"+t+")\n",a+='\tFILTER(strstarts(str(?dest), "https://jpsearch.go.jp/entity/chname/"))\n',a+="  ?dest schema:image ?pthumbnail;\n",a+="      rdfs:label ?plabel\n",a+="} LIMIT 12 \n",this.link="https://jpsearch.go.jp/rdf/sparql/easy/?query="+encodeURIComponent(a.split("LIMIT ")[0]),F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){e.results=t.data.results.bindings})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},mt=ht,pt=Object(l["a"])(mt,ct,ut,!1,null,null,null),dt=pt.exports;i()(pt,{VCard:C["a"],VCardText:I["a"],VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"my-5"},[t._v("過去の展覧会を探す")]),a("div",{staticStyle:{width:"100%",height:"600px"}},[a("l-map",{attrs:{zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,(function(e,r){return a("l-marker",{key:r,attrs:{"lat-lng":e.latlng}},[a("l-popup",[a("a",{attrs:{target:"_blank",href:e.url}},[t._v(t._s(e.content))])])],1)}))],2)],1)])},ft=[],gt=(a("a9e3"),a("2699")),bt=a("a40a"),xt=a("4e2b"),_t=a("f60f"),yt=a("e11e");a("6cc5");delete yt["Icon"].Default.prototype._getIconUrl,yt["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var wt={props:["term"],components:{LMap:gt["a"],LTileLayer:bt["a"],LMarker:xt["a"],LPopup:_t["a"]},data:function(){return{results:[],link:null,zoom:7,center:[35.681489,139.767136],url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',markers:[]}},methods:{search:function(t){var e=this;this.results=[];var a="PREFIX type: <https://jpsearch.go.jp/term/type/> \n";a+="SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n",a+="\t?s rdfs:label ?label ; a type:展覧会  . \n",a+="\tOPTIONAL {?s schema:creator ?creator .} \n",a+="\t?s ?p ?value. \n",a+="\tFILTER(bif:contains(?value, '\""+t+"\"')) . \n",a+="\t?s jps:sourceInfo ?source . \n",a+="\t?s schema:spatial ?spatial . \n",a+="\t?spatial schema:geo ?geo . \n",a+="\t?geo schema:latitude ?lat  . \n",a+="\t?geo schema:longitude ?long . \n",a+="} ",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){var a=t.data.results.bindings;e.markers=[];for(var r=0,s=0,n=0;n<a.length;n++){var l=a[n],o={latlng:[Number(l.lat.value),Number(l.long.value)],content:l.label.value,url:l.s.value};e.markers.push(o),r+=Number(l.lat.value),s+=Number(l.long.value)}e.center=[r/a.length,s/a.length]})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},Ct=wt,It=Object(l["a"])(Ct,vt,ft,!1,null,null,null),jt=It.exports;i()(It,{VContainer:j["a"]});var Et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"mt-5 mb-5"},[t._v("Europeanaで探す")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results,(function(e,r){return a("v-flex",{key:r,attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{attrs:{href:e.uri.value}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[e.image?a("v-img",{attrs:{height:"300px",contain:"true",src:e.image.value}}):t._e()],1)]),a("v-card-text",[a("h3",[a("a",{attrs:{target:"snorql",href:e.uri.value}},[t._v(t._s(e.label.value))])])])],1)],1)})),1)],1)},kt=[],Vt={props:["term"],data:function(){return{results:[],link:null}},methods:{search:function(t){var e=this;this.results=[];var a="";a+="PREFIX dc: <http://purl.org/dc/elements/1.1/> \n",a+="PREFIX edm: <http://www.europeana.eu/schemas/edm/> \n",a+="PREFIX ore: <http://www.openarchives.org/ore/terms/> \n",a+="SELECT ?uri ?label ?image WHERE{ \n",a+="\tBIND(chname:"+t+" as ?cname) \n",a+="\t{ \n",a+='\t\t?cname schema:name ?ename. FILTER(lang(?ename)="en") \n',a+='\t\tBIND(replace(?ename, ", ", " ") as ?name) \n',a+="\t\t?loduri owl:sameAs ?cname ; rdfs:isDefinedBy <http://dbpedia.org/>. \n",a+="\t\tSERVICE SILENT <http://sparql.europeana.eu/> { \n",a+="\t\t\t{?uri dc:creator ?name .} UNION  \n",a+="\t\t\t{?proxy dc:creator ?loduri ; ore:proxyFor ?cho .  \n",a+='?uri ore:proxyFor ?cho ; edm:europeanaProxy "false". } \n',a+="\t\t\t?uri dc:title ?label . \n",a+="\t\t\t?uri ore:proxyIn [edm:isShownBy ?image ] \n",a+="\t\t} \n",a+="\t\t} \n",a+="} limit 12\n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){e.results=t.data.results.bindings})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},Lt=Vt,Tt=Object(l["a"])(Lt,Et,kt,!1,null,null,null),qt=Tt.exports;i()(Tt,{VCard:C["a"],VCardText:I["a"],VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var Ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}],attrs:{"grid-list-md":"","text-xs-center":""}},[a("h2",{staticClass:"mt-5 mb-5"},[t._v("DPLAで探す")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.results,(function(e,r){return a("v-flex",{key:r,staticClass:"px-3 py-3",attrs:{xs12:"",sm2:""}},[a("v-card",[a("a",{attrs:{href:e.uri.value}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[e.image?a("v-img",{attrs:{height:"300px",contain:"true",src:e.image.value}}):t._e()],1)]),a("v-card-text",[a("h3",[a("a",{attrs:{target:"snorql",href:e.uri.value}},[t._v(t._s(e.label.value))])])])],1)],1)})),1)],1)},Rt=[],St={props:["term"],data:function(){return{results:[],link:null}},methods:{search:function(t){var e=this;this.results=[];var a="";a+="PREFIX wrp: <http://purl.org/net/ld/wrapper/term#> \n",a+="SELECT ?uri ?label ?image WHERE{ \n",a+="\tBIND(chname:"+t+" as ?cname) \n",a+="\t{ \n",a+='\t\t?cname schema:name ?ename. FILTER(lang(?ename)="en") \n',a+='\t\tBIND(concat(strafter(?ename, ", "), " ", strbefore(?ename, ",")) as ?name) \n',a+="\t\tSERVICE SILENT <http://www.kanzaki.com/works/ld/wrapper/dpla-sparqler> { \n",a+='\t\t\t?uri a "image" ; \n',a+="\t\t\twrp:title ?label ; \n",a+="\t\t\twrp:creator ?name ; \n",a+="\t\t\twrp:image ?image \n",a+="\t\t} \n",a+="\t}  \n",a+="} limit 12\n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(t){e.results=t.data.results.bindings})).catch((function(t){console.log(t)}))}},watch:{term:function(){this.search(this.term)}},created:function(){this.search(this.term)}},Pt=St,Ft=Object(l["a"])(Pt,Ot,Rt,!1,null,null,null),Nt=Ft.exports;i()(Ft,{VCard:C["a"],VCardText:I["a"],VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var $t={components:{TargetAgent:J,Chart:at,Items:it,RelatedGallery:dt,Event:jt,Europeana:qt,DPLA:Nt},data:function(){return{term:"歌川広重",link_related:"",link_items:"",iframe_url:""}},watch:{$route:function(){""!=this.$route.query.q&&(this.term=this.$route.query.q),this.getAll(this.term)}},mounted:function(){""!=this.$route.query.q&&(this.term=this.$route.query.q),this.getAll(this.term)},methods:{search:function(){var t=Object.assign({},this.$route.query);t.q=this.term,this.$router.push({query:t})},getAll:function(t){this.iframe_url="timeline.html?q="+t,this.term=t}}},At=$t,Mt=a("4bd4"),Ut=a("8654"),Dt=Object(l["a"])(At,D,X,!1,null,null,null),Xt=Dt.exports;i()(Dt,{VBtn:u["a"],VCard:C["a"],VContainer:j["a"],VFlex:E["a"],VForm:Mt["a"],VIcon:k["a"],VLayout:V["a"],VTextField:Ut["a"]});var Bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",{staticStyle:{width:"100%",height:"600px"}},[a("l-map",{attrs:{zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,(function(e,r){return a("l-marker",{key:r,attrs:{"lat-lng":e.latlng}},[a("l-popup",[a("a",{attrs:{target:"_blank",href:e.url}},[t._v(t._s(e.content))])])],1)}))],2)],1)])},Ht=[];a("a434");delete yt["Icon"].Default.prototype._getIconUrl,yt["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var Wt={components:{LMap:gt["a"],LTileLayer:bt["a"],LMarker:xt["a"],LPopup:_t["a"]},data:function(){return{zoom:7,center:gt["a"].latLng(47.41322,-1.219482),url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',markers:[]}},methods:{removeMarker:function(t){this.markers.splice(t,1)},addMarker:function(t){this.markers.push(t.latlng)}},mounted:function(){var t=this,e="葛飾北斎",a="PREFIX type: <https://jpsearch.go.jp/term/type/> \n";a+="SELECT DISTINCT ?s ?label ?creator ?type ?spatial ?lat ?long WHERE { \n",a+="\t?s rdfs:label ?label ; a type:展覧会  . \n",a+="\tOPTIONAL {?s schema:creator ?creator .} \n",a+="\t?s ?p ?value. \n",a+="\tFILTER(bif:contains(?value, '\""+e+"\"')) . \n",a+="\t?s jps:sourceInfo ?source . \n",a+="\t?s schema:spatial ?spatial . \n",a+="\t?spatial schema:geo ?geo . \n",a+="\t?geo schema:latitude ?lat  . \n",a+="\t?geo schema:longitude ?long . \n",a+="} ",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(a)+"&output=json").then((function(e){t.results_event=e.data.results.bindings,t.markers=[];for(var a=0,r=0,s=0;s<t.results_event.length;s++){var n=t.results_event[s],l={latlng:gt["a"].latLng(Number(n.lat.value),Number(n.long.value)),content:n.label.value,url:n.s.value};t.markers.push(l),a+=Number(n.lat.value),r+=Number(n.long.value)}t.center=gt["a"].latLng(a/t.results_event.length,r/t.results_event.length)})).catch((function(t){console.log(t)}))}},zt=Wt,Gt=(a("94dd"),Object(l["a"])(zt,Bt,Ht,!1,null,null,null)),Jt=Gt.exports;i()(Gt,{VContainer:j["a"]});var Yt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("ShowItem",{staticClass:"mt-5",attrs:{id:t.id}}),a("v-btn",{attrs:{text:"",small:"",color:"primary"},on:{click:function(e){t.show_all_flg=!t.show_all_flg}}},[t.show_all_flg?[t._v("すべて非表示")]:[t._v("すべて表示")]],2),a("ListCategories",{staticClass:"mt-5",attrs:{id:t.id,label:"Creator",property:"schema:creator",show_all_flg:t.show_all_flg}}),a("ListCategories",{staticClass:"mt-5",attrs:{id:t.id,label:"Publisher",property:"schema:publisher",show_all_flg:t.show_all_flg}}),a("ListCategories",{staticClass:"mt-5",attrs:{id:t.id,label:"Spatial",property:"schema:spatial",show_all_flg:t.show_all_flg}}),a("ListCategories",{staticClass:"mt-5",attrs:{id:t.id,label:"Temporal",property:"schema:temporal",show_all_flg:t.show_all_flg}}),a("ListCategories",{staticClass:"mt-5",attrs:{id:t.id,label:"Type",property:"rdf:type",show_all_flg:t.show_all_flg}})],1)},Kt=[],Qt=(a("5319"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{row:""}},[a("v-flex",{staticClass:"px-2 py-2",attrs:{xs12:"",sm2:""}},[a("a",{attrs:{target:"jps",href:"https://jpsearch.go.jp/item/"+t.results[0].cho.value.split("/data/")[1]}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[a("v-img",{attrs:{cotain:"true",height:"300px",src:t.results[0].thumbnail?t.results[0].thumbnail.value:"https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"}})],1)])]),a("v-flex",{staticClass:"px-2 py-2",attrs:{xs12:"",sm10:""}},[a("h1",{staticClass:"mb-4"},[a("a",{attrs:{target:"jps",href:"https://jpsearch.go.jp/item/"+t.results[0].cho.value.split("/data/")[1]}},[t._v(t._s(t.results[0].label.value))])]),a("p",{staticClass:"mt-2"},[t._v(t._s(t.results[0].p_label.value))]),a("p",{staticClass:"mt-2"},[a("a",{attrs:{target:"snorql",href:t.results[0].cho.value}},[t._v("JPS利活用スキーマ")])])])],1)],1)}),Zt=[],te={props:["id"],data:function(){return{results:[]}},methods:{search:function(){var t=this,e=this.id,a="https://jpsearch.go.jp/data/"+e,r="PREFIX schema: <http://schema.org/> \n";r+="SELECT distinct * WHERE { \n",r+="?cho rdfs:label ?label . \n",r+="filter (?cho = <"+a+">)  \n",r+="OPTIONAL {?cho schema:image ?thumbnail . } \n",r+="?cho jps:sourceInfo ?sourceInfo . \n",r+="?sourceInfo schema:provider ?p . \n",r+="?p rdfs:label ?p_label . \n",r+="} \n",r+="LIMIT 1 \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(r)+"&output=json").then((function(e){var a=e.data.results.bindings;t.results=a})).catch((function(t){console.log(t)}))}},watch:{id:function(){this.search()}},created:function(){this.search()}},ee=te,ae=Object(l["a"])(ee,Qt,Zt,!1,null,null,null),re=ae.exports;i()(ae,{VContainer:j["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var se=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.results.length>0,expression:"results.length > 0"}]},[a("v-card-text",[a("h1",{staticClass:"my-4"},[t._v(" "+t._s(t.label)+" "),a("v-btn",{attrs:{text:"",small:""},on:{click:function(e){t.show_flg=!t.show_flg}}},[t.show_flg?[t._v("非表示")]:[t._v("表示")]],2)],1),t._l(t.results,(function(e,r){return a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.show_flg||t.show_all_flg,expression:"show_flg || show_all_flg"}],key:r,staticClass:"mb-5",attrs:{color:"#F9F9F9"}},[a("v-card-text",[a("v-layout",{attrs:{row:""}},[a("v-flex",{staticClass:"px-2 py-2",attrs:{xs12:"",sm2:""}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[a("v-img",{attrs:{contain:"true",height:"300px",src:e.thumbnail?e.thumbnail.value:"schema:creator"==t.property||"schema:publisher"==t.property?"http://simpleicon.com/wp-content/uploads/user1.png":"https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"}})],1)]),a("v-flex",{staticClass:"px-2 py-2",attrs:{xs12:"",sm10:""}},[a("h1",[t._v(t._s(e.label.value))]),e.comment?a("p",{staticClass:"mt-2"},[t._v(t._s(e.comment.value))]):t._e()])],1),a("ListItemsOfCategory",{staticClass:"mt-5",attrs:{id:t.id,label:e.label.value,creator:e.creator.value,property:t.property,show_all_flg:t.show_all_flg}})],1)],1)}))],2)],1)},ne=[],le=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"horizontal-list my-5"},t._l(t.results,(function(e,r){return a("li",{key:r},[a("v-card",{staticClass:"my-2 mx-2"},[a("router-link",{attrs:{to:{name:"item",query:{id:e.cho.value.split("/data/")[1]}}}},[a("div",{staticStyle:{"background-color":"black",height:"300px"}},[a("v-img",{attrs:{height:"300px",contain:"true",src:e.thumbnail?e.thumbnail.value:"https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"}})],1)]),a("v-card-text",[a("router-link",{attrs:{to:{name:"item",query:{id:e.cho.value.split("/data/")[1]}}}},[a("b",[t._v(t._s(e.label.value))])]),a("p",{staticClass:"my-1"},[t._v(t._s(e.p_label.value))])],1)],1)],1)})),0)])},oe=[],ie=200,ce={props:["id","creator","label","property","show_all_flg"],data:function(){return{results:[]}},methods:{search:function(){var t=this;this.show_flg=!1,this.results=[];var e=this.id,a=this.creator,r="https://jpsearch.go.jp/data/"+e,s="PREFIX schema: <http://schema.org/> \n";s+="SELECT distinct * WHERE { \n",s+="?cho "+this.property+"/owl:sameAs? ?creator . \n",s+="filter(?creator = <"+a+">) . \n",s+="filter(?cho != <"+r+">) . \n",s+="?cho rdfs:label ?label . \n",s+="?cho schema:image ?thumbnail . \n",s+="?cho jps:sourceInfo ?sourceInfo . \n",s+="?sourceInfo schema:provider ?p . \n",s+="?p rdfs:label ?p_label . \n",s+="} \n",s+="LIMIT "+ie+" \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(s)+"&output=json").then((function(e){for(var a=e.data.results.bindings,r=[],s=0;s<a.length;s++)r.push(s);var n=r.length;while(n){var l=Math.floor(Math.random()*n),o=r[--n];r[n]=r[l],r[l]=o}var i=ie;r.length<i&&(i=r.length);for(var c=[],u=0;u<i;u++)c.push(a[r[u]]);t.results=c})).catch((function(t){console.log(t)}))}},watch:{id:function(){this.search()}},created:function(){this.search()}},ue=ce,he=(a("bc19"),Object(l["a"])(ue,le,oe,!1,null,null,null)),me=he.exports;i()(he,{VCard:C["a"],VCardText:I["a"],VImg:A["a"]});var pe={components:{ListItemsOfCategory:me},props:["id","label","property","show_all_flg"],data:function(){return{results:[],show_flg:!1}},methods:{search:function(){var t=this;this.show_flg=!1,this.results=[];var e=this.property,a=this.id,r="https://jpsearch.go.jp/data/"+a,s="PREFIX schema: <http://schema.org/> \n";s+="SELECT distinct * WHERE { \n",s+="?cho "+e+" ?creator. \n",s+="filter (?cho = <"+r+">)  \n",s+="?creator rdfs:label ?label . \n",s+="OPTIONAL {?creator schema:description ?comment . } \n",s+="OPTIONAL {?creator schema:image ?thumbnail . } \n",s+="} \n",s+="LIMIT 40 \n",F.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(s)+"&output=json").then((function(e){var a=e.data.results.bindings;t.results=a})).catch((function(t){console.log(t)}))}},watch:{id:function(){this.search()}},created:function(){this.search()}},de=pe,ve=Object(l["a"])(de,se,ne,!1,null,null,null),fe=ve.exports;i()(ve,{VBtn:u["a"],VCard:C["a"],VCardText:I["a"],VFlex:E["a"],VImg:A["a"],VLayout:V["a"]});var ge={components:{ListCategories:fe,ShowItem:re},data:function(){return{id:"",show_all_flg:!1}},watch:{$route:function(){this.id=this.$route.query.id}},mounted:function(){var t=this.$route.query.id;""!=t&&null!=t||(t="dignl-1901899"),this.id=t,this.$router.replace({name:"item",query:{id:this.id}},(function(){}),(function(){}))}},be=ge,xe=Object(l["a"])(be,Yt,Kt,!1,null,null,null),_e=xe.exports;i()(xe,{VBtn:u["a"],VContainer:j["a"]}),r["a"].use(_["a"]);var ye=[{path:"/",name:"index",component:O},{path:"/search",name:"search",component:Xt},{path:"/list",name:"list",component:U},{path:"/vis",name:"vis",component:Jt},{path:"/item",name:"item",component:_e}],we=new _["a"]({base:"",routes:ye,scrollBehavior:function(){return{x:0,y:0}}}),Ce=we,Ie=a("f309");r["a"].use(Ie["a"]);var je=new Ie["a"]({});r["a"].config.productionTip=!1,new r["a"]({router:Ce,vuetify:je,render:function(t){return t(x)}}).$mount("#app")},"94dd":function(t,e,a){"use strict";var r=a("c590"),s=a.n(r);s.a},b528:function(t,e,a){},bc19:function(t,e,a){"use strict";var r=a("b528"),s=a.n(r);s.a},c590:function(t,e,a){}});
//# sourceMappingURL=app.aabc15c7.js.map