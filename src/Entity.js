class Entity {
  constructor() {
    this.points = [];
    this.sticks = [];
    this.iterations = 16;
  }
  
  pin(index) {
    this.points[index].pin();
  }
  setVelocity(x, y) {
    // this.points[Math.floor(Math.random() * (this.points.length - 1))].oldpos.rotate(Math.random() / 10);
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
    var stepCoef = 1 / this.iterations;
    this.updatePoints();
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks(stepCoef);
      this.updateContrains();
    }
    this.renderPoints();
    this.renderSticks();
  }
}