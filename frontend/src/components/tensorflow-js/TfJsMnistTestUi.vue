<template>
  <div class='bootstrap'>
    <h3>MNIST Page </h3>
    <div class='container'>
      <div class='row'>

        <canvas id="canvas" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" width=280px
                height=280px></canvas>
        <br>
      </div>
      <div class="row">
        <div class="btn-group" role="group" style="margin-top: 2%">
          <button type="button" class="btn btn-primary" id="predict">Predict <i id="status"></i></button>
          <button type="button" class="btn btn-default" @click="clearCanvas">Clear</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data: function () {
      return {
        mouse: {
          current: {
            x: 0,
            y: 0
          },
          previous: {
            x: 0,
            y: 0
          },
          down: false
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
        console.log('mouse move drin')
        let rect = this.canvas.getBoundingClientRect()
        this.mouse.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }

        this.draw(event)
      },
      handleMouseUp (event) {
        console.log('mouse up drin')
        this.mouse.down = false
      },
      draw: function (event) {
        console.log('draw drin')
        if (this.mouse.down) {
          this.ctx.clearRect(0, 0, 280, 280)

          this.ctx.lineTo(this.mouse.current.x, this.mouse.current.y)
          this.ctx.strokeStyle = '#2b2b2b'
          this.ctx.lineWidth = 8
          this.ctx.stroke()
        }
      },
      clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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

</style>
