let canvas = document.getElementById('c');
let ctx = canvas.getContext('2d');
let width = 600;
let height = 600;
canvas.width = width;
canvas.height = height;

window.onload = function () {

  let verly = new Verly(16);

  class Cloth extends Entity {
    constructor(posx, posy, w, h, segments, pinOffset) {
      super();
      verly.dontPush = true;
      let c = verly.createCloth(posx, posy, w, h, segments, 2);
      this.points = c.points;
      this.sticks = c.sticks;

      this.segments = segments;
    }

    renderPoints() { } //nothing
    renderSticks() {
      let colorPos = Math.min(width, height) * 0.5 / this.segments;
      let x, y;
      for (y = 1; y < this.segments; ++y) {
        for (x = 1; x < this.segments; ++x) {
          ctx.beginPath();

          let i1 = (y - 1) * this.segments + x - 1;
          let i2 = (y) * this.segments + x;

          ctx.moveTo(this.points[i1].pos.x, this.points[i1].pos.y);
          ctx.lineTo(this.points[i1 + 1].pos.x, this.points[i1 + 1].pos.y);

          ctx.lineTo(this.points[i2].pos.x, this.points[i2].pos.y);
          ctx.lineTo(this.points[i2 - 1].pos.x, this.points[i2 - 1].pos.y);

          let off = this.points[i2].pos.x - this.points[i1].pos.x;
          off += this.points[i2].pos.y - this.points[i1].pos.y;
          off *= 0.25;
          let coef = Math.round((Math.abs(off) / colorPos) * 255);
          if (coef > 255)
            coef = 255;

          let color = "rgba(" + coef * 5 + "," + coef / 6 + "," + 0 + "," + lerp(0.25, 1, coef / 255.0) + ")";

          ctx.fillStyle = color;
          this.points.map(p => p.color = color);

          ctx.fill();
          ctx.closePath();
        }

      }
    }
  }

  let cloth = new Cloth(300, 100, 500, 500, 25, 2);
  verly.addEntity(cloth);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    verly.update();
    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}



//  END



  // Another Method For Overriding Render Methods ----------
  // let cloth = verly.createCloth(300, 100, 500, 500, 25, 2);
  // cloth.render = () => {
  //   let colorPos = Math.min(width, height) * 0.5 / 25;
  //   let x, y;
  //   for (y = 1; y < 25; ++y) {
  //     for (x = 1; x < 25; ++x) {
  //       ctx.beginPath();

  //       let i1 = (y - 1) * 25 + x - 1;
  //       let i2 = (y) * 25 + x;

  //       ctx.moveTo(cloth.points[i1].pos.x, cloth.points[i1].pos.y);
  //       ctx.lineTo(cloth.points[i1 + 1].pos.x, cloth.points[i1 + 1].pos.y);

  //       ctx.lineTo(cloth.points[i2].pos.x, cloth.points[i2].pos.y);
  //       ctx.lineTo(cloth.points[i2 - 1].pos.x, cloth.points[i2 - 1].pos.y);

  //       let off = cloth.points[i2].pos.x - cloth.points[i1].pos.x;
  //       off += cloth.points[i2].pos.y - cloth.points[i1].pos.y;
  //       off *= 0.25;
  //       let coef = Math.round((Math.abs(off) / colorPos) * 255);
  //       if (coef > 255)
  //         coef = 255;

  //       let color = "rgba(" + coef * 5 + "," + coef / 6 + "," + 0 + "," + lerp(0.25, 1, coef / 255.0) + ")";

  //       ctx.fillStyle = color;
  //       cloth.points.map(p => p.color = color);

  //       ctx.fill();
  //       ctx.closePath();
  //     }
  //   }
  // };

  // verly.createCloth(100, 100, 100, 100, 10);