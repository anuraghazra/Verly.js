class Entity {

  /**
   * @param {number} iterations 
   * @param {Verly} verlyInstance 
   */
  constructor(iterations, verlyInstance) {
    this.points = [];
    this.sticks = [];
    this.verlyInstance = verlyInstance;
    this.iterations = iterations || 16;
  }


  // join(...args) {
  //   let points = [];
  //   let sticks = [];

  //   // loop through the args and push points and sticks to the array
  //   for (let i = 0; i < args.length; i++) {
  //     points.push(args[i].points);
  //     sticks.push(args[i].sticks);
  //   }

  //   // join multiple arrays
  //   points = [].concat.apply([], points);
  //   sticks = [].concat.apply([], sticks);

  //   // add the arrays to the mix::Entity
  //   this.points = points;
  //   this.sticks = sticks;

  //   return this; // return for chaining
  // }

  /**
   * sets the gravity of this entity
   * @param {Vector} g 
   */
  setGravity(g) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].setGravity(g);
    }
  }

  /**
   * sets the friction of this entity
   * @param {number} f 
   */
  setFriction(f) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].setFriction(f);
    }
  }

  /**
   * pin a specific Point
   * @param {number} index 
   */
  pin(index) {
    this.points[index].pin();
  }

  /**
   * remove a specific Point
   * @param {Point} p
   */
  removeSticks(p) {
    this.sticks.splice(this.sticks.indexOf(p.sticks[0]), 1);
    p.sticks.splice(0, 1);
  }

  /**
   * 
   * @param {Number} x 
   * @param {Number} y 
   */
  setVelocity(x, y) {
    this.points.map(e => {
      e.oldpos.x += x;
      e.oldpos.y += y;
    })
  }

  /**
   * adds a Point in points array with {x,y,vx,vy,radius}
   * @param {Number|Point} x 
   * @param {Number=} y 
   * @param {Number=} vx 
   * @param {Number=} vy 
   * @param {Number=} radius 
   * @returns {Point}
   */
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

  /**
   * adds a stick inbetween two points
   * @param {number|Point} p1 
   * @param {number|Point=} p2 
   * @param {number=} length 
   * @param {number=} stiffness 
   * @param {boolean=} ishidden 
   */
  addStick(p1, p2, length, stiffness, ishidden) {
    let stick;
    if (p1 instanceof Stick) {
      stick = p1;
    } else {
      stick = new Stick(this.points[p1], this.points[p2], length, stiffness, ishidden);
    }
    this.sticks.push(stick);
    return stick;
  }

  /**
   * adds a AngleStick in between 3 points
   * @param {Point} p1
   * @param {Point} p2
   * @param {Point} p3
   * @param {number} stiffness
   * @returns {AngleStick}
   */
  addAngleStick(p1, p2, p3, stiffness) {
    let stick;
    if (p1 instanceof AngleStick) {
      stick = p1;
    } else {
      stick = new AngleStick(this.points[p1], this.points[p2], this.points[p3], stiffness);
    }
    this.sticks.push(stick);
    return stick;
  }

  /**
   * 
   */
  updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update(this.verlyInstance);
    }
  }

  /**
   * @methdo updateSticks
   * @param {Number=} stepCoef 
   */
  updateSticks(stepCoef) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update(stepCoef);
    }
  }

  /**
   */
  updateConstraints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].constrain(this.verlyInstance);
    }
  }

  /**
   */
  update() {
    // var stepCoef = 1 / this.iterations;
    this.updatePoints();
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks();
      this.updateConstraints();
    }
  }

  /**
   */
  renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].render(this.verlyInstance.ctx);
    }
  }

  /**
   */
  renderSticks() {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].render(this.verlyInstance.ctx);
    }
  }

  /**
   */
  renderPointIndex() {
    for (let i = 0; i < this.points.length; i++) {
      this.verlyInstance.ctx.beginPath();
      this.verlyInstance.ctx.fillStyle = 'black';
      this.verlyInstance.ctx.fillText(i, this.points[i].pos.x + 5, this.points[i].pos.y - 6);
      this.verlyInstance.ctx.closePath();
    }
  }


  /**
   */
  render() {
    this.renderPoints();
    this.renderSticks();
  }
}

export default Entity;