// 订阅器 Dep，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理
// export default function Dep () { 
//   this.subs = [];
// }

// Dep.prototype = {
//   addSub: function (item) {
//     this.subs.push(item);
//   },
//   notify: function () { 
//     this.subs.forEach(watcher => watcher.update())
//   }
// }

// Dep.target = null;

export default function Dep () {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (watcher) {
    this.subs.push(watcher);
  },
  notify: function () {
    this.subs.forEach(watcher => watcher.update());
  },
}

Dep.target = null;

