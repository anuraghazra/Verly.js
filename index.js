let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;


window.onload = function () {

  let verlet = new Verlet();


  let hexa = verlet.createHexagon(300, 300, 16, 1, 20);
  let rope = verlet.createRope(100, 100, 10);
  let cloth = verlet.createCloth(300, 200, 200, 200, 10, 3);
  rope.pin(0);
  
  let mix = verlet.joinEntities(hexa, rope);
  mix.addStick(new Stick(mix.points[26], mix.points[0], 1, 5));


  function animate() {
    ctx.clearRect(0, 0, width, height);

    verlet.update();
    

    requestAnimationFrame(animate);
  }
  animate();
}