let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 600;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(16);

  let box = verly.createCloth(200, 200, 300, 300, 20, 2);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();

    requestAnimationFrame(animate);
  }
  animate();
}
