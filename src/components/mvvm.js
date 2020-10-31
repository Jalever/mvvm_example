import observe from './observer'
import Compile from './compile'

export default function MVVM(options) {
  // console.warn('1');

  let self = this
  this.data = options.data
  this.methods = options.methods
  Object.keys(this.data).forEach(key => this.proxyKeys(key))

  observe(this.data)
  new Compile(options.el, this)
}

MVVM.prototype = {
  proxyKeys: function (key) {
    console.warn('proxyKeys - key');
    console.log(key);
    console.log('\n');
    
    var self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key]
      },
      set: function setter(newVal) {
        self.data[key] = newVal
      },
    })
  },
}
