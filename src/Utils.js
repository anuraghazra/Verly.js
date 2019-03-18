let normalizedRandom = function () {
  return Math.random() * 2 - 1;
};
let degreesToRad = function (degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
let random = function (rand, min, max) {
  //one param
  if (arguments.length === 1) {
    return Math.random() * arguments[0];
  } else if (arguments.length == 2) {
    //min and max
    max = min;
    min = rand;
    rand = Math.random;
  }
  if (!min && !max) {
    return Math.random();
  } else if (!max) {
    //if only one is provided, then thats actually the max
    max = min;
    return rand() * max;
  }
  return rand() * (max - min) + min;
};

function lerp(a, b, p) {
  return (b - a) * p + a;
}