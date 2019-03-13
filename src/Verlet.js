class Verlet {
  constructor(iterations) {
    this.entities = [];
    this.iterations = iterations;
    this.draggedPoint = null;

    this.mouseDown = false;
    this.mouse = new Vector();
    canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
      this.getNearestPoint();
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

  getNearestPoint() {
    // if (!this.mouseDown) return false;
    let d = 20;
    let p = null;
    for (let k = 0; k < this.entities.length; k++) {
      for (let i = 0; i < this.entities[k].points.length; i++) {
        let dist = this.entities[k].points[i].pos.dist(this.mouse);
        if (dist < d) {
          this.draggedPoint = this.entities[k].points[i];
          p = this.draggedPoint;
        }
      }
    }
    return p;
  }

  dragPoint() {
    this.draggedPoint.pos.setXY(this.mouse.x, this.mouse.y)
  }


  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
    if (this.draggedPoint) {
      this.dragPoint();
    }
  }





  createBox(x, y, w, h) {
    const box = new Entity();
    box.addPoint(x, y, 0, 0);
    box.addPoint(x + w, y, 0, 0);
    box.addPoint(x + w, y + h, 0, 0);
    box.addPoint(x, y + h, 0, 0);
    box.addStick(new Stick(box.points[0], box.points[1]))
    box.addStick(new Stick(box.points[1], box.points[2]))
    box.addStick(new Stick(box.points[2], box.points[3]))
    box.addStick(new Stick(box.points[3], box.points[0]))
    box.addStick(new Stick(box.points[3], box.points[1]))

    this.entities.push(box);
    return box;
  }

  createHexagon(x, y, segments) {
    const hexagon = new Entity(5);

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
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + 1) % segments]));
      hexagon.addStick(new Stick(hexagon.points[i], center));
      hexagon.addStick(new Stick(hexagon.points[i], hexagon.points[(i + 5) % segments]));
    }


    this.entities.push(hexagon);
    return hexagon;
  }


  createCloth(posx, posy, w, h, segments, pinOffset) {
    let cloth = new Entity();

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

    for (x = 0; x < segments; ++x) {
      if (x % pinOffset == 0) {
        cloth.points[x].pin();
      }
    }

    this.entities.push(cloth);
    return cloth;
  }
}