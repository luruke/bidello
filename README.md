# 👨‍🏫 Bidello
### Don't leave your `Class` alone.

Bidello is a simple class Mixin and event system.


## How to use it
```
npm install bidello
```

and then

```javascript
import { component } from 'bidello';

class YourClass extends component() {
  init() {
    //...
  }
}
```

## And so?
You can extend your classes, and trigger methods by global events.

```javascript
import bidello, { component } from 'bidello';

class YourClass extends component() {
  onResize({ width, height }) {

  }

  onVisibility({ visible }) {

  }

  onRaf() {

  }
};

// Anywhere else in your code...
bidello.trigger({ name: 'resize', fireAtStart: true }, {
  width: window.innerWidth,
  height: window.innerHeight,
});

bidello.trigger({ name: 'onVisibility' }, {
  visible: false,
});

bidello.trigger({ name: 'raf' });
```

> The `fireAtStart` flag, if true, will force the `onResize` method to be called for any new classes created in the future (automatically passing the last known data)


## Example
Together with `Bidello` i'm also shipping some generic helpers, currently containing `Viewport` and `Raf`.  
I found using this pattern a lot on JS heavy apps/experiences, here's an example how a JS class may look like:

```javascript
/*
You might want to import the helpers once (on your entry file),
so to trigger the events and bind the various event listeners
*/
import * as helpers from 'bidello/helpers';

import { component } from 'bidello';
import { PerspectiveCamera, Vector3 } from 'three';

export default class Camera extends component(PerspectiveCamera) {
  constructor() {
    super(35, 0, 0.1, 500);
  }

  onResize({ ratio }) {
    this.aspect = ratio;
    this.updateProjectionMatrix();
  }

  onRaf({ delta, now }) {
    this.position.y += Math.sin(now) * delta;
    this.lookAt(new Vector3(0, 0, 0));
  }
}
```

Look at [boilerthree](https://github.com/luruke/boilerthree) for a more complete example.

🚨 Work in progress!
