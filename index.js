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

  let box = verly.createBox(100, 200, 100, 100);


  let cloth = verly.createCloth(200, 200, 200, 200, 10, 9);


  let mouse = new Vector();
  window.addEventListener('mousemove', function (e) {
    mouse = new Vector(e.offsetX, e.offsetY);
  })


  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();

    box.setGravity(new Vector((mouse.x - box.points[0].pos.x - 50) / 500, (mouse.y - box.points[0].pos.y - 50) / 500));
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
