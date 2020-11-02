import Dep from "./Dep";

// function Observer (data) { 
//   this.data = data;
//   this.walk(data);
// }

// Observer.prototype = {
//   walk: function (data) { 
//     Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
//   },
//   defineReactive: function (data, key, val) {
//     const dep = new Dep();

//     Object.defineProperty(data, key, {
//       enumerable: true,
//       configurable: true,
//       get: function () {
//         if (Dep.target) dep.addSub(Dep.target);
//         return val;
//       },
//       set: function (newVal) {
//         if (newVal === val) return;
//         val = newVal;
//         dep.notify();
//       }
//     });
//   },
// }

// export default function observe (value) {
//   if (!value || typeof value !== 'object') return;

//   return new Observer(value);
// }

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
        if (Dep.target) dep.addSub(this);
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