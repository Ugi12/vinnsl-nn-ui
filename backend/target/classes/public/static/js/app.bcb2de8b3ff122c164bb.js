webpackJsonp([1],{"8tYq":function(t,e){},"9M+g":function(t,e){},D4uH:function(t,e,n){"use strict";function s(t){n("PzHi")}var i=n("dXrS"),a=n("rGRJ"),o=n("VU/8"),r=s,l=o(i.a,a.a,!1,r,null,null);e.a=l.exports},D7g9:function(t,e,n){"use strict";function s(t){n("Nx+J")}var i=n("IatC"),a=n("E8Q2"),o=n("VU/8"),r=s,l=o(i.a,a.a,!1,r,"data-v-b8c1a7fe",null);e.a=l.exports},E8Q2:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bootstrap"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Status")]),t._v(" "),n("p"),t._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-5"},[n("div",{staticClass:"clearfix"},[n("b-btn",{staticClass:"float-right",attrs:{variant:"success",id:"btnCallHello"},on:{click:function(e){t.callRestService(),t.showResponse=!0}}},[n("icon",{attrs:{name:"refresh"}})],1)],1),t._v(" "),n("p"),t._v(" "),t._l(t.vinnslList,function(e,s){return n("b-list-group",[n("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center",attrs:{href:"#"},on:{click:function(e){t.getDetailsById(s)}}},[t._v("\n            "+t._s(s)+"\n            "),n("b-badge",{attrs:{variant:""+t.getPillByStatus(e),pill:""}},[t._v(t._s(e))])],1)],1)}),t._v(" "),n("p")],2),t._v(" "),n("div",{staticClass:"col-lg-7"},[t.vinnslItem?n("div",[n("div",{staticClass:"clearfix"},[n("b-btn",{staticClass:"float-right",attrs:{variant:"success",id:"btnItemRefresh"},on:{click:function(e){t.getDetailsById(t.vinnslItem.identifier),t.showResponse=!0}}},[n("icon",{attrs:{name:"refresh"}})],1)],1),t._v(" "),n("p"),t._v(" "),n("b-card-group",{attrs:{deck:""}},[n("b-card",{attrs:{header:"Information to Item","header-tag":"header",footer:"","footer-tag":"",title:"ID "+t.vinnslItem.identifier}},[n("p",{staticClass:"card-text"},[t._v(t._s(t.vinnslItem.nncloud.status))]),t._v(" "),n("b-tabs",[n("b-tab",{attrs:{title:"Definition",active:""}},[n("p"),t._v(" "),n("h3",[t._v("Definition")]),t._v(" "),n("div",[n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:t.vinnslItem.definition,options:{maxDepth:4,rootObjectKey:"definition"}}})],1)]),t._v(" "),n("b-tab",{attrs:{title:"Description"}},[n("p"),t._v(" "),n("h3",[t._v("Description")]),t._v(" "),n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:t.vinnslItem.description,options:{maxDepth:4,rootObjectKey:"description"}}})],1),t._v(" "),n("b-tab",{attrs:{title:"Data"}},[n("p"),t._v(" "),n("h3",[t._v("Data")]),t._v(" "),n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:t.vinnslItem.data,options:{maxDepth:4,rootObjectKey:"data"}}})],1),t._v(" "),n("b-tab",{attrs:{title:"Instance"}},[n("p"),t._v(" "),n("h3",[t._v("Instance")]),t._v(" "),n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:t.vinnslItem.instance,options:{maxDepth:4,rootObjectKey:"instance"}}})],1),t._v(" "),n("b-tab",{attrs:{title:"Result"}},[n("p"),t._v(" "),n("h3",[t._v("Result")]),t._v(" "),n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:t.vinnslItem.result,options:{maxDepth:4,rootObjectKey:"result"}}})],1),t._v(" "),n("b-tab",{attrs:{title:"Status"}},[n("p"),t._v(" "),n("h3",[t._v("Status")]),t._v(" "),n("code",[t._v(t._s(t.vinnslItem.nncloud.status))])]),t._v(" "),n("b-tab",{attrs:{title:"Files"}},[n("p"),t._v(" "),n("h3",[t._v("Files")]),t._v(" "),t.vinnslItem.data&&t.vinnslItem.data.data&&t.vinnslItem.data.data.file?n("code",[t._v(t._s(t.vinnslItem.data.data.file))]):t._e(),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("b-button",{attrs:{variant:"primary"},on:{click:function(e){t.getFiles(),t.showResponse=!0}}},[n("icon",{attrs:{name:"refresh"}})],1)],1),t._v(" "),n("div",{staticClass:"col"},[n("b-form-select",{staticClass:"mb-3",attrs:{options:t.fileOptions},model:{value:t.selectedFile,callback:function(e){t.selectedFile=e},expression:"selectedFile"}})],1),t._v(" "),n("div",{staticClass:"col"},[n("b-button",{attrs:{variant:"primary"},on:{click:function(e){t.applyFile(t.vinnslItem.identifier,t.selectedFile),t.showResponse=!0}}},[n("icon",{attrs:{name:"save"}})],1)],1)])]),t._v(" "),n("b-tab",{attrs:{title:"DL4J Transformation"}},[n("p"),t._v(" "),n("h3",[t._v("DL4J Network")]),t._v(" "),n("tree-view",{staticStyle:{"text-align":"left"},attrs:{data:JSON.parse(t.vinnslItem.nncloud.dl4jNetwork),options:{maxDepth:4,rootObjectKey:"dl4j"}}})],1)],1),t._v(" "),n("p"),t._v(" "),n("p"),t._v(" "),n("b-button",{attrs:{variant:"danger"},on:{click:function(e){t.deleteById(t.vinnslItem.identifier),t.showResponse=!0,t.callRestService()}}},[n("icon",{attrs:{name:"trash"}})],1)],1)],1)],1):t._e()])])]),t._v(" "),n("p"),t._v(" "),n("h4",[t._v("Debug")]),t._v(" "),n("b-btn",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse1",modifiers:{collapse1:!0}}]},[t._v("Show Response details")]),t._v(" "),n("p"),t._v(" "),n("b-collapse",{staticClass:"mt-2",attrs:{id:"collapse1"}},[n("h3",[t._v("Backend response: ")]),t._v(" "),n("code",[t._v(t._s(t.response))]),t._v(" "),n("p"),t._v(" "),n("h4",[t._v("HTTP Status & Headers")]),t._v(" "),n("p",[t._v("Status: "),n("code",[t._v(t._s(t.httpStatusCode))])]),t._v(" "),n("p",[t._v("Statustext: "),n("code",[t._v(t._s(t.httpStatusText))])]),t._v(" "),t.headers&&t.headers.length?n("p"):t._e(),t._l(t.headers,function(e){return n("li",[n("p",[t._v("Header: "+t._s(e.valueOf()))])])}),t._v(" "),n("p"),t._v(" "),n("h4",[t._v("Request configuration")]),t._v(" "),n("p",[t._v("Config: "),n("code",[t._v(t._s(t.fullResponse.config)+" ")])])],2),t._v(" "),n("b-tooltip",{attrs:{target:"btnHttpHeaders",title:"You should always know your HTTP Headers!"}})],1)},i=[],a={render:s,staticRenderFns:i};e.a=a},IatC:function(t,e,n){"use strict";var s=n("Vwy0");e.a={name:"vinnslui",data:function(){return{msg:"VINNSL-NN-UI",showResponse:!0,response:"",vinnslList:"",vinnslItem:"",fullResponse:{config:{foo:"",bar:""}},httpStatusCode:"",httpStatusText:"",headers:["Noting here atm. Did you call the Service?"],errors:[],selectedFile:null,fileOptions:[]}},methods:{callRestService:function(){var t=this;s.a.get(this.$vinnslBackendUrl+"/status").then(function(e){t.vinnslList=e.data,t.response=e.data,console.log(e.data),t.httpStatusCode=e.status,t.httpStatusText=e.statusText,t.headers=e.headers,t.fullResponse=e}).catch(function(e){t.errors.push(e)})},getDetailsById:function(t){var e=this;s.a.get(this.$vinnslBackendUrl+"/vinnsl/"+t).then(function(n){e.vinnslItem=n.data,e.response=n.data,console.log("vinnsl/"+t),console.log(n.data),e.httpStatusCode=n.status,e.httpStatusText=n.statusText,e.headers=n.headers,e.fullResponse=n}).catch(function(t){e.errors.push(t)})},deleteById:function(t){var e=this;s.a.delete(this.$vinnslBackendUrl+"/vinnsl/"+t).then(function(n){e.response=n.data,console.log("DELETE vinnsl/"+t),console.log(n.data),e.httpStatusCode=n.status,e.httpStatusText=n.statusText,e.headers=n.headers,e.fullResponse=n}).catch(function(t){e.errors.push(t)})},getFiles:function(){var t=this;s.a.get(this.$vinnslStorageBackendUrl+"/storage").then(function(e){t.response=e.data.files,t.fileOptions=e.data.files,console.log("files"+e.data.files),t.httpStatusCode=e.status,t.httpStatusText=e.statusText,t.headers=e.headers,t.fullResponse=e}).catch(function(e){t.errors.push(e)})},applyFile:function(t,e){var n=this;s.a.put(this.$vinnslBackendUrl+"/vinnsl/"+t+"/addfile?fileId="+e).then(function(t){n.response=t.data,console.log("added file"+t.data),n.httpStatusCode=t.status,n.httpStatusText=t.statusText,n.headers=t.headers,n.fullResponse=t}).catch(function(t){n.errors.push(t)})},getPillByStatus:function(t){return"INPROGRESS"===t?"warning":"FINISHED"===t?"success":"ERROR"===t?"danger":"primary"}},filters:{pretty:function(t){return t}},mounted:function(){this.getFiles(),this.callRestService()}}},Jmt5:function(t,e){},M93x:function(t,e,n){"use strict";function s(t){n("8tYq")}var i=n("xJD8"),a=n("a6wR"),o=n("VU/8"),r=s,l=o(i.a,a.a,!1,r,null,null);e.a=l.exports},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),i=n("M93x"),a=n("YaEn"),o=n("sCSS"),r=n("Jmt5"),l=(n.n(r),n("9M+g")),c=(n.n(l),n("D/PP"),n("D4uH")),u=n("efYS"),h=n.n(u);s.a.use(h.a),s.a.config.productionTip=!1,s.a.prototype.$vinnslBackendUrl="http://localhost:8080",s.a.prototype.$vinnslStorageBackendUrl="http://localhost:8081",s.a.use(o.a),s.a.component("icon",c.a),new s.a({el:"#app",router:a.a,template:"<App/>",components:{App:i.a}})},"Nx+J":function(t,e){},PzHi:function(t,e){},Vwy0:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var s=n("mtWM"),i=n.n(s),a=i.a.create({baseURL:"http://localhost:8088",headers:{"Access-Control-Allow-Origin":"*"}})},YaEn:function(t,e,n){"use strict";var s=n("7+uW"),i=n("/ocq"),a=n("D7g9");s.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"VinnslUi",component:a.a}]})},a6wR:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],a={render:s,staticRenderFns:i};e.a=a},dXrS:function(t,e,n){"use strict";function s(){return"fa-"+(a++).toString(16)}var i={};e.a={name:"icon",props:{name:{type:String,validator:function(t){return t?t in i||(console.warn('Invalid prop: prop "name" is referring to an unregistered icon "'+t+'".\nPlease make sure you have imported this icon before using it.'),!1):(console.warn('Invalid prop: prop "name" is required.'),!1)}},scale:[Number,String],spin:Boolean,inverse:Boolean,pulse:Boolean,flip:{validator:function(t){return"horizontal"===t||"vertical"===t}},label:String},data:function(){return{x:!1,y:!1,childrenWidth:0,childrenHeight:0,outerScale:1}},computed:{normalizedScale:function(){var t=this.scale;return t=void 0===t?1:Number(t),isNaN(t)||t<=0?(console.warn('Invalid prop: prop "scale" should be a number over 0.',this),this.outerScale):t*this.outerScale},klass:function(){return{"fa-icon":!0,"fa-spin":this.spin,"fa-flip-horizontal":"horizontal"===this.flip,"fa-flip-vertical":"vertical"===this.flip,"fa-inverse":this.inverse,"fa-pulse":this.pulse}},icon:function(){return this.name?i[this.name]:null},box:function(){return this.icon?"0 0 "+this.icon.width+" "+this.icon.height:"0 0 "+this.width+" "+this.height},ratio:function(){if(!this.icon)return 1;var t=this.icon,e=t.width,n=t.height;return Math.max(e,n)/16},width:function(){return this.childrenWidth||this.icon&&this.icon.width/this.ratio*this.normalizedScale||0},height:function(){return this.childrenHeight||this.icon&&this.icon.height/this.ratio*this.normalizedScale||0},style:function(){return 1!==this.normalizedScale&&{fontSize:this.normalizedScale+"em"}},raw:function(){if(!this.icon||!this.icon.raw)return null;var t=this.icon.raw,e={};return t=t.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,function(t,n,i){var a=s();return e[i]=a,' id="'+a+'"'}),t=t.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,function(t,n,s,i){var a=n||i;return a&&e[a]?"#"+e[a]:t}),t}},mounted:function(){var t=this;if(!this.icon){this.$children.forEach(function(e){e.outerScale=t.normalizedScale});var e=0,n=0;this.$children.forEach(function(t){e=Math.max(e,t.width),n=Math.max(n,t.height)}),this.childrenWidth=e,this.childrenHeight=n,this.$children.forEach(function(t){t.x=(e-t.width)/2,t.y=(n-t.height)/2})}},register:function(t){for(var e in t){var n=t[e];n.paths||(n.paths=[]),n.d&&n.paths.push({d:n.d}),n.polygons||(n.polygons=[]),n.points&&n.polygons.push({points:n.points}),i[e]=n}},icons:i};var a=870711},rGRJ:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{class:t.klass,style:t.style,attrs:{version:"1.1",role:t.label?"img":"presentation","aria-label":t.label,x:t.x,y:t.y,width:t.width,height:t.height,viewBox:t.box}},[t._t("default",[t.icon&&t.icon.paths?t._l(t.icon.paths,function(e,s){return n("path",t._b({key:"path-"+s},"path",e,!1))}):t._e(),t._v(" "),t.icon&&t.icon.polygons?t._l(t.icon.polygons,function(e,s){return n("polygon",t._b({key:"polygon-"+s},"polygon",e,!1))}):t._e(),t._v(" "),t.icon&&t.icon.raw?[n("g",{domProps:{innerHTML:t._s(t.raw)}})]:t._e()])],2)},i=[],a={render:s,staticRenderFns:i};e.a=a},xJD8:function(t,e,n){"use strict";e.a={name:"app"}}},["NHnr"]);
//# sourceMappingURL=app.bcb2de8b3ff122c164bb.js.map