var Dep = require("./Dep");

//Observer: 监听器
function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function(data) {
    var self = this;
    Object.keys(data).forEach(function(key) {
      self.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function(data, key, val) {
    var dep = new Dep();

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
        //依赖收集
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function setter(newVal) {
        if (newVal === val) return;

        val = newVal;
        //派发更新
        dep.notify();
      }
    });
  }
};

// 外面再写一个函数, 不用每次调用都写个new, 也方便递归调用
function observe(value, vm) {
  // 如果不是对象的话就直接return掉
  // 防止递归溢出
  if (!value || typeof value !== "object") return;

  return new Observer(value);
}

module.exports = observe;
