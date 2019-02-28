<template>
  <div class="bootstrap">
    <h3>MNIST Page </h3>
    <div class="container">
      <div class="row">
        <div id="mnist-input-div" class="col-lg-5">
          <canvas id="canvas-mnist-input">

          </canvas>
          <div class="btn-group">
            <button type="button" class="btn btn-primary"> Predict</button>
            <button type="button" class="btn btn-default"> Clear</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /*
  let canvas = document.getElementById('canvas-mnist-input')
  let context = canvas.getContent('2d')
  context.lineJoin = 'round'
  let brushColor = 'black'
  let brushSize = 10
  let mouseXaxis
  let mouseYaxis
  // let canvasOffset = document.getElementById("canvas").offset()
  let offsetX = document.getElementById('canvas').offsetLeft
  let offsetY = document.getElementById('canvas').offsetTop
  */
</script>
<style>
  #mnist-input-div{
    margin-top: 50px;
    height: 500px;
  }

  canvas#canvas-mnist-input{
    border: 1px solid black;
    height: 280px;
    width: 280px;
    background-color: white;
  }


</style>
