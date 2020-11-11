import Dep from "./Dep";

function Observer (data) {
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]))
  },
  defineReactive: function (obj, key, val) {
    let dep = new Dep();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // warning
        if (Dep.target) dep.addSub(Dep.target);
        return val;
      },
      set: function (newVal) {
        if (val === newVal) return;
        val = newVal;
        dep.notify();
      }
    });
  },
}

export default function observe (data) {
  if (!data || typeof data !== 'object') return;
  return new Observer(data);
}