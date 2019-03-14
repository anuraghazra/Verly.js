let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;


window.onload = function () {

  let verly = new Verly(8);

  let particles = new Entity();

  for (let i = 0; i < 1000; i++) {
    let p = new Point(random(width), random(height));
    p.setRadius(3);
    p.setMass(1);
    particles.addPoint(p)
  }

  let hexa = verly.createHexagon(100, 100, 32, 50, 10);
  hexa.points.forEach(e => e.setForceAcc(1.5));

  particles = verly.joinEntities(particles, hexa);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.points.length; i++) {
      for (let j = 0; j < particles.points.length; j++) {
        if (particles.points[i] !== particles.points[j]) {
          particles.points[j].behavior(particles.points[i], 20 * 90)
        }
      }
    }
    verly.update();

    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}