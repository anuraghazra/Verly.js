# Verly.js

Easy to integrate verlet physics engine.

> - Yet another physics engine? really?
> - Yes because i love physics :heart:.

**Check out all [examples](https://anuraghazra.github.io/Verly.js/examples/)**

## cool things made with Verly.js
- [VerlyRangeSlider](https://anuraghazra.github.io/VerlyRangeSlider/)
- [ship](https://anuraghazra.github.io/Verly.js/examples/ship/)
- [parasites](https://anuraghazra.github.io/parasites/)
- [text](https://anuraghazra.github.io/Verly.js/examples/text/)
- [happy holi](https://anuraghazra.github.io/Verly.js/examples/typography/)


## Installation

```bash
git clone https://github.com/anuraghazra/Verly.js.git
```

## local development

after cloning the repo in command line run to build
```bash
npm install && npm run build
```




# Usage

## import CDN link
```html
<!-- add this to head -->
<script src="https://cdn.jsdelivr.net/gh/anuraghazra/Verly.js@v1.1.3/dist/verly.bundle.js"></script>
```

```js
  window.onload = function () {
    let canvas = document.getElementById('c');
    let ctx = canvas.getContext('2d');
    let width = 600;
    let height = 600;
    canvas.width = width;
    canvas.height = height;

    // iteration, canvas, ctx
    let verly = new Verly(16, canvas, ctx);

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
      verly.render();

      // for interacting with points
      verly.interact();
      
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