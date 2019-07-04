/**
 * @class Entity
 */
export default class Entity {
  /**
   * 
   * @param {Number} iterations 
   */
  constructor(iterations) {
    this.points = [];
    this.sticks = [];
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
   * @method setGravity
   * @param {Vector} g 
   */
  setGravity(g) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].setGravity(g);
    }
  }

  /**
   * @method pin
   * @param {Number} index 
   */
  pin(index) {
    this.points[index].pin();
  }

  /**
   * @method removeSticks
   * @param {Point} p
   */
  removeSticks(p) {
    this.sticks.splice(this.sticks.indexOf(p.sticks[0]), 1);
    p.sticks.splice(0, 1);
  }
  
  /**
   * @method setVelocity
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
   * @ethod addPoint
   * @param {Number|Point} x 
   * @param {Number?} y 
   * @param {Number?} vx 
   * @param {Number?} vy 
   * @param {Number?} radius 
   * @description adds a Point in points array with {x,y,vx,vy,radius}
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
   * 
   * @param {Number|Stick} p1 
   * @param {Number} p2 
   * @param {Number} length 
   */
  addStick(p1, p2, length) {
    // let s;
    // return s;
    if (p1 instanceof Stick) {
      this.sticks.push(p1);
    } else {
      this.sticks.push(new Stick(this.points[p1], this.points[p2], length));
    }
  }

  /**
   * @method updatePoints
   */
  updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update();
    }
  }

  /**
   * @methdo updateSticks
   * @param {Number} stepCoef 
   */
  updateSticks(stepCoef) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update(stepCoef);
    }
  }
  
  /**
   * @method updateContrains
   */
  updateContrains() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].constrain();
    }
  }
  
  /**
   * @method update
   */
  update() {
    // var stepCoef = 1 / this.iterations;
    this.updatePoints();
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks();
      this.updateContrains();
    }
  }

  /**
   * @method renderPoints
   */
  renderPoints(ctx) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].render(ctx);
    }
  }

  /**
   * @method renderSticks
   */
  renderSticks(ctx) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].render(ctx);
    }
  }

  /**
   * @method renderPointIndex
   */
  renderPointIndex(ctx) {
    for (let i = 0; i < this.points.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillText(i, this.points[i].pos.x + 5, this.points[i].pos.y - 6);
      ctx.closePath();
    }
  }


  /**
   * @method render
   */
  render(ctx) {
    this.renderPoints(ctx);
    this.renderSticks(ctx);
  }
}