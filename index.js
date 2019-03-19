let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 600;
canvas.width = width;
canvas.height = height;

function make2dArray(rows, cols) {
  let arr = new Array(rows);
  for (let x = 0; x < rows; x++) {
    arr[x] = [];
    for (let y = 0; y < cols; y++) {
      arr[x][y] = 0;
    }
  }
  return arr;
}

window.onload = function () {

  let verly = new Verly(16);


  let particle = new Entity();

  let p1 = new Point(200, 200);
  p1.setRadius(20);
  let p2 = new Point(200, 200);
  p2.setRadius(20);
  particle.addPoint(p1);
  particle.addPoint(p2);

  for (let i = 0; i < 400; i++) {
    particle.addPoint(random(width), random(height));
  }
  particle.addStick(0, 1, 200)

  particle.setGravity(new Vector(0, 0));

  verly.addEntity(particle);
  p1.setGravity(new Vector(0, 0.0));
  
  let angle = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    angle += 1
    // particle.update();
    for (let i = 0; i < particle.points.length; i++) {
      if (i !== 0 || i !== 1) {
        particle.points[i].pos.jitter(0.5)
      }
      particle.points[i].resolveBehaviors(particle.points[0], width / 2, -0.8);
      particle.points[i].resolveBehaviors(particle.points[0], 100, 5);
      particle.points[i].resolveBehaviors(particle.points[1], width / 2, -0.8);
      particle.points[i].resolveBehaviors(particle.points[1], 100, 5);
      for (let j = 0; j < particle.points.length; j++) {
        if (i !== 0 || i !== 1) {
          particle.points[i].resolveBehaviors(particle.points[j], p1.radius, 3);
        }
      }
    }
    verly.update();

    p1.pos.x = 200 + 50 * Math.cos(angle * 0.1);
    p1.pos.y = 200 + 50 * Math.sin(angle * 0.1);
    p2.pos.x = 350 + 100 * Math.cos(angle * -0.1);
    p2.pos.y = 350 + 100 * Math.sin(angle * -0.1);
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
