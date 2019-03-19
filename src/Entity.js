class Entity {
  constructor(iterations) {
    this.points = [];
    this.sticks = [];
    this.iterations = iterations || 16;
  }

  setGravity(g) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].setGravity(g);
    }
  }

  pin(index) {
    this.points[index].pin();
  }

  removeSticks(p) {
    this.sticks.splice(this.sticks.indexOf(p.sticks[0]), 1);
    p.sticks.splice(0, 1);
  }

  setVelocity(x, y) {
    this.points.map(e => {
      e.oldpos.x += x;
      e.oldpos.y += y;
    })
  }

  addPoint(x, y, vx, vy, radius) {
    let p
    if (x instanceof Point) {
      p = x;
    } else {
      p = new Point(x, y, vx, vy, radius);
    }
    this.points.push(p);
    return p;
  }

  addStick(p1, p2, length) {
    let s;
    if (p1 instanceof Stick) {
      this.sticks.push(p1);
    } else {
      this.sticks.push(new Stick(this.points[p1], this.points[p2], length));
    }
    return s;
  }

  updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update();
    }
  }

  updateSticks(stepCoef) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update(stepCoef);
    }
  }

  renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].render();
    }
  }
  
  updateContrains() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].constrain();
    }
  }

  renderSticks() {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].render();
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
    var stepCoef = 1 / this.iterations;
    this.updatePoints();
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks(stepCoef);
      this.updateContrains();
    }
    this.renderPoints();
    this.renderSticks();
    this.render && this.render();
  }
}