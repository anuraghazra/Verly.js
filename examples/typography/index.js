/**
 * Verlet Typography
 * @author <hazru.anurag@gmail.com>
 */
let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 1200;
let height = 500;
canvas.width = width;
canvas.height = height;

window.onload = function () {
  let verly = new Verly(50);

  var url = new URL(window.location.href);
  var query_string = url.search;
  var search_params = new URLSearchParams(query_string);
  var urlText = search_params.get('text') || 'HAPPY';
  var urlText2 = search_params.get('text2') || 'HOLI';

  let word = new Text(urlText, 50, 100, 25);
  let word2 = new Text(urlText2, 700, 100, 25);

  // let A = new TypoGraphy(offsetX, center, 20, 'A');

  verly.addEntity(word.entity);
  verly.addEntity(word2.entity);

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