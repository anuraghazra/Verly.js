# Verly.js

Easy to integrate verlet physics engine.

> - Yet another physics engine? really?
> - Yes because i love physics :heart:.

Check out [examples]('https://anuraghazra.github.io/Verly.js/examples/')

## Installation

```bash
git clone https://github.com/anuraghazra/Verly.js.git
```


## Usage

```js
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  let width = 600;
  let height = 600;
  canvas.width = width;
  canvas.height = height;

  window.onload = function () {

    let verly = new Verly(16);

    // x, y, w, h
    verly.createBox(20, 100, 100, 100);
    // x, y, segments, radius
    verly.createHexagon(200, 200, 16, 50);
    // x, y, w, h, segments, pinOffset
    verly.createCloth(300, 200, 300, 300, 15, 2);
    // x, y, segments, gap, pin
    verly.createRope(500, 150, 20, 15, 0);
    // x, y
    verly.createRagdoll(300, 200);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      verly.update();
      
      requestAnimationFrame(animate);
    }
    animate();
  }

```

----------

## Author
- hazru.anurag@gmail.com
- https://anuraghazra.github.io



Contributions Are Welcomed.

Made with :heart: and JavaScript