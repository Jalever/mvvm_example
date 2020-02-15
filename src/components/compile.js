var Watcher = require("./watcher");
var UTILS = require("@/util/index");

// Compile: 解析器
function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);

  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);

      this.compileElement(this.fragment);

      this.el.appendChild(this.fragment);
    } else {
      console.log("DOM元素不存在");
    }
  },
  // 将DOM元素移入fragment中
  nodeToFragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;

    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }

    return fragment;
  },
  compileElement: function(el) {
    var childNodes = el.childNodes;
    var self = this;

    Array.prototype.slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (UTILS.isElementNode(node)) {
        self.compile(node);
      } else if (UTILS.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        //递归遍历node
        self.compileElement(node);
      }
    });
  },
  compile: function(node) {
    var nodeAttrs = node.attributes,
      self = this;

    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      // for example: attr:  v-model="title"; v-on:click="clickBtn";
      var attrName = attr.name;

      //是否以"v-"开头的
      if (UTILS.isDirective(attrName)) {
        //title; clickBtn
        var exp = attr.value,
          dir = attrName.substring(2); // model; on:click

        // 是否是"on: "事件指令
        if (UTILS.isEventDirective(dir)) {
          self.compileEvent(node, self.vm, exp, dir);
        } else {
          // v-model 指令
          self.compileModel(node, self.vm, exp, dir);
        }

        node.removeAttribute(attrName);
      }
    });
  },
  compileText: function(node, exp) {
    // console.warn("this.vm");
    // console.log(this.vm);
    // console.warn("exp");
    // console.log(exp);
    // console.log("\n");

    var initText = this.vm[exp];
    UTILS.updateText(node, initText);

    new Watcher(this.vm, exp, function(newVal) {
      UTILS.updateText(node, newVal);
    });
  },
  compileEvent: function(node, vm, exp, dir) {
    var eventType = dir.split(":")[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  },
  compileModel: function(node, vm, exp, dir) {
    var self = this;
    var val = this.vm[exp];

    UTILS.modelUpdater(node, val);

    new Watcher(this.vm, exp, function(newVal) {
      UTILS.modelUpdater(node, newVal);
    });

    node.addEventListener("input", function(e) {
      var newValue = e.target.value;

      if (val === newValue) return;

      self.vm[exp] = newValue;
      // val = newValue;
    });
  }
};
module.exports = Compile;
