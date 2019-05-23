class Bidello {
  constructor() {
    // Keep in memory the last arguments fired with events
    this.args = {};

    // Component Instances
    this.instances = [];

    // External callbacks not in components
    this.listeners = {};

    this.fireAtStart = {};
  }

  on(e, f) {
    this.listeners[e] = this.listeners[e] || [];
    this.listeners[e].push(f);
  }

  off(e, f) {
    if(e in this.listeners === false) {
      return;
    }

    this.listeners[e].splice(this.listeners[e].indexOf(f), 1);
  }

  register(instance) {
    this.instances.push(instance);
    // TODO? give an ID to this instance?

    // Eventually fire the events at start with the most recent args
    for (let k in this.fireAtStart) {
      this.fireMethod(instance, k);
    }
  }

  nameToMethod(n) {
    return `on${n.charAt(0).toUpperCase() + n.slice(1)}`;
  }

  fireMethod(instance, name) {
    const method = instance[this.nameToMethod(name)];

    if (typeof method === 'function') {
      method.apply(instance, this.args[name]);
    }
  }

  trigger({
    name,
    fireAtStart = false,
    log = false,
  }, args) {
    this.args[name] = args;

    if (fireAtStart) {
      this.fireAtStart[name] = true;
    }

    if (log) {
      console.log(`🔥 ${name} – ${args}`);
    }

    if (name in this.listeners) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        this.listeners[name][i].apply(this, args);
      }
    }

    this.instances.forEach(instance => this.fireMethod(instance, name));
  }
};

const BidelloSingleton = new Bidello();

const component = (superclass = class T {}) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.args = args;

    BidelloSingleton.register(this);
  }
};

export { component };
export default BidelloSingleton;
