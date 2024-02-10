import Vector from "./Vector.js";


class Entity {
  /**
   * @param {number} iterations
   * @param {Verly} verlyInstance
   */
  constructor(iterations, verlyInstance, name) {
    this.points = [];
    this.sticks = [];
    this.domNodes = [];
    this.name = name;
    this.verlyInstance = verlyInstance;
    this.iterations = iterations || 16;
  }

  /**
   * @param {HTMLElement} node
   * @param {typeof import('./Vector')} p
   */
  updateDOMNodePosition(node, p) {
    if (!node) return;
    node.style.left = `${p.pos.x}px`;
    node.style.top = `${p.pos.y - 1}px`;
  }

  findActiveFocusedNode() {
    let nodeId = document.activeElement.getAttribute("data-nodeid");
    if (!nodeId) return null;

    const foundNode = this.points.find((p) => p.uid === nodeId);
    if (!foundNode) return null;

    return foundNode;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeyDown(event) {
    const foundNode = this.findActiveFocusedNode();
    if (!foundNode) return;

    const isFaster = !!event.shiftKey;
    const velocityMultiplier = isFaster ? 5 : 1;
    const keyMap = {
      ArrowLeft: () => {
        this.setVelocityToPoint(foundNode, -velocityMultiplier, 0);
      },
      ArrowRight: () => {
        this.setVelocityToPoint(foundNode, velocityMultiplier, 0);
      },
      ArrowUp: () => {
        this.setVelocityToPoint(foundNode, 0, -velocityMultiplier);
      },
      ArrowDown: () => {
        this.setVelocityToPoint(foundNode, 0, velocityMultiplier);
      },
    };

    if (keyMap[event.key]) {
      foundNode.pin();
      keyMap[event.key]();
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeyUp(event) {
    const foundNode = this.findActiveFocusedNode();
    if (!foundNode) return;

    foundNode.resetVelocity();
    if (event.key === ' ') {
      foundNode.unpin()
    }
  }

  setupAccessibility() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.points.forEach((p, i) => {
      let node = document.createElement("div");
      node.tabIndex = 0;
      node.setAttribute("data-nodeid", p.uid);
      node.setAttribute("aria-label", `Point of ${this.name}, use arrow keys to move point, press space to unpin`);
      node.classList.add("point");
      this.updateDOMNodePosition(node, p);
      document.body.appendChild(node);
      this.domNodes.push(node);
    });
  }

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
   * @param {typeof import('./Point').default} point
   * @param {Number} x
   * @param {Number} y
   */
  setVelocityToPoint(point, x, y) {
    point.applyForce(new Vector(x, y));
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   */
  setVelocity(x, y) {
    this.points.map((e) => {
      e.oldpos.x += x;
      e.oldpos.y += y;
    });
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
    let uid = generateUUID();
    let p;
    if (x instanceof Point) {
      p = x;
    } else {
      p = new Point(x, y, vx, vy, radius);
    }
    p.uid = uid;
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
      stick = new Stick(
        this.points[p1],
        this.points[p2],
        length,
        stiffness,
        ishidden
      );
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
      stick = new AngleStick(
        this.points[p1],
        this.points[p2],
        this.points[p3],
        stiffness
      );
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
      this.updateDOMNodePosition(this.domNodes[i], this.points[i]);
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
      this.verlyInstance.ctx.fillStyle = "black";
      this.verlyInstance.ctx.fillText(
        i,
        this.points[i].pos.x + 5,
        this.points[i].pos.y - 6
      );
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


function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


export default Entity;

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
