<template>
  <div class="bootstrap">
    <!--  <h3>Iris classification</h3> -->
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="clearfix">
            <!--<b-btn variant="success" @click="callRestService(); showResponse=true" id="btnCallHello" class="float-right"><icon name="refresh"></icon></b-btn>-->
          </div>
          <p></p>
          <b-list-group v-for="(item,id) in vinnslList" :key="id">
            <b-list-group-item class="d-flex justify-content-between align-items-center" @click="getDetailsById(id)" href="#">
              {{id}}
              <b-badge :variant="`${getPillByStatus(item)}`" pill>{{item}}</b-badge>
            </b-list-group-item>
          </b-list-group>
          <!--  <p>  {{'current training engine: '}}{{getCurrentEngine()}}</p> -->
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

                <b-tabs>
                  <b-tab title="Training" active>
                    <p></p>
                    <div class="col-lg-12" id="appp">
                      <div v-if="!vinnslItem.definition">
                        <br>
                        <b-alert show variant="warning">You have to add ViNNSL Definition to your network</b-alert>
                      </div>
                      <!--
                        <b-row>
                          <b-col>
                            <label>Trainings epochs:</label>
                            <b-form-input
                              id="inputepochs"
                              v-model="epochs"
                              trim
                              type="number"
                              min="1"
                              :value="20"
                              placeholder="e.g. 20">
                            </b-form-input>
                          </b-col>
                          <b-col>
                            <label> Batch size:</label>
                            <b-form-input
                              id="batchSize"
                              v-model="batchSize"
                              trim
                              type="number"
                              min="0"
                              :value="128"
                              placeholder="e.g. 128">
                            </b-form-input>
                             :value="`${vinnslItem.definition.parameters.valueparameterOrBoolparameterOrComboparameter[0].value}`"
                          </b-col>
                        </b-row>
                      -->
                      <div >
                        <b-row v-if="vinnslItem.definition" style="margin-top: 15px;">
                          <b-col><b-progress :value="trainingProcessForSelectedItem" :precision="2" variant="success" show-progress striped :animated="animate" /></b-col>
                        </b-row>
                        <!--
                        <b-row style="margin-top: 15px;">
                          <b-col><span>info: the training takes about 75 minutes</span></b-col>
                        </b-row>
                        -->
                        <div class="col-lg-12">
                          <p></p>
                          <p></p>

                          <b-btn v-if="vinnslItem.definition" variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>
                          <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>
                        </div>
                      </div>
                      </div>

                  </b-tab>

                   <b-tab title="Description">
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

                  <!--
                  <b-tab title="Data">
                    <p></p>
                    <h3>Data</h3>
                    <h4>Definition Data</h4>
                    <tree-view :data="vinnslItem.definition.data" v-if="vinnslItem.definition && vinnslItem.definition.data" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <a :href="`${this.$vinnslStorageBackendUrl}/storage/files/${vinnslItem.definition.data.dataSchemaID}`"
                       v-if="vinnslItem.definition && vinnslItem.definition.data && vinnslItem.definition.data.dataSchemaID">See File</a>
                    <h4>Data</h4>
                    <tree-view :data="vinnslItem.data" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <h4>Result Data</h4>
                    <tree-view :data="vinnslItem.result" :options="{maxDepth: 4, rootObjectKey: 'data'}" style="text-align:left"></tree-view>
                    <a :href="`${this.$vinnslBackendUrl}/storage/files/${vinnslItem.result.file}?download=false`"
                       v-if="vinnslItem.result && vinnslItem.result.file">See File</a>
                  </b-tab>
                  -->
                  <!--
                   <b-tab title="Instance">
                     <p></p>
                     <h3>Instance</h3>
                     <tree-view :data="vinnslItem.instance" :options="{maxDepth: 4, rootObjectKey: 'instance'}" style="text-align:left"></tree-view>
                   </b-tab>
                   -->
                  <b-tab title="Result" @click="loadResult();">
                    <p></p>


                    <ul class="list-group" v-if="foundResult">
                      <li class="list-group-item"><b>Create time:</b><span style="margin-left: 58px">{{result.createTimestamp}}</span></li>
                      <li class="list-group-item"><b>Last update time:</b> <span style="margin-left: 20px">{{result.lastUpdateTime}}</span></li>
                      <li class="list-group-item"><b>Training time: </b><span style="margin-left: 47px">{{result.trainingTime}} minutes</span></li>
                      <li class="list-group-item"><b>Number of training:</b> <span style="margin-left: 5px">{{result.numberOfTraining}}</span></li>
                      <li class="list-group-item"><b>Last result:</b> <span style="margin-left: 60px">{{result.lastResult}} %</span></li>
                      <li class="list-group-item"><b>Best result:</b> <span style="margin-left: 63px">{{result.bestResult}} %</span></li>
                      <li class="list-group-item"><b>Loss:</b> <span style="margin-left: 105px">{{result.loss}}</span></li>
                      <li class="list-group-item"><b>Epochs:</b><span style="margin-left: 88px">{{result.epochs}}</span></li>
                      <li class="list-group-item"><b>Batch size: </b><span style="margin-left: 65px">{{result.batchSize}}</span></li>
                    </ul>
                    <ul class="list-group" v-if="!foundResult">
                      <li class="list-group-item"><b>No results exist for this network</b></li>

                    </ul>

                    <!--
                    <tree-view :data="resultForVinnslItem" :options="{maxDepth: 4, rootObjectKey: 'result'}" style="text-align:left"></tree-view>
                   -->
                  </b-tab>
                  <!--
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
                  -->

                  <!--
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
                   -->

                </b-tabs>
                <p></p>
                <p></p>
                <!--
                <b-btn variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>
                <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>
                -->
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
   <!--
    <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
    <h3>Test results</h3>

    <div>
      <b-table
        responsive
        :items="items"
        :striped="striped"
        :bordered="bordered"
        :fields="fields"
        striped hover />
    </div>
-->
  </div>

</template>


<script>
  // import axios from 'axios'
  import {AXIOS} from '../http-common'

  export default {

    name: 'iris-tf-js-ui',
    computed: {
      epochState () {
        if (this.epochs > 0) {
          return true
        } else {
          return false
        }
      }
    },
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
        trainingEngine: 'TensorFlowJS', /* default */
        fileOptions: [],
        epochs: '20',
        batchSize: '128',
        items: [],
        striped: true,
        bordered: true,
        animate: true,
        selectedVinnslId: '',
        trainingProcessForSelectedItem: 0.00,
        selectedVinnslItem: null,
        resultForVinnslItem: [],
        result: {
          createTimestamp: '',
          lastUpdateTime: '',
          trainingTime: '',
          numberOfTraining: '',
          lastResult: '',
          bestResult: '',
          epochs: '',
          batchSize: '',
          loss: ''
        },
        foundResult: false
      }
    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        AXIOS.get(this.$vinnslBackendUrl + `/status/mnist`)
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
        this.loadResult()
        this.resultForVinnslItem = []
        this.selectedVinnslItem = id
        this.getTrainingProcess()
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
            this.vinnslItem.definition.parameters.valueparameterOrBoolparameterOrComboparameter.forEach(function (element) {
              if (element.name === 'learningrate') {
                this.learningRate = element.value
              }
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getDefininitionById () {
        if (!this.vinnslItem.definition && this.selectedVinnslItem != null) {
          this.getDetailsById(this.selectedVinnslItem)
        }
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
        //  AXIOS.get(this.$vinnslBackendUrlTensorFlowJS + `/worker/queue?id=` + id + `&epochs=` + this.epochs + `&learningRate=` + this.learningRate)
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/mnist`, {
          id: id,
          epochs: this.epochs,
          batchSize: this.batchSize,
          nnSpecies: 'mnist',
          vinnslItem: this.vinnslItem
        })
          .then(response => {
           // this.items = response.data
            // console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      loadResult () {
        AXIOS.get(this.$vinnslBackendUrl + `/vinnsl/get/statistic-js/` + this.selectedVinnslItem)
          .then(response => {
            if (typeof response.data.createTimestamp === 'undefined') {
              this.foundResult = false
            } else {
              this.foundResult = true
              this.result.createTimestamp = response.data.createTimestamp
              this.result.lastUpdateTime = response.data.lastUpdateTime
              this.result.trainingTime = response.data.trainingTime
              this.result.numberOfTraining = response.data.numberOfTraining
              this.result.lastResult = response.data.lastResult
              this.result.bestResult = response.data.bestResult
              this.result.epochs = response.data.epochs
              this.result.loss = response.data.loss
              this.result.batchSize = response.data.batchSize
            }
            // console.log('response: ' + response)
            this.resultForVinnslItem = response.data

            // console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
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
      },
      rowClass (item, type) {
        if (!item) return
        if (item.status === 'awesome') return 'table-success'
      },
      getTrainingProcess () {
        // console.log('selectedVinnslItem:' + this.selectedVinnslItem)
        AXIOS.get(this.$vinnslBackendUrl + `/vinnsl/get/process/` + this.selectedVinnslItem)
          .then(response => {
            if (typeof response.data.trainingProcess === 'undefined') {
              this.trainingProcessForSelectedItem = 0
            } else {
              this.trainingProcessForSelectedItem = parseFloat(response.data.trainingProcess)
              if (this.trainingProcessForSelectedItem === 100) {
                this.striped = false
                this.animate = false
              } else {
                this.striped = true
                this.animate = true
              }
            }

            // console.log('getTrainingProcess: ' + response.data.trainingProcess)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      showNoItemsMessage (vinnslList) {
        if (typeof vinnslList.length === 'undefined' || vinnslList.length === 0) {
          return true
        } else {
          return false
        }
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
      this.getDefininitionById()
      setInterval(function () {
        this.callRestService()
        this.getTrainingProcess()
        this.getDefininitionById()
        if (this.vinnslItem !== '' && this.vinnslItem.nncloud !== 'undefined' && this.vinnslItem.nncloud.status !== 'undefined') {
          this.getTrainingButtonDisabled(this.vinnslItem.nncloud.status)
        }
      }.bind(this), 5000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
    }
  }
</script>
