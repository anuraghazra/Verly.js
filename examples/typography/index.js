/**
 * Verlet Typography
 * @author <hazru.anurag@gmail.com>
 */
let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 900;
let height = 500;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(50);

  let word = new Text('VERLY', 200, 100, 25);

  // let A = new TypoGraphy(offsetX, center, 20, 'A');

  verly.addEntity(word.entity);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();
    // word.entity.renderPointsIndex()
    // verly.renderPointIndex();
    // word.entity.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}