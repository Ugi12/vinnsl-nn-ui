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
          <b-list-group v-for="obj in vinnslList" :key="obj.id">
            <b-list-group-item class="d-flex justify-content-between align-items-center" @click="getDetailsById(obj.id)" href="#">
              {{obj.id}}
              <b-badge :variant="`${getPillByStatus(obj.item)}`" pill>{{obj.item}}</b-badge>
            </b-list-group-item>
          </b-list-group>
          <p></p>
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
                  <b-tab title="Settings" active>
                    <p></p>
                    <div class="col-lg-12">

                      <b-row>
                        <b-col>
                          <label>Trainings epochs:</label>
                          <b-form-input
                            id="inputepochs"
                            v-model="epochs"
                            trim
                            type="number"
                            min="1"
                            :value="5000"
                            placeholder="e.g. 100">
                          </b-form-input>
                        </b-col>
                        <b-col>
                          <label> Batch size:</label>
                          <b-form-input
                            id="learningRate"
                            v-model="learningRate"
                            trim
                            type="number"
                            min="0"
                            :value="0.005"
                            placeholder="e.g. 0.01">
                          </b-form-input>
                          <!-- :value="`${vinnslItem.definition.parameters.valueparameterOrBoolparameterOrComboparameter[0].value}`" -->
                        </b-col>
                      </b-row>

                      <b-row style="margin-top: 15px;">
                        <b-col><b-progress :value="trainingProcessForSelectedItem" :precision="2" variant="success" show-progress striped :animated="animate" /></b-col>
                      </b-row>
                    </div>
                    <div class="col-lg-12">
                      <p></p>
                      <p></p>

                      <b-btn variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>
                      <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>

                    </div>
                  </b-tab>

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

                  <b-tab title="Result" @click="loadResult();">
                    <p></p>


                    <ul class="list-group" v-if="resultForVinnslItem.length>0">
                      <h3>Result</h3>
                      <li class="list-group-item"><b>Create time:</b><span style="margin-left: 58px">{{resultForVinnslItem[0]}}</span></li>
                      <li class="list-group-item"><b>Last update time:</b> <span style="margin-left: 20px">{{resultForVinnslItem[1]}}</span></li>
                      <li class="list-group-item"><b>Training time: </b><span style="margin-left: 47px">{{resultForVinnslItem[2]}} seconds</span></li>
                      <li class="list-group-item"><b>Number of training:</b> <span style="margin-left: 5px">{{resultForVinnslItem[3]}}</span></li>
                      <li class="list-group-item"><b>Best result:</b> <span style="margin-left: 60px">{{resultForVinnslItem[4]}} %</span></li>
                      <li class="list-group-item"><b>Epochs:</b><span style="margin-left: 88px">{{resultForVinnslItem[5]}}</span></li>
                      <li class="list-group-item"><b>Learning rate: </b><span style="margin-left: 43px">{{resultForVinnslItem[6]}}</span></li>
                    </ul>
                    <ul class="list-group" v-if="resultForVinnslItem.length==0">
                      <li class="list-group-item"><b>No results exist for this network</b></li>

                    </ul>
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

                </b-tabs>
                <p></p>
                <p></p>

              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>

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
        epochs: '5000',
        learningRate: '0.001',
        items: [],
        striped: true,
        bordered: true,
        selectedVinnslItem: null,
        resultForVinnslItem: [],
        animate: true,
        selectedVinnslId: '',
        trainingProcessForSelectedItem: 0.00
      }
    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        AXIOS.get(this.$vinnslBackendUrl + `/status/`)
          .then(response => {
            // console.log(Object.keys(this.vinnslList))
            let tempVinnslList = response.data
            this.vinnslList = null
            let tempList = []

            for (let i = 0; i < Object.keys(tempVinnslList).length; i++) {
              /* console.log('i:' + i)
               console.log(Object.keys(tempVinnslList)[i]) */
              let id = Object.keys(tempVinnslList)[i]
              AXIOS.get(this.$vinnslBackendUrl + `/vinnsl/` + id)
                .then(response => {
                  /*  console.log('uu')
                     console.log(response.data.description.metadata.description) */
                  let species = response.data.description.metadata.description
                  if (species.toLowerCase().includes('wine')) {
                    let obj = {
                      id: id,
                      item: tempVinnslList[id]
                    }
                    //  console.log('added: ' + tempVinnslList[id])
                    tempList.push(obj)
                  }
                }).catch(e => {
                  this.errors.push(e)
                })
            }
            this.vinnslList = tempList
            //  console.log('last: ' + this.vinnslList)

            // JSON responses are automatically parsed.

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
      loadResult () {
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/statistics/wine`, {
          id: this.selectedVinnslId
        })
          .then(response => {
            // console.log('response: ' + response)
            this.resultForVinnslItem = response.data

            // console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getTrainingProcess () {
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/process/wine`, {
          id: this.selectedVinnslId
        })
          .then(response => {
            if (response.data.length > 0) {
              this.trainingProcessForSelectedItem = response.data[0]
              if (this.trainingProcessForSelectedItem === 100 || this.trainingProcessForSelectedItem === 0) {
                this.animate = false
              } else {
                this.animate = true
              }
              console.log('getTrainingProcess: ' + response.data[0])
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getDetailsById (id) {
        this.selectedVinnslId = id
        this.loadResult()
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
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/wine`, {
          id: id,
          epochs: this.epochs,
          learningRate: this.learningRate,
          nnSpecies: 'wine',
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

      setInterval(function () {
        this.callRestService()
        this.getTrainingProcess()
      }.bind(this), 5000)
    }
  }
</script>
