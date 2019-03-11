<template>

  <div class='bootstrap'>
    <h3>MNIST Page </h3>
    <div class='container'>
      <div class='row'>

        <!-- @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" -->
        <canvas id="canvas" width="280" height="280" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" class="canvas"></canvas>
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

</template>
<script>
  import {AXIOS} from '../http-common'
  import FormData from 'form-data'
  // import {fabric} from 'fabric'

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
        ctx: ''
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
          this.ctx.lineWidth = 8
          this.ctx.stroke()
        }
      },
      clearCanvas: function (event) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
      },
      predict: function () {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        // let myImage = this.ctx.createImageData(28, 28)

        console.log('predict clicked')
        // let factor = (1 / 10) // (280 /28)= 10
        let data = this.canvas.toDataURL({
          format: 'png',
          withoutShadow: true
        })
        let formData = new FormData()
        formData.append('data', 0)
        formData.append('param', 'ugi')
        formData.append('test', 'boo')

        console.log('predict clicked2' + data)
        AXIOS.post(this.$vinnslBackendUrlTensorFlowJS + `/worker/test/mnist`, {
          data: formData,
          headers: {
            'Content-Type': `multipart/form-data`
          }
        })
          .then(response => {
            // this.items = response.data
            console.log('back from mnist test' + response.data)
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          })
      }
    },
    mounted () {
      this.canvas = document.getElementById('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.ctx.translate(0.5, 0.5)
      this.ctx.imageSmoothingEnabled = false

      /*
      this.canvas = new fabric.Canvas('canvas')
      this.canvas.backgroundColor = '#efefef'
      this.canvas.isDrawingMode = 1
      this.canvas.freeDrawingBrush.color = 'black'
      this.canvas.freeDrawingBrush.width = 10
      this.canvas.renderAll()
      */
      console.log('in mounted')
    }
  }

</script>
<style>
  canvas {
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }

</style>
