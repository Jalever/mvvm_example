// 订阅器 Dep，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理

export default function Dep () {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (watcher) {
    this.subs.push(watcher);
  },
  notify: function () {
    console.warn('this.subs');
    console.log(this.subs);
    console.log('\n');
    
    this.subs.forEach(watcher => watcher.update());
  },
}

Dep.target = null;

