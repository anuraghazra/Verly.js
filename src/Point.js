class Point {
  constructor(x, y, vx, vy) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x + vx, y + vy);
    this.bounce = 0.99;
    this.friction = 0.99;
    this.groundFriction = 0.8;
    this.gravity = new Vector(0, 1);
  }

  constrain() {
    // if (this.pos.y > height - 1) {
    //   this.pos.y = height - 1;
    // }
    // if (this.pos.x < 0) {
    //   this.pos.x = 0;
    // }
    // if (this.pos.x > width - 1) {
    //   this.pos.x = width - 1;
    // }
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);

    if (this.pos.x > width) {
      this.pos.x = width;
      this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    } else if (this.pos.x < 0) {
      this.pos.x = 0;
      this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.y > height) {
      this.pos.y = height;
      this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    } else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
  };

  update() {
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);
    // if the point touches the ground set groundFriction
    if (this.pos.y >= height - 1 && vel.magSq() > 0.000001) {
      var m = vel.mag();
      vel.x /= m;
      vel.y /= m;
      vel.mult(m * this.groundFriction);
    }
    this.oldpos.setXY(this.pos.x, this.pos.y);
    this.pos.add(this.gravity);
    this.pos.add(vel);
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}