//监听器Watcher
var { Dep } = require("./observer");

function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get(); // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    var newVal = this.vm.data[this.exp],
      oldVal = this.value;

    if (newVal !== oldVal) {
      this.value = newVal;

      this.cb.call(this.vm, newVal);
    }
  },
  get: function() {
    Dep.target = this; // 缓存自己
    var val = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return val;
  }
};
module.exports = Watcher;
