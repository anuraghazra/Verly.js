let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 600;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(16);

  verly.createBox(20, 100, 100, 100);
  verly.createHexagon(200, 200, 16, 50);
  verly.createCloth(300, 200, 300, 300, 15, 2);
  verly.createRope(500, 150, 20, 15, 0);
  verly.createRagdoll(300, 200);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
