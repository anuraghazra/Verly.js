/**
 * @class Verly
 */
class Verly {
  constructor(iterations) {
    this.entities = [];
    this.iterations = iterations;

    this.mouse = new Mouse(this.entities);
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
    return mixEntity; // return for chaining
  }

  addEntity(e) {
    this.entities.push(e);
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

    this.mouse.drag();
  }




  /**
   * @method createBox
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
    box.addStick(0, 1);
    box.addStick(1, 2);
    box.addStick(2, 3);
    box.addStick(3, 0);
    box.addStick(3, 1);

    this.addEntity(box);
    return box;
  }


  /**
   * @method createHexagon
   * @param {number} x 
   * @param {number} y 
   * @param {number} segments 
   * @param {number} radius=50
   * @param {number} stride1=1
   * @param {number} stride2=5
   */
  createHexagon(x, y, segments, radius = 50, stride1 = 1, stride2 = 5) {
    const hexagon = new Entity(this.iterations);

    var stride = (2 * Math.PI) / segments;

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
      hexagon.addStick(i, (i + stride1) % segments);
      hexagon.addStick(new Stick(hexagon.points[i], center));
      hexagon.addStick(i, (i + stride2) % segments);
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
        cloth.addPoint(px, py);

        if (x > 0) {
          cloth.addStick(y * segments + x, y * segments + x - 1);
        }

        if (y > 0) {
          cloth.addStick(y * segments + x, (y - 1) * segments + x);
        }
      }
    }

    // as the name suggest
    function tear(threshold) {
      for (let i = 0; i < cloth.sticks.length; i++) {
        // find the distance between two points
        let dist = cloth.sticks[i].startPoint.pos.dist(cloth.sticks[i].endPoint.pos)
        if (dist > (threshold || 20)) { // remove if the dist is > than threshold 
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
      rope.addStick(i, (i + 1) % segments);
    }
    this.addEntity(rope);
    return rope;
  }


  createRagdoll(x0, y0) {
    let ragdoll = new Entity(this.iterations);

    // Head
    // x, y, extremity, gravity, radius
    // var h = ;
    // h.head = true;
    // h.oldx = x0 + (Math.random() - 0.5) * 25;

    let head = new Point(x0, y0, 0, 0, 15);
    head.setMass(5);
    ragdoll.addPoint(head);

    // Groin
    ragdoll.addPoint(x0, y0 + 100);

    // Hips
    ragdoll.addPoint(x0 + 30, y0 + 90);
    ragdoll.addPoint(x0 - 30, y0 + 90);

    // Knees
    ragdoll.addPoint(x0 + 20, y0 + 150);
    ragdoll.addPoint(x0 - 20, y0 + 150);

    // Feet
    let f1 = new Point(x0 + 30, y0 + 190, 0, 0, 10);
    let f2 = new Point(x0 - 30, y0 + 190, 0, 0, 10);
    f1.setMass(20);
    f2.setMass(20);
    ragdoll.addPoint(f1);
    ragdoll.addPoint(f2);

    // Neck
    ragdoll.addPoint(x0, y0 + 25);

    // Shoulders
    ragdoll.addPoint(x0 + 25, y0 + 30);
    ragdoll.addPoint(x0 - 25, y0 + 30);

    // Hands
    let h1 = new Point(x0 + 15, y0 + 105, 0, 0, 10);
    let h2 = new Point(x0 - 15, y0 + 105, 0, 0, 10);
    h1.setMass(5);
    h2.setMass(5);
    ragdoll.addPoint(h1);
    ragdoll.addPoint(h2);



    // "Muscles"
    // Head - shoulders
    ragdoll.addStick(0, 9);
    ragdoll.addStick(0, 10);
    // Shoulder - shoulder
    ragdoll.addStick(9, 10);

    // Shoulders - hips
    ragdoll.addStick(9, 2);
    ragdoll.addStick(10, 3);
    // Shoulders - hips opposite side
    ragdoll.addStick(9, 3);
    ragdoll.addStick(10, 2);

    // Hips - feet
    ragdoll.addStick(2, 6);
    ragdoll.addStick(3, 7);

    // Hips - feet, opposite
    ragdoll.addStick(2, 7);
    ragdoll.addStick(3, 6);

    // Head - groin
    ragdoll.addStick(0, 1);

    // Hip - hip
    ragdoll.addStick(2, 3);
    // Shoulder - hip
    ragdoll.addStick(9, 2);
    ragdoll.addStick(10, 3);

    // Head - knee
    ragdoll.addStick(0, 4);
    // Head - knee
    ragdoll.addStick(0, 5);

    // Head feet
    ragdoll.addStick(0, 6);
    ragdoll.addStick(0, 7);

    // Body parts
    // Hips
    ragdoll.addStick(1, 2);
    ragdoll.addStick(1, 3);
    // Legs
    ragdoll.addStick(2, 4);
    ragdoll.addStick(3, 5);
    ragdoll.addStick(4, 6);
    ragdoll.addStick(5, 7);

    ragdoll.addStick(0, 8);
    ragdoll.addStick(8, 1);

    // Left arm
    ragdoll.addStick(8, 9);
    ragdoll.addStick(9, 11);

    // Right arm
    ragdoll.addStick(8, 10);
    ragdoll.addStick(10, 12);

    this.addEntity(ragdoll);
    return ragdoll;
  }
}
