let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 500;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(16);

  let custom = new Entity(16);

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    return false;
  })
  window.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.button !== 2) return;

    let p = new Point(e.offsetX, e.offsetY);
    p.addBehavior(new Behavior());
    custom.addPoint(p);
    if (custom.points.length > 1) {
      custom.addStick(custom.points.length - 2, custom.points.length - 1);
    }
  })

  verly.createRagdoll(100, 100, 100, 100);
  verly.addEntity(custom);
  function animate() {
    ctx.clearRect(0, 0, width, height);


    verly.update();
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}