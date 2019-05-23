import Bidello from '../index';

class Raf {
  constructor() {
    this.time = window.performance.now();

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.onTick = this.onTick.bind(this);
    this.start();

    window.requestAnimationFrame(this.onTick);
  }

  start() {
    this.startTime = window.performance.now();
    this.oldTime = this.startTime;
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
  }

  onTick(now) {
    this.time = now;

    if (!this.isPaused) {
      this.delta = (now - this.oldTime) / 1000;
      this.oldTime = now;

      Bidello.trigger({ name: 'raf' }, {
        delta: this.delta,
        now
      });
    }

    window.requestAnimationFrame(this.onTick);
  }
}

export const raf = new Raf();
