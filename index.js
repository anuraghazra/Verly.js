let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;


window.onload = function () {

  let verlet = new Verlet();

  // let box = verlet.createBox(100, 100, 100, 100);
  // let cloth = verlet.createCloth(300, 200, 200, 200, 10, 3);
  // cloth.setVelocity(-Math.random() * -0.5, Math.random());
  let hexa = verlet.createHexagon(300, 300, 16, 1, 20);
  let rope = verlet.createRope(100, 100, 10);
  rope.pin(0);

  function animate() {
    ctx.clearRect(0, 0, width, height);


    verlet.update();
    hexa.renderPointsIndex();
    rope.renderPointsIndex();
    // hexa.update();
    // cloth.update();
    // box.renderPointsIndex();
    // hexa.renderPointsIndex();
    // cloth.renderPointsIndex();

    requestAnimationFrame(animate);
  }
  animate();
}