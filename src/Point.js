class Point {
  constructor(x, y, vx, vy, radius) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x + (vx || 0), y + (vy || 0));
    this.bounce = 0.99;
    this.friction = 0.97;
    this.groundFriction = 0.8;
    this.gravity = new Vector(0, 1);
    this.pinned = false;
    this.radius = radius || 5;
    this.color = '#e62a4f';
    this.mass = 1;
    this.sticks = [];
    // this.behaviors = [];
    this.forceAcc = 1;
  }

  setGravity(g) {
    this.gravity = g;
  }
  setForceAcc(f) {
    this.forceAcc = f;
  }
  setMass(m) {
    this.mass = m;
  }
  setRadius(radius) {
    this.radius = radius;
  }

  resetVelocity() {
    this.oldpos.setXY(this.pos.x, this.pos.y);
  }
  pin() {
    this.pinned = true;
  }
  unpin() {
    this.pinned = false;
  }

  rotate(angle, offset) {
    let x = offset.x + (this.pos.x - offset.x) * Math.cos(angle) - (this.pos.y - offset.y) * Math.sin(angle);
    let y = offset.y + (this.pos.x - offset.x) * Math.sin(angle) + (this.pos.y - offset.y) * Math.cos(angle);
    this.pos.setXY(x, y);
  }

  resolveBehaviors(p, radius, strength) {
    var delta = Vector.sub(this.pos, p.pos);
    var dist = delta.magSq();

    let magR = (!radius) ? (this.radius * this.radius) : (radius * radius);
    if (dist < magR) {
      var f = delta.normalizeTo(1 - (dist / magR)).mult(strength || this.forceAcc);
      this.applyForce(f);
    }
  }

  applyForce(f) {
    this.pos.add(f);
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
    // let vel = Vector.sub(this.pos, this.oldpos);
    if (this.pos.x > width - this.radius) {
      this.pos.x = width - this.radius;
      // this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      // this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.y > height - this.radius) {
      this.pos.y = height - this.radius;
      // this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      // this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
  };


  update() {
    if (this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);
    // if the point touches the ground set groundFriction
    if (this.pos.y >= height - this.radius && vel.magSq() > 0.000001) {
      var m = vel.mag();
      vel.x /= m;
      vel.y /= m;
      vel.mult(m * this.groundFriction);
    }
    this.oldpos.setXY(this.pos.x, this.pos.y);
    this.pos.add(vel);
    this.pos.add(this.gravity);
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}