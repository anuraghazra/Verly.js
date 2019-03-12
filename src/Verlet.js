class Verlet {
  constructor(iterations) {
    this.points = [];
    this.sticks = [];
    this.iterations = iterations;
  }

  setVelocity(x, y) {
    // this.points[Math.floor(Math.random() * (this.points.length - 1))].oldpos.rotate(Math.random()/2);
    this.points.map(e => {
      e.oldpos.x += x;
      e.oldpos.y += y;
    })
  }
  addPoint(x, y, vx, vy) {
    let p = new Point(x, y, vx, vy);
    this.points.push(p);
    return p;
  }
  addStick(stick) {
    this.sticks.push(stick);
    // let s = new Stick(this.points[p1], this.points[p2]);
    // return s;
  }

  updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update();
    }
  }

  renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].render();
    }
  }

  updateSticks(stepCoef) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update(stepCoef);
    }
  }

  renderSticks() {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].render();
    }
  }

  updateContrains() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].constrain();
    }
  }

  renderPointsIndex() {
    for (let i = 0; i < this.points.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillText(i, this.points[i].pos.x + 5, this.points[i].pos.y - 6);
      ctx.closePath();
    }
  }

  update() {
    this.updatePoints();
    var stepCoef = 1 / this.iterations;
    console.log(stepCoef)
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks(stepCoef);
      this.updateContrains();
    }
    this.renderPoints();
    this.renderSticks();
  }

  static createBox(x, y, w, h) {
    const box = new Verlet(5);
    box.addPoint(x, y, 20, 0);
    box.addPoint(x + w, y, 20, 0);
    box.addPoint(x + w, y + h, 20, 0);
    box.addPoint(x, y + h, 20, 0);
    box.addStick(new Stick(box.points[0], box.points[1]))
    box.addStick(new Stick(box.points[1], box.points[2]))
    box.addStick(new Stick(box.points[2], box.points[3]))
    box.addStick(new Stick(box.points[3], box.points[0]))
    box.addStick(new Stick(box.points[3], box.points[1]))

    return box;
  }

  static createHexagon(x, y, segments) {
    const hexagon = new Verlet(5);

    var stride = (2 * Math.PI) / segments;
    let radius = 50;

    // points
    for (let i = 0; i < segments; ++i) {
      var theta = i * stride;
      hexagon.addPoint(
        x + Math.cos(theta) * radius,
        y + Math.sin(theta) * radius,
        0, 0
      );
    }

    let center = hexagon.addPoint(x, y, 0, 0);

    // sticks
    for (let i = 0; i < segments; ++i) {
      console.log(hexagon.points[(i + 1) % segments])
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + 1) % segments]));
      hexagon.addStick(new Stick(hexagon.points[i], center));
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + 5) % segments]));
    }
    console.log(hexagon);

    return hexagon;
  }
}