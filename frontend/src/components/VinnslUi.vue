<template>
  <div class="bootstrap">
    <h1>{{ msg }}</h1>
    <h2>ViNNSL UI</h2>
    <!--<p></p>
    <h6><b-badge variant="primary"> Let´s go!</b-badge> Call a Spring Boot REST backend service, by clicking a button:</h6>-->

    <p></p>
    <div class="container">

      <!--      <b-alert variant="success"
                     dismissible
                     :show="showDismissibleAlert"
                     @dismissed="showDismissibleAlert=false">
              Training started...
            </b-alert>-->

      <div class="clearfix">
        <!--<b-btn variant="success" @click="callRestService(); showResponse=true" id="btnCallHello" class="float-right"><icon name="refresh"></icon></b-btn>-->
      </div>

      <div class="row">
        <div class="col-lg-5">
          <div class="clearfix">
            <!--<b-btn variant="success" @click="callRestService(); showResponse=true" id="btnCallHello" class="float-right"><icon name="refresh"></icon></b-btn>-->
          </div>
          <p></p>
          <b-list-group v-for="(item,id) in vinnslList">
            <b-list-group-item class="d-flex justify-content-between align-items-center" @click="getDetailsById(id)" href="#">
              {{id}}
              <b-badge :variant="`${getPillByStatus(item)}`" pill>{{item}}</b-badge>
            </b-list-group-item>
          </b-list-group>
          <p></p>
          <p>  {{'current training engine: '}}{{getCurrentEngine()}}</p>
        </div><br>


        <div class="col-lg-7">
          <div v-if="vinnslItem">
            <div class="clearfix">
              <!-- <b-btn variant="success" @click="getDetailsById(vinnslItem.identifier); showResponse=true" id="btnItemRefresh" class="float-right"><icon name="refresh"></icon></b-btn>-->
            </div>
            <p></p>

            <b-card-group deck>
              <b-card :header="`ID ${vinnslItem.identifier}`"
                      header-tag="header"
                      footer=""
                      footer-tag=""
                      :title="`${vinnslItem.description.metadata.description}`">
                <p class="card-text">Author: {{vinnslItem.description.creator.name}} <br/>
                  Version: {{vinnslItem.description.metadata.version.major}}.{{vinnslItem.description.metadata.version.minor}}</p>
                <p class="card-text"><b-badge :variant="`${getPillByStatus(vinnslItem.nncloud.status)}`" pill>{{vinnslItem.nncloud.status}}</b-badge>
                  <a href="/train/overview" target="_blank" v-if="vinnslItem.nncloud.status==='INPROGRESS'">- Training UI</a>
                </p>

                <b-tabs>
                  <b-tab title="Description" active>
                    <p></p>
                    <h3>Description</h3>
                    <tree-view :data="vinnslItem.description" :options="{maxDepth: 4, rootObjectKey: 'description'}" style="text-align:left"></tree-view>
                  </b-tab>
                  <b-tab title="Definition">
                    <p></p>
                    <h3>Definition</h3>
                    <div>
                      <tree-view :data="vinnslItem.definition" :options="{maxDepth: 4, rootObjectKey: 'definition'}" style="text-align:left"></tree-view>
                    </div>
                  </b-tab>
                  <b-tab title="Data">
                    <p></p>
                    <h3>Data</h3>
                    <h4>Definition Data</h4>
                    <tree-view :data="vinnslItem.definition.data" v-if="vinnslItem.definition && vinnslItem.definition.data" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <a :href="`${this.$vinnslBackendUrl}/storage/files/${vinnslItem.definition.data.dataSchemaID}`"
                       v-if="vinnslItem.definition && vinnslItem.definition.data && vinnslItem.definition.data.dataSchemaID">See File</a>
                    <h4>Data</h4>
                    <tree-view :data="vinnslItem.data" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <h4>Result Data</h4>
                    <tree-view :data="vinnslItem.result" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <a :href="`${this.$vinnslBackendUrl}/storage/files/${vinnslItem.result.file}?download=false`"
                       v-if="vinnslItem.result && vinnslItem.result.file">See File</a>
                  </b-tab>
                  <b-tab title="Instance">
                    <p></p>
                    <h3>Instance</h3>
                    <tree-view :data="vinnslItem.instance" :options="{maxDepth: 4, rootObjectKey: 'instance'}" style="text-align:left"></tree-view>
                  </b-tab>
                  <b-tab title="Result">
                    <p></p>
                    <h3>Result</h3>
                    <tree-view :data="vinnslItem.result" :options="{maxDepth: 4, rootObjectKey: 'result'}" style="text-align:left"></tree-view>
                  </b-tab>
                  <b-tab title="Status">
                    <p></p>
                    <h3>Status</h3>
                    <code>{{vinnslItem.nncloud.status}}</code>
                  </b-tab>
                  <b-tab title="Files">
                    <p></p>
                    <h3>Files</h3>
                    <code v-if="vinnslItem.data && vinnslItem.data.data && vinnslItem.data.data.file">{{vinnslItem.data.data.file}}</code>

                    <div class="row">
                      <div class="col"><b-button @click="getFiles(); showResponse=true;" variant="primary"><icon name="refresh"></icon></b-button></div>
                      <div class="col"><b-form-select v-model="selectedFile" :options="fileOptions" class="mb-3" /></div>
                      <div class="col"><b-button @click="applyFile(vinnslItem.identifier, selectedFile); showResponse=true;" variant="primary"><icon name="save"></icon></b-button></div>
                    </div>
                  </b-tab>

                  <b-tab title="DL4J Transformation">
                    <p></p>
                    <h3>DL4J Network</h3>
                    <tree-view :data="JSON.parse(vinnslItem.nncloud.dl4jNetwork)" :options="{maxDepth: 4, rootObjectKey: 'dl4j'}" style="text-align:left"></tree-view>
                  </b-tab>

                  <b-tab title="Training Engine">
                    <input type="radio" id="one" value="DL4J" v-model="trainingEngine">
                    <label for="one">DL4J</label>
                    <br>
                    <input type="radio" id="two" value="TensorFlowJS" v-model="trainingEngine">
                    <label for="two">TensorFlow (Ugi)</label>
                    <br>
                    <input type="radio" id="three" value="TensorFlowPython" v-model="trainingEngine">
                    <label for="two">TensorFlow (Matthias)</label>
                    <br>
                    <span>Picked: {{ trainingEngine }}</span>

                  </b-tab>

                </b-tabs>
                <p></p>
                <p></p>
                <b-btn variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>
                <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>

    <p></p>
    <h4>Debug</h4>
    <b-btn v-b-toggle.collapse1>Show Response details</b-btn>
    <p></p>
    <b-collapse id="collapse1" class="mt-2">
      <h3>Backend response: <!--<b-alert :show="showResponse" dismissible @dismissed="showResponse=false">{{ response }}</b-alert>--></h3>
      <code>{{ response }}</code>
      <p></p>
      <h4>HTTP Status & Headers</h4>
      <p>Status: <code>{{ httpStatusCode }}</code></p>
      <p>Statustext: <code>{{ httpStatusText }}</code></p>
      <p v-if="headers && headers.length">
        <li v-for="header of headers">
      <p>Header: {{ header.valueOf() }}</p>
      </li>
      </p>

      <h4>Request configuration</h4>
      <p>Config: <code>{{ fullResponse.config }} </code></p>
    </b-collapse>


    <b-tooltip target="btnHttpHeaders" title="You should always know your HTTP Headers!"></b-tooltip>

  </div>
</template>

<script>
  // import axios from 'axios'
  import {AXIOS} from './http-common'

  export default {
    name: 'vinnslui',

    data () {
      return {
        msg: 'ConbexNN',
        showResponse: true,
        response: '',
        vinnslList: '',
        vinnslItem: '',
        fullResponse: {
          config: {
            foo: '',
            bar: ''
          }
        },
        httpStatusCode: '',
        httpStatusText: '',
        headers: ['Noting here atm. Did you call the Service?'],
        errors: [],
        selectedFile: null,
        trainingEngine: 'DL4J', /* default */
        fileOptions: []
      }
    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        AXIOS.get(this.$vinnslBackendUrl + `/status/`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.vinnslList = response.data
            this.response = response.data
            // console.log(response.data)
            this.httpStatusCode = response.status
            this.httpStatusText = response.statusText
            this.headers = response.headers
            this.fullResponse = response
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getDetailsById (id) {
        AXIOS.get(this.$vinnslBackendUrl + `/vinnsl/` + id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.vinnslItem = response.data
            this.response = response.data
            console.log('vinnsl/' + id)
            // console.log(response.data)
            this.httpStatusCode = response.status
            this.httpStatusText = response.statusText
            this.headers = response.headers
            this.fullResponse = response
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      deleteById (id) {
        this.vinnslItem = null
        AXIOS.delete(this.$vinnslBackendUrl + `/vinnsl/` + id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.response = response.data
            // console.log('DELETE vinnsl/' + id)
            // console.log(response.data)
            this.httpStatusCode = response.status
            this.httpStatusText = response.statusText
            this.headers = response.headers
            this.fullResponse = response
            this.vinnslItem = null
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getFiles () {
        AXIOS.get(this.$vinnslStorageBackendUrl + `/storage/`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.response = response.data.files
            this.fileOptions = response.data.files
            // console.log('files' + response.data.files)
            this.httpStatusCode = response.status
            this.httpStatusText = response.statusText
            this.headers = response.headers
            this.fullResponse = response
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      applyFile (id, fileid) {
        AXIOS.put(this.$vinnslBackendUrl + `/vinnsl/` + id + `/addfile?fileId=` + fileid)
          .then(response => {
            // JSON responses are automatically parsed.
            this.response = response.data
            // console.log('added file' + response.data)
            this.httpStatusCode = response.status
            this.httpStatusText = response.statusText
            this.headers = response.headers
            this.fullResponse = response
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      startTrainingById (id) {
        //  console.log(this.$vinnslBackendUrl)
        //  console.log(this.trainingEngine)
        if (this.trainingEngine === 'DL4J') {
          AXIOS.put(this.$vinnslBackendUrl + `/worker/queue/` + id + `/`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.response = response.data
              // console.log('added file' + response.data)
              this.httpStatusCode = response.status
              this.httpStatusText = response.statusText
              this.headers = response.headers
              this.fullResponse = response
            })
            .catch(e => {
              this.errors.push(e)
            })
        } else if (this.trainingEngine === 'TensorFlowJS') {
          AXIOS.get(this.$vinnslBackendUrlTensorFlowJS + '/worker').then(response => {
            console.log(response)
          })
        }
      },
      getCurrentEngine () {
        return this.trainingEngine
      },
      getPillByStatus (status) {
        // console.log(status)
        if (status === 'INPROGRESS') {
          return 'warning'
        }
        if (status === 'FINISHED') {
          return 'success'
        }
        if (status === 'ERROR') {
          return 'danger'
        }
        return 'primary'
      },
      getTrainingButtonDisabled (status) {
        if (status === 'CREATED') {
          return false
        }
        if (status === 'FINISHED') {
          return false
        }
        return true
      }
    },
    filters: {
      pretty: function (value) {
        // return JSON.stringify(JSON.parse(value), null, 2)
        // return this.$beautify(value, null, 2, 100)
        return value
      }
    },
    mounted () {
      this.getFiles()
      this.callRestService()

      setInterval(function () {
        this.callRestService()
      }.bind(this), 1000)
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    margin-bottom: 20px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    /*color: #42b983;*/
  }
</style>

<!--
/*,
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2)
    }
  }*/-->
