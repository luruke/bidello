class Bidello {
  constructor() {
    // Keep in memory the last data fired with events
    this.data = {};

    // Component Instances
    this.instances = [];

    // External callbacks not in components
    this.listeners = {};

    this.fireAtStart = {};

    setTimeout(this.helpersAvailable.bind(this), 100);
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

    // Eventually fire the events at start with the most recent data
    for (let k in this.fireAtStart) {
      this.fireMethod(instance, k);
    }
  }

  nameToMethod(n) {
    return `on${n.charAt(0).toUpperCase() + n.slice(1)}`;
  }

  helpersAvailable() {
    for (const k in this.data) {
      console.log(`👨‍🏫 ${this.nameToMethod(k)}()`, this.data[k])
    }
  }

  fireMethod(instance, name) {
    const method = instance[this.nameToMethod(name)];

    if (typeof method === 'function') {
      // method.apply(instance, this.data[name]);
      method.call(instance, this.data[name]);
    }
  }

  trigger({
    name,
    fireAtStart = false,
    log = false,
  }, data = {}) {
    this.data[name] = data;

    if (fireAtStart) {
      this.fireAtStart[name] = true;
    }

    if (log) {
      console.log(`🔥 ${name} – ${data}`);
    }

    if (name in this.listeners) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        this.listeners[name][i].call(this, data);
      }
    }

    this.instances.forEach(instance => this.fireMethod(instance, name));
  }
};

const bidelloSingleton = new Bidello();

const component = (superclass = class T {}) => class extends superclass {
  constructor(...args) {
    super(...args);
    this._args = args;
    this.init && this.init();
    bidelloSingleton.register(this);
  }
};

export { component };
export default bidelloSingleton;
