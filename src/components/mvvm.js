var Compile = require("./compile");
var observe = require("./observer");

function MVVM(options) {
  var self = this;
  this.data = options.data;
  this.methods = options.methods;

  // 数据代理：可直接通过实例vm.title获取到数据, 而不用写冗长的vm.data.title获取到数据
  Object.keys(this.data).forEach(function(key) {
    self.proxyKeys(key);
  });

  //数据劫持
  observe(this.data);
  new Compile(options.el, this);
}

MVVM.prototype = {
  proxyKeys: function(key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key];
      },
      set: function setter(newVal) {
        self.data[key] = newVal;
      }
    });
  }
};
module.exports = MVVM;
