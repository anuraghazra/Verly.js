import {
  random,
  radians,
  degrees,
  clamp,
  normalizedRandom,
  lerp
} from './Utils.js';

import Verly from './Verly.js';
import Vector from './Vector.js';
import Point from './Point.js';
import Stick from './Stick.js';
import AngleStick from './AngleStick.js';
import Entity from './Entity.js';
import TypoGraphy from './TypoGraphy.js';

window.Verly = Verly;
window.Vector = Vector;
window.Point = Point;
window.Stick = Stick;
window.AngleStick = AngleStick;
window.Entity = Entity;
window.TypoGraphy = TypoGraphy;

// utils
window.random = random;
window.radians = radians;
window.degrees = degrees;
window.clamp = clamp;
window.normalizedRandom = normalizedRandom;
window.lerp = lerp;

export default Verly;