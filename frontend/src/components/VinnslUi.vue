<template>
  <div class="bootstrap">
    <h1>{{ msg }}</h1>
    <h2>Status</h2>
    <!--<p></p>
    <h6><b-badge variant="primary"> Let´s go!</b-badge> Call a Spring Boot REST backend service, by clicking a button:</h6>-->

    <p></p>
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="clearfix">
            <b-btn variant="success" @click="callRestService(); showResponse=true" id="btnCallHello" class="float-right"><icon name="refresh"></icon></b-btn>
          </div>
          <p></p>
          <b-list-group v-for="(item,id) in vinnslList">
            <b-list-group-item class="d-flex justify-content-between align-items-center" @click="getDetailsById(id)" href="#">
              {{id}}
              <b-badge :variant="`${getPillByStatus(item)}`" pill>{{item}}</b-badge>
            </b-list-group-item>
          </b-list-group>
          <p></p>
        </div>

        <div class="col-lg-7">
          <div v-if="vinnslItem">
            <div class="clearfix">
              <b-btn variant="success" @click="getDetailsById(vinnslItem.identifier); showResponse=true" id="btnItemRefresh" class="float-right"><icon name="refresh"></icon></b-btn>
            </div>
            <p></p>
            <b-card-group deck>
              <b-card header="Information to Item"
                      header-tag="header"
                      footer=""
                      footer-tag=""
                      :title="`ID ${vinnslItem.identifier}`">
                <p class="card-text">{{vinnslItem.nncloud.status}}</p>
                <b-tabs>
                  <b-tab title="Description">
                    <p></p>
                    <h3>Description</h3>
                    <tree-view :data="vinnslItem.description" :options="{maxDepth: 4, rootObjectKey: 'description'}" style="text-align:left"></tree-view>
                  </b-tab>
                  <b-tab title="Definition" active>
                    <p></p>
                    <h3>Definition</h3>
                    <div>
                      <tree-view :data="vinnslItem.definition" :options="{maxDepth: 4, rootObjectKey: 'definition'}" style="text-align:left"></tree-view>
                    </div>
                  </b-tab>
                  <b-tab title="Data">
                    <p></p>
                    <h3>Data</h3>
                    <tree-view :data="vinnslItem.data" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
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

                </b-tabs>
                <p></p>
                <p></p>
                <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger"><icon name="trash"></icon></b-button>
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
      msg: 'VINNSL-NN-UI',
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
      fileOptions: []
    }
  },
  methods: {
    // Fetches posts when the component is created.
    callRestService () {
      AXIOS.get(this.$vinnslBackendUrl + `/status`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.vinnslList = response.data
          this.response = response.data
          console.log(response.data)
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
          console.log(response.data)
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
      AXIOS.delete(this.$vinnslBackendUrl + `/vinnsl/` + id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data
          console.log('DELETE vinnsl/' + id)
          console.log(response.data)
          this.httpStatusCode = response.status
          this.httpStatusText = response.statusText
          this.headers = response.headers
          this.fullResponse = response
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getFiles () {
      AXIOS.get(this.$vinnslStorageBackendUrl + `/storage`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data.files
          this.fileOptions = response.data.files
          console.log('files' + response.data.files)
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
          console.log('added file' + response.data)
          this.httpStatusCode = response.status
          this.httpStatusText = response.statusText
          this.headers = response.headers
          this.fullResponse = response
        })
        .catch(e => {
          this.errors.push(e)
        })
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

    /* setInterval(function () {
      this.callRestService()
    }.bind(this), 2000) */
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
