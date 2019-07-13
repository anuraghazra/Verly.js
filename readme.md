# Verly.js

Easy to integrate verlet physics engine.

> - Yet another physics engine? really?
> - Yes because i love physics :heart:.

**Read my article on medium about [Making a Verlet Physics Engine in JavaScript](https://medium.com/better-programming/making-a-verlet-physics-engine-in-javascript-1dff066d7bc5)**


## cool things made with Verly.js
- [VerlyRangeSlider](https://anuraghazra.github.io/VerlyRangeSlider/)
- [Ship](https://anuraghazra.github.io/Verly.js/examples/ship/)
- [Parasites](https://anuraghazra.github.io/parasites/)
- [Swingy Text](https://anuraghazra.github.io/Verly.js/examples/text/)
- [Happy Holi](https://anuraghazra.github.io/Verly.js/examples/typography/)
- **See more [examples](https://anuraghazra.github.io/Verly.js/examples/)**

---
### want more info? Check out the API **[documentation](https://anuraghazra.github.io/Verly.js/docs)**


#### *Experimental Reactjs Integration - check out the [sandbox](https://codesandbox.io/s/verlyjs-react-w5kfr)*


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
<script src="https://cdn.jsdelivr.net/gh/anuraghazra/Verly.js@v1.2.1/dist/verly.bundle.js"></script>
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
- https://anuraghazra.github.io
- hazru.anurag@gmail.com



Contributions Are Welcomed.

Made with :heart: and JavaScript