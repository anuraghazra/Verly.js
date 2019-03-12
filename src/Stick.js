class Stick {
  constructor(p1, p2, stiffness, length) {
    this.startPoint = p1;
    this.endPoint = p2;
    this.stiffness = stiffness || 1;
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
    // this.startPoint.pos.x -= offsetx;
    // this.startPoint.pos.y -= offsety; 
    // this.endPoint.pos.x += offsetx;
    // this.endPoint.pos.y += offsety;
    // ----- algo two

    var normal = Vector.sub(this.startPoint.pos, this.endPoint.pos);
    var m = normal.magSq();
    let diff = ((this.length * this.length) - m);
    normal.mult((diff / m) * this.stiffness * stepCoef);
    this.startPoint.pos.add(normal);
    this.endPoint.pos.sub(normal);
  }

  render() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}