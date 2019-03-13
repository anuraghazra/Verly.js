let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;


window.onload = function () {

  let verlet = new Verlet(8);


  // let box = verlet.createBox(300, 300, 100, 100);
  // let hexa = verlet.createHexagon(300, 300, 16, 1, 20);
  // let rope = verlet.createRope(100, 100, 10);
  let cloth = verlet.createCloth(300, 200, 200, 200, 20, 1);
  // rope.pin(0);

  // let mix = verlet.joinEntities(hexa, rope);
  // mix.addStick(new Stick(mix.points[26], mix.points[0], 1, 5));


  function animate() {
    ctx.clearRect(0, 0, width, height);

    verlet.update();
    // verlet.renderPointIndex();
    cloth.tear();
    cloth.setVelocity(Math.random() * 0.5, Math.random() * 0.5)


    requestAnimationFrame(animate);
  }
  animate();
}