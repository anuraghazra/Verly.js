class Point {
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number=} vx 
   * @param {number=} vy 
   * @param {number=} radius 
   */
  constructor(x, y, vx, vy, radius) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x + (vx || 0), y + (vy || 0));
    this.bounce = 0.99;
    this.friction = 0.97;
    this.groundFriction = 0.7;
    this.gravity = new Vector(0, 1);
    this.pinned = false;
    this.radius = radius || 5;
    this.color = '#e62a4f';
    this.mass = 1;
    this.sticks = [];
    // this.behaviors = [];
    this.forceAcc = 1;
  }

  /**
   * 
   * @param {Vector} g 
   */
  setGravity(g) {
    this.gravity = g;
  }
  /**
   * 
   * @param {number} f 
   */
  setFriction(f) {
    this.friction = f;
  }
  /**
   * 
   * @param {number} f 
   */
  setForceAcc(f) {
    this.forceAcc = f;
  }
  /**
   * 
   * @param {number} m 
   */
  setMass(m) {
    this.mass = m;
  }
  /**
   * 
   * @param {number} radius 
   */
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

  /**
   * 
   * @param {number} angle 
   * @param {number} offset 
   */
  rotate(angle, offset) {
    let x = offset.x + (this.pos.x - offset.x) * Math.cos(angle) - (this.pos.y - offset.y) * Math.sin(angle);
    let y = offset.y + (this.pos.x - offset.x) * Math.sin(angle) + (this.pos.y - offset.y) * Math.cos(angle);
    this.pos.setXY(x, y);
  }

  /**
   * 
   * @param {Point} p 
   * @param {number} radius 
   * @param {number} strength 
   */
  resolveBehaviors(p, radius, strength) {
    var delta = Vector.sub(this.pos, p.pos);
    var dist = delta.magSq();

    let magR = (!radius) ? (this.radius * this.radius) : (radius * radius);
    if (dist < magR) {
      var f = delta.normalizeTo(1 - (dist / magR)).mult(strength || this.forceAcc);
      this.applyForce(f);
    }
  }

  /**
   * 
   * @param {number|Vector} f 
   */
  applyForce(f) {
    this.pos.add(f);
  }

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} time 
   * @param {number} radius 
   * @param {number} speed 
   */
  addMotor(x, y, time, radius, speed) {
    this.pos.x = x + radius * Math.cos(time * speed);
    this.pos.y = y + radius * Math.sin(time * speed);
  }

  /**
   * @param {Verly} verlyInstance 
   */
  constrain(verlyInstance) {
    // if (this.pos.y > HEIGHT - 1) {
    //   this.pos.y = HEIGHT - 1;
    // }
    // if (this.pos.x < 0) {
    //   this.pos.x = 0;
    // }
    // if (this.pos.x > WIDTH - 1) {
    //   this.pos.x = WIDTH - 1;
    // }
    // let vel = Vector.sub(this.pos, this.oldpos);
    if (this.pos.x > verlyInstance.WIDTH - this.radius) {
      this.pos.x = verlyInstance.WIDTH - this.radius;
      // this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      // this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.y > verlyInstance.HEIGHT - this.radius) {
      this.pos.y = verlyInstance.HEIGHT - this.radius;
      // this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      // this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
  };


  /**
   * @param {Verly} verlyInstance 
   */
  update(verlyInstance) {
    if (this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);
    // if the point touches the ground set groundFriction
    if (this.pos.y >= verlyInstance.HEIGHT - this.radius && vel.magSq() > 0.000001) {
      var m = vel.mag();
      vel.x /= m;
      vel.y /= m;
      vel.mult(m * this.groundFriction);
    }
    this.oldpos.setXY(this.pos.x, this.pos.y);
    this.pos.add(vel);
    this.pos.add(this.gravity);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   */
  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}


export default Point;