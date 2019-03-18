let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 900;
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

  let verly = new Verly(50);

  // ASKBUDDIE
  let center = height / 2 - 100;
  let offsetX = 80;

  let A = new TypoGraphy(offsetX, center, 20, 'A');
  let S = new TypoGraphy(offsetX + 100, center, 20, 'S');
  let K = new TypoGraphy(offsetX + 170, center, 20, 'K');
  let B = new TypoGraphy(offsetX + 250, center, 20, 'B');
  let U = new TypoGraphy(offsetX + 350, center, 20, 'U');
  let D = new TypoGraphy(offsetX + 450, center, 20, 'D');
  let D2 = new TypoGraphy(offsetX + 530, center, 20, 'D');
  let I = new TypoGraphy(offsetX + 600, center, 20, 'I');
  let E = new TypoGraphy(offsetX + 670, center, 20, 'E');

  
  // verly.createCloth(200, 200, 200, 200, 10, 3)
  let rope = verly.createRope(100, 100, 50, 15, 0);
  rope.pin(rope.points.length - 1);
  rope.pin(rope.points.length / 2);
  let allLetters = [
    A.text,
    S.text,
    K.text,
    B.text,
    U.text,
    D.text,
    D2.text,
    I.text,
    E.text,
    rope
  ]


  let mix = verly.joinEntities.apply(verly, allLetters);

  mix.addStick(5, 143) //A
  mix.addStick(21, 150) //S
  // mix.addStick(29, 155) //K
  mix.addStick(34, 155) //K
  mix.addStick(48, 160) //B
  mix.addStick(64, 168, 110) //U
  mix.addStick(71, 168) //U
  mix.addStick(85, 174) //D
  mix.addStick(102, 179) //D2
  mix.addStick(118, 184) //I
  mix.addStick(127, 188) //E
  mix.addStick(137, 188) //E
  

  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}