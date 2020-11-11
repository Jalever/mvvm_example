import Dep from "./Dep";

export default function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get();
}

Watcher.prototype = {
  get: function () {
    Dep.target = this;
    let value = this.vm.data[this.exp];
    Dep.target = null;
    return value
  },
  update: function () {
    let newVal = this.vm.data[this.exp];
    let oldVal = this.value;
    if (newVal === oldVal) return;
    this.value = newVal;
    this.cb.call(this.vm, newVal, oldVal);
  }
}

