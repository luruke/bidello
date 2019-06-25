# 👨‍🏫 bidello
### Don't leave your `Class` alone.

bidello is a simple class Mixin and event system.


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


Look at [antipasto](https://github.com/luruke/antipasto) for a real example.
