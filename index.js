let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let box = Verlet.createBox(200, 100, 150, 100);
  let hexa = Verlet.createHexagon(300, 300, 16);
  box.setVelocity(-1, 0);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    box.update();
    box.renderPointsIndex();
    hexa.update();
    hexa.renderPointsIndex();

    requestAnimationFrame(animate);
  }
  animate();
}