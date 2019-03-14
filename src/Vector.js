/**
 * Vector.js v1.0.0
 * @author Anurag Hazra
 * @borrows p5.Vector
 * @param {number} x 
 * @param {number} y 
 */

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

// Static Functions
Vector.dist = function (v1, v2) {
  return v1.dist(v2);
}
Vector.distSq = function (v1, v2) {
  return v1.distSq(v2);
}
Vector.sub = function (v1, v2) {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
};
Vector.add = function (v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
};
Vector.fromAngle = function (angle) {
  let v = new Vector(0, 0);
  v.x = Math.cos(angle);
  v.y = Math.sin(angle);
  return v;
}
Vector.random2D = function (v) {
  return Vector.fromAngle(Math.random() * Math.PI * 180);
}


Vector.prototype = {
  jitter: function (a, b) {
    var v = new Vector(a, b);
    this.x += normalizedRandom() * v.x;
    this.y += normalizedRandom() * v.y;
    return this;
  },
  add: function (x, y) {
    if (arguments.length === 1) {
      this.x += x.x;
      this.y += x.y;
    } else if (arguments.length === 2) {
      this.x += x;
      this.y += y;
    }
    return this;
  },
  sub: function (x, y) {
    if (arguments.length === 1) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (arguments.length === 2) {
      this.x -= x;
      this.y -= y;
    }
    return this;
  },
  mult: function (v) {
    if (typeof v === 'number') {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  },
  div: function (v) {
    if (typeof v === 'number') {
      this.x /= v;
      this.y /= v;
    } else {
      this.x /= v.x;
      this.y /= v.y;
    }
    return this;
  },
  setAngle: function (angle) {
    var len = this.mag();
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
  },
  mag: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  magSq: function () {
    return (this.x * this.x + this.y * this.y);
  },
  setXY: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  setMag: function (value) {
    this.normalize();
    this.mult(value);
    return this;
  },
  normalize: function () {
    let m = this.mag();
    if (m > 0) {
      this.div(m);
    }
    return this;
  },
  normalizeTo: function (length) {
    var mag = this.mag();
    if (mag > 0) {
      mag = length / mag;
      this.mult(mag);
    }
    return this;
  },
  limit: function (max) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
    return this;
  },
  heading: function () {
    return (-Math.atan2(-this.y, this.x));
  },
  dist: function (v) {
    let dx = this.x - v.x;
    let dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  distSq: function (v) {
    let dx = this.x - v.x;
    let dy = this.y - v.y;
    return (dx * dx + dy * dy);
  },
  copy: function () {
    return new Vector(this.x, this.y);
  },
  negative: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },
  array: function () {
    return [this.x, this.y];
  },
  toString: function () {
    return "[" + this.x + ", " + this.y + ", " + this.z + "]";
  },
  project: function (v) {
    var coeff = ((this.x * v.x) + (this.y * v.y)) / ((v.x * v.x) + (v.y * v.y));
    this.x = coeff * v.x;
    this.y = coeff * v.y;
    return this;
  },
  rotate: function (a) {
    var b = this.heading() + a;
    var c = this.mag();
    this.x = Math.cos(b) * c;
    this.y = Math.sin(b) * c;
  }
}