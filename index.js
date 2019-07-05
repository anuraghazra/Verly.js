window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  let width = 600;
  let height = 600;
  canvas.width = width;
  canvas.height = height;

  let verly = new Verly(16, canvas, ctx);

  let cloth = verly.createCloth(200, 200, 300, 300, 20, 2);
  // let ragdoll = verly.createRagdoll(100, 100);
  let box = verly.createBox(100, 100, 100, 100);
  
  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();
    verly.render();
    verly.interact();

    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
