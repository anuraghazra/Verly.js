let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(16);

  verly.createBox(100, 100, 100, 100);
  verly.createHexagon(100, 100, 32, 50, 5, 8);
  verly.createRagdoll(400, 100, 32, 100, 8, 10);
  
  function animate() {
    ctx.clearRect(0, 0, width, height);


    verly.update();
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}