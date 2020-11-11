import observe from './observer'
import Compile from './compile'

export default function MVVM(options) {
  this.data = options.data
  this.methods = options.methods
  Object.keys(this.data).forEach(key => this.proxyKeys(key))

  observe(this.data)
  new Compile(options.el, this)
}

MVVM.prototype = {
  proxyKeys: function (key) {
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
