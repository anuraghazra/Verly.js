class Verlet {
  constructor(iterations) {
    this.entities = [];
    this.iterations = iterations;
    
    
    // Drag Interaction
    this.draggedPoint = null;
    this.mouseDown = false;
    this.mouse = new Vector();
    canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
      this.draggedPoint = this.getNearestPoint();
      if (this.draggedPoint) {
        this.dragPoint();
      }
    })
    canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
      this.draggedPoint = null;
    })
    canvas.addEventListener('mousemove', (e) => {
      this.mouse.setXY(e.offsetX, e.offsetY);
    })
  }

  /**
   * Joins two Entity Class Together
   * @param  {...Entity} args 
   */
  joinEntities(...args) {
    let mixEntity = new Entity();

    let points = [];
    let sticks = [];

    // loop through the args and push points and sticks to the array
    for (let i = 0; i < args.length; i++) {
      points.push(args[i].points);
      sticks.push(args[i].sticks);

      // get the index which item we should splice in [this.entities]
      let index = this.entities.indexOf(args[i]);
      this.entities.splice(index, 1);
    }

    // join multiple arrays
    points = [].concat.apply([], points);
    sticks = [].concat.apply([], sticks);

    // add the arrays to the mix::Entity
    mixEntity.points = points;
    mixEntity.sticks = sticks;

    // add the mix::Entity to [this.entities]
    this.addEntity(mixEntity);
    console.log(this)
    return mixEntity; // return for chaining
  }

  addEntity(e) {
    this.entities.push(e);
  }

  getNearestPoint() {
    // if (!this.mouseDown) return false;
    let d = 20;
    let p = null;
    for (let k = 0; k < this.entities.length; k++) {
      for (let i = 0; i < this.entities[k].points.length; i++) {
        let dist = this.entities[k].points[i].pos.dist(this.mouse);
        if (dist < d) {
          p = this.entities[k].points[i];
        }
      }
    }
    return p;
  }

  dragPoint() {
    this.draggedPoint.pos.setXY(this.mouse.x, this.mouse.y)
  }

  renderDraggedPoint(point) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.arc(point.pos.x, point.pos.y, point.radius * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }


  renderPointIndex() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].renderPointsIndex();
    }
  }

  /**
   * @method update
   * updates all the physics stuff
   */
  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    if (!this.mouseDown) {
      let nearp = this.getNearestPoint();
      nearp && this.renderDraggedPoint(nearp);
    }
    if (this.draggedPoint) {
      this.renderDraggedPoint(this.draggedPoint);
      this.dragPoint();
    }
  }




  /**
   * @mthod createBox
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   */
  createBox(x, y, w, h) {
    const box = new Entity(this.iterations);
    box.addPoint(x, y, 0, 0);
    box.addPoint(x + w, y, 0, 0);
    box.addPoint(x + w, y + h, 0, 0);
    box.addPoint(x, y + h, 0, 0);
    box.addStick(new Stick(box.points[0], box.points[1]))
    box.addStick(new Stick(box.points[1], box.points[2]))
    box.addStick(new Stick(box.points[2], box.points[3]))
    box.addStick(new Stick(box.points[3], box.points[0]))
    box.addStick(new Stick(box.points[3], box.points[1]))

    this.addEntity(box);
    return box;
  }


  /**
   * @method createHexagon
   * @param {number} x 
   * @param {number} y 
   * @param {number} segments 
   * @param {number} stride1=1
   * @param {number} stride2=5
   */
  createHexagon(x, y, segments, stride1 = 1, stride2 = 5) {
    const hexagon = new Entity(this.iterations);

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
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + stride1) % segments]));
      hexagon.addStick(new Stick(hexagon.points[i], center));
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + stride2) % segments]));
    }


    this.addEntity(hexagon);
    return hexagon;
  }

  /**
   * @method createCloth
   * @param {number} posx 
   * @param {number} posy 
   * @param {number} w 
   * @param {number} h 
   * @param {number} segments 
   * @param {number} pinOffset 
   */
  createCloth(posx, posy, w, h, segments, pinOffset) {
    let cloth = new Entity(this.iterations);

    var xStride = w / segments;
    var yStride = h / segments;

    var x, y;
    for (y = 0; y < segments; ++y) {
      for (x = 0; x < segments; ++x) {
        var px = posx + x * xStride - w / 2 + xStride / 2;
        var py = posy + y * yStride - h / 2 + yStride / 2;
        cloth.addPoint(px, py, 0, 0);

        if (x > 0) {
          cloth.addStick(new Stick(cloth.points[y * segments + x], cloth.points[y * segments + x - 1]));
        }

        if (y > 0) {
          cloth.addStick(new Stick(cloth.points[y * segments + x], cloth.points[(y - 1) * segments + x]));
        }
      }
    }

    // as the name suggest
    function tear() {
      for (let i = 0; i < cloth.sticks.length; i++) {
        // find the distance between two points
        let dist = cloth.sticks[i].startPoint.pos.dist(cloth.sticks[i].endPoint.pos)
        if (dist > 18) { // remove if the dist is > than threshold 
          cloth.removeSticks(cloth.sticks[i].startPoint);
        }
      }
    }

    cloth.tear = tear;

    for (x = 0; x < segments; ++x) {
      if (x % pinOffset == 0) { // magic
        cloth.pin(x);
      }
    }

    console.log(cloth)
    this.addEntity(cloth);
    return cloth;
  }


  /**
   * @method createRope
   * @param {number} x 
   * @param {number} y 
   * @param {number} segments=10
   * @param {number} gap=15
   */
  createRope(x, y, segments = 10, gap = 15) {
    let rope = new Entity(this.iterations);

    for (let i = 0; i < segments; i++) {
      rope.addPoint(x + i * gap, y, 0, 0)
    }

    for (let i = 0; i < segments - 1; i++) {
      rope.addStick(new Stick(rope.points[i], rope.points[(i + 1) % segments]));
    }
    this.addEntity(rope);
    return rope;
  }
}