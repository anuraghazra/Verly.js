class Stick {
  constructor(p1, p2, stiffness, length) {
    this.startPoint = p1;
    this.endPoint = p2;
    this.stiffness = stiffness || 1;
    this.color = '#f5476a';
    if (!length) {
      this.length = this.startPoint.pos.dist(this.endPoint.pos);
    } else {
      this.length = length;
    }

  }

  update(stepCoef) {
    // not gonna use vectors for performance optimization
    // let dx = this.endPoint.pos.x - this.startPoint.pos.x;
    // let dy = this.endPoint.pos.y - this.startPoint.pos.y;
    // let dist = Math.sqrt(dx * dx + dy * dy);
    // let diff = this.length - dist;
    // let percent = diff / dist / 2;
    // let offsetx = (dx * percent);
    // let offsety = (dy * percent);
    // if (!this.startPoint.pinned) {
    //   this.startPoint.pos.x -= offsetx;
    //   this.startPoint.pos.y -= offsety;
    // }
    // if (!this.endPoint.pinned) {
    //   this.endPoint.pos.x += offsetx;
    //   this.endPoint.pos.y += offsety;
    // }
    // ----- algo two

    // algo three
    let dx = this.endPoint.pos.x - this.startPoint.pos.x;
    let dy = this.endPoint.pos.y - this.startPoint.pos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let diff = (this.length - dist) / dist;

    // if (dist > tear_distance) this.p1.remove_constraint(this);
    var offsetx = dx * diff * 0.5;
    var offsety = dy * diff * 0.5;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x -= offsetx;
      this.startPoint.pos.y -= offsety;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x += offsetx;
      this.endPoint.pos.y += offsety;
    }

    // var normal = Vector.sub(this.startPoint.pos, this.endPoint.pos);
    // var m = normal.magSq();
    // let diff = ((this.length * this.length) - m);
    // normal.mult((diff / m) * this.stiffness * stepCoef);

    // if (!this.startPoint.pinned) {
    //   this.startPoint.pos.add(normal);
    // }
    // if (!this.endPoint.pinned) {
    //   this.endPoint.pos.sub(normal);
    // }
  }

  render() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}