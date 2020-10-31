import Dep from "./Dep";

// function Observer (data) {
//   this.data = data;
//   this.walk(data);
// }

function Observer (data) { 
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) { 
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
  },
  defineReactive: function (data, key, val) {
    const dep = new Dep();

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        if (Dep.target) dep.addSub(Dep.target);
        return val;
      },
      set: function (newVal) {
        if (newVal === val) return;
        val = newVal;
        dep.notify();
      }
    });
  },
}

export default function observe (value) {
  if (!value || typeof value !== 'object') return;

  return new Observer(value);
}