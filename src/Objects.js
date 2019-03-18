class Box extends Entity {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this._box = new Entity(16);
    this._box.addPoint(this.x, this.y, 0, 0);
    this._box.addPoint(this.x + this.width, this.y, 0, 0);
    this._box.addPoint(this.x + this.width, this.y + this.height, 0, 0);
    this._box.addPoint(this.x, this.y + this.height, 0, 0);
    this._box.addStick(0, 1);
    this._box.addStick(1, 2);
    this._box.addStick(2, 3);
    this._box.addStick(3, 0);
    this._box.addStick(3, 1);
  
  }
}