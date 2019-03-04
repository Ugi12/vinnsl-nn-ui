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
            <b-list-group-item class="d-flex justify-content-between align-items-center" @click="getDetailsById(obj.id); loadResult()" href="#">
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
                            :value="40"
                            placeholder="e.g. 40">
                          </b-form-input>
                        </b-col>
                        <b-col>
                          <label> Learning Rate:</label>
                          <b-form-input
                            id="learningRate"
                            v-model="learningRate"
                            trim
                            type="number"
                            min="0"
                            :value="0.01"
                            placeholder="e.g. 0.1">
                          </b-form-input>
                          <!-- :value="`${vinnslItem.definition.parameters.valueparameterOrBoolparameterOrComboparameter[0].value}`" -->
                        </b-col>
                      </b-row>

                    </div>
                    <div class="col-lg-12">
                      <p></p>
                      <p></p>

                      <b-btn variant="success" :disabled=getTrainingButtonDisabled(vinnslItem.nncloud.status) @click="startTrainingById(vinnslItem.identifier); showResponse=true" id="btnItemStartTraining"><icon name="play"></icon> Start Training</b-btn>
                      <b-button @click="deleteById(vinnslItem.identifier); showResponse=true; callRestService();" variant="danger" class="float-right"><icon name="trash"></icon></b-button>

                    </div>
                   </b-tab>
                  <!--
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
                   -->
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
                  <!--
                   <b-tab title="Instance">
                     <p></p>
                     <h3>Instance</h3>
                     <tree-view :data="vinnslItem.instance" :options="{maxDepth: 4, rootObjectKey: 'instance'}" style="text-align:left"></tree-view>
                   </b-tab>
                   -->
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
                 -->
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
    <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
    <div v-show="items.length>0">


      <h3>Test results...   corrent prediction: {{predictionInPercent}}%</h3>

      <div>
        <b-table
          responsive
          :items="items"
          :striped="striped"
          :bordered="bordered"
          :fields="fields"
          striped hover />
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
        epochs: '40',
        learningRate: '0.01',
        fields: {
          petal_length: {
            label: 'Petal length',
            sortable: true
          },
          petal_width: {
            label: 'Petal witdh',
            sortable: true
          },
          sepal_length: {
            label: 'Sepal length',
            sortable: true
          },
          sepal_width: {
            label: 'Sepal width',
            sortable: true
          },
          origin_iris: {
            label: 'Origin iris',
            sortable: true
          },
          predicted_iris: {
            label: 'Predicted iris',
            sortable: true
          },
          setosa_in_percent: {
            label: 'Setosa',
            sortable: true
          },
          versicolor_in_percent: {
            label: 'Versicolor',
            sortable: true
          },
          virginica_in_percent: {
            label: 'Virginica',
            sortable: true
          }
        },
        items: [],
        striped: true,
        bordered: true,
        predictionInPercent: 0,
        resultFromTFJS: '',
        selectedVinnslItem: null,
        resultForVinnslItem: []
      }
    },
    methods: {
      isIrisSelected () {
        let iris = 'iris'
        if (iris.includes(this.vinnslItem.description.metadata.description.toLowerCase())) {
          return true
        } else {
          false
        }
      },
      testCall () {

      },
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
                  if (species.toLowerCase().includes('iris')) {
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
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/statistics/iris`, {
          id: this.selectedVinnslItem
        })
          .then(response => {
            console.log('response: ' + response)
            this.resultForVinnslItem = response.data

            // console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getDetailsById (id) {
        this.resultForVinnslItem = []
        this.selectedVinnslItem = id
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
      //  AXIOS.get(this.$vinnslBackendUrlTensorFlowJS + `/worker/queue?id=` + id + `&epochs=` + this.epochs + `&learningRate=` + this.learningRate)
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/iris`, {
          id: id,
          epochs: this.epochs,
          learningRate: this.learningRate,
          nnSpecies: 'iris',
          vinnslItem: this.vinnslItem
        })
          .then(response => {
            this.items = response.data[0]
            this.predictionInPercent = response.data[1]
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
      this.callRestService()

      setInterval(function () {
        this.callRestService()
      }.bind(this), 5000)
    }
  }
</script>
