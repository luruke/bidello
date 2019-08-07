class Bidello {
  constructor() {
    this.data = {};
    this.listeners = {};
    this.fireAtStart = {};
    this.instances = [];
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

    for (let k in this.fireAtStart) {
      this.fireMethod(instance, k);
    }
  }

  unregister(instance) {
    const index = this.instances.indexOf(instance);

    if (index > -1) {
      this.instances.splice(index, 1);
    }
  }

  nameToMethod(n) {
    return `on${n.charAt(0).toUpperCase() + n.slice(1)}`;
  }

  fireMethod(instance, name) {
    const method = instance[this.nameToMethod(name)];

    if (typeof method === 'function') {
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
      console.log(`👨‍🏫 ${name} – ${data}`);
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

  destroy() {
    bidelloSingleton.unregister(this);
  }
};

export { component };
export default bidelloSingleton;
