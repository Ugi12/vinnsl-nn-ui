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
                    <md-field class="rcorners" v-if="vinnslItem.definition">
                      <label>Text to train</label>
                      <md-textarea v-model="textarea" ></md-textarea>
                    </md-field>
                    <div class="col-lg-12" id="appp">
                      <div v-if="!vinnslItem.definition">
                        <br>
                        <b-alert show variant="warning">You have to add ViNNSL Definition to your network</b-alert>
                      </div>
                      <div>
                        <b-row v-if="vinnslItem.definition" style="margin-top: 15px;">
                          <b-col><b-progress :value="trainingProcessForSelectedItem" :precision="2" variant="success" show-progress striped :animated="animate" /></b-col>
                        </b-row>

                        <div class="col-lg-12">
                          <p></p>
                          <p></p>
                          <b-btn v-if="vinnslItem.definition" variant="success" @click="saveTextInDB(vinnslItem.identifier);" id="btnItemSaveText"><icon name="save"></icon> Save Text</b-btn>

                          <b-btn v-if="vinnslItem.definition" variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>

                          <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>
                        </div>

                        <div class="col-lg-12" style="margin-top: 4px"><flash-message class=""></flash-message></div>
                      </div>
                    </div>

                  </b-tab>
                  <b-tab title="Generate Text" @click="loadResult()">
                    <p></p>
                    <h3></h3>
                    <div v-if="foundResult">
                      <md-field class="rcorners" v-if="vinnslItem.definition">
                        <md-textarea v-model="generatedtext" :disabled="true"></md-textarea>
                      </md-field>
                      <div class="col-lg-12">
                        <b-row>

                          <b-col>
                            <label>Length of the generated text:</label>
                            <b-form-input
                              id="genTextLenId"
                              v-model="genTextLen"
                              trim
                              type="number"
                              min="1"
                              :value="genTextLen"
                              placeholder="e.g. 200">
                            </b-form-input>
                          </b-col>
                          <b-col>
                            <label> Generation temperature:</label>
                            <b-form-input
                              id="genTemperatureId"
                              v-model="genTemperature"
                              trim
                              min="0"
                              max="1"
                              :value="genTemperature"
                              placeholder="e.g. 0.75, (allowed > 0 & <= 1)">
                            </b-form-input>

                          </b-col>

                        </b-row>

                            <br>
                            <div class="row">
                              <div class="col-lg-3">
                                <b-btn variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="generateTextById(vinnslItem.identifier); showResponse=true" id="btnItemGenerateText"> Generate Text</b-btn>
                              </div>
                              <div class="col-lg-2">
                              <i id="info-icon" class="fa fa-info-circle" style="font-size:24px; margin-top: 6px;margin-left: -15px"></i>

                            <b-tooltip target="info-icon" placement="right">
                              If not entered a specific input, default values will be used.
                              (Length of the generated text: 200 and Generation temperature: 0.75)
                            </b-tooltip>
                              </div>
                            </div>



                      </div>
                    </div>
                    <div v-if="!foundResult">
                      <br>
                      <b-alert show variant="warning">You have to train your network first to generate a text</b-alert>
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
  import {AXIOS} from '../http-common'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-flash-message/dist/vue-flash-message.min.css'
  export default {
    name: 'TfJsLstmTrain',
    data () {
      return {
        name: 'TextFields',
        // textarea: 'TensorFlow is an end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML powered applications.',
        textarea: '',
        generatedtext: '',
        genTextLen: null,
        genTemperature: null,
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
        foundResult: false,
        disableTrainingButton: true,
        disableNoItemMsg: true

      }
    },
    watch: {
      textarea: function (value) {
        if (this.textarea.length > 10) {
          this.disableTrainingButton = false
        } else {
          this.disableTrainingButton = true
        }

        console.log('watched:' + value)
      },
      genTextLenId: function () {
        if (this.genTextLen > 0 && this.genTemperature > 0 && this.genTemperature <= 1) {
          console.log('basst')
        }
      }

    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        AXIOS.get(this.$vinnslBackendUrl + `/status/lstm`)
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
        this.getTextfromDB(id)
        this.getTrainingProcess()
        // this.getTextfromDB(id)
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
            this.getTrainingButtonDisabled(this.vinnslItem.nncloud.status)
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
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/lstm`, {
          id: id,
          // text: this.textarea,
          epochs: this.epochs,
          batchSize: this.batchSize,
          nnSpecies: 'lstm',
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
      generateTextById (id) {
        this.generatedtext = ''
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/lstm/generate/text`, {
          id: id,
          textLen: this.genTextLen,
          temperature: this.genTemperature,
          nnSpecies: 'lstm',
          vinnslItem: this.vinnslItem
        })
          .then(response => {
            this.generatedtext = response.data
            // console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      saveTextInDB (id) {
        AXIOS.post(this.$vinnslBackendUrl + `/vinnsl/save-text/lstm`, {
          id: id,
          text: this.textarea
        })
          .then(response => {
            if (response.data.text <= 0) {
              this.disableTrainingButton = true
            } else {
              this.disableTrainingButton = false
            }
            this.flash('Text successfully saved', 'success', {
              timeout: 3000
            })
            // this.items = response.data
            // console.log(response.data)
          })
          .catch(e => {
            this.flash('Text can not be saved', 'error', {
              timeout: 3000
            })
            this.errors.push(e)
          })
      },
      getTextfromDB (id) {
        this.textarea = ''
        console.log('getTextfromDB' + id)
        AXIOS.get(this.$vinnslBackendUrl + `/vinnsl/get-text/lstm/` + id)
          .then(response => {
            this.textarea = response.data
            if (response.data.length <= 0) {
              this.disableTrainingButton = true
            } else {
              this.disableTrainingButton = false
            }
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
          this.disableTrainingButton = true
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
        if (this.disableTrainingButton) return true
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
        console.log('vinnslList.length9: ' + this.vinnslList.length)
        if (typeof this.vinnslList.length === 'undefined' || vinnslList.length === 0) {
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

<style scoped>
  .rcorners {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 20px;
  }
</style>
