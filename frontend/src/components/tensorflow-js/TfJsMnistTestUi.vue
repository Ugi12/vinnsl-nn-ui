<template>

  <div class='bootstrap'>
    <h3> </h3>
    <div class='container'>
      <div class="col-lg-8">
        <h2 id="header">MNIST Draw</h2>
        <p>Draw a single digit (0-9) in the box to the left, then click Predict.</p>
        <p>A machine learning model trained by Tensorflow.js against the MNIST character dataset will classify the image. Scores for each classification label are plotted in the right box.</p>
        <br>
      </div>

      <div class="col-lg-12">

      <div class='row'>

        <!-- @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" -->
        <canvas id="canvas" width="280" height="280" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" class="canvas"></canvas>
        <div class="square" width="280" height="280">
          <div class="predicted-number">
            <span v-show="predictedClass === 0">0</span>
            <span v-show="predictedClass === 1">1</span>
            <span v-show="predictedClass === 2">2</span>
            <span v-show="predictedClass === 3">3</span>
            <span v-show="predictedClass === 4">4</span>
            <span v-show="predictedClass === 5">5</span>
            <span v-show="predictedClass === 6">6</span>
            <span v-show="predictedClass === 7">7</span>
            <span v-show="predictedClass === 8">8</span>
            <span v-show="predictedClass === 9">9</span>

          </div>
        </div>
        <br>
      </div>
      <div class="row">
        <div class="btn-group" role="group" style="margin-top: 2%">
          <button type="button" class="btn btn-primary" @click="predict" id="predict">Predict <i id="status"></i></button>
          <button type="button" class="btn btn-default" @click="clearCanvas">Clear</button>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>
<script>
  import {AXIOS} from '../http-common'

  export default {
    data: function () {
      return {
        mouse: {
          down: false,
          current: {
            x: '',
            y: ''
          }
        },
        canvas: '',
        ctx: '',
        model: null,
        predictedClass: ''
      }
    },
    methods: {
      handleMouseDown (event) {
        console.log('mouse down drin')
        this.mouse.down = true
        let rect = this.canvas.getBoundingClientRect()
        this.mouse.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }

        this.ctx.moveTo(this.mouse.current.x, this.mouse.current.y)
      },
      handleMouseMove (event) {
        // console.log('mouse move drin')
        let rect = this.canvas.getBoundingClientRect()
        this.mouse.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }

        this.draw(event)
      },
      handleMouseUp (event) {
        // console.log('mouse up drin')
        this.mouse.down = false
      },
      draw: function (event) {
        // console.log('draw drin')
        if (this.mouse.down) {
          this.ctx.clearRect(0, 0, 280, 280)

          this.ctx.lineTo(this.mouse.current.x, this.mouse.current.y)
          this.ctx.strokeStyle = '#2b2b2b'
          this.ctx.lineWidth = 16
          this.ctx.stroke()
        }
      },
      clearCanvas: function (event) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.predictedClass = ''
      },
      predict: async function () {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        let dataUrl = this.canvas.toDataURL('image/png')

        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/predict-on-server/mnist`, {
          imageData: dataUrl
        })
          .then(response => {
            this.predictedClass = response.data[0]
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    mounted () {
      this.canvas = document.getElementById('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.ctx.translate(0.5, 0.5)
      this.ctx.imageSmoothingEnabled = false
    }
  }

</script>
<style>
  canvas {
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  .square{
    position: relative;
    width: 280px;
    margin-left: 10%;
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  .predicted-number{
    font-size: 180px;
    text-align: center;
  }

</style>
