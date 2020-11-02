import Watcher from './watcher'

export default function Compile(el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compile(this.fragment)
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function (el) {
    let fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  compile: function (el) {
    // let childNodes = el.childNodes
    // Array.prototype.slice.call(childNodes).forEach((node) => {
    //   let reg = /\{\{(.*)\}\}/
    //   let textContent = node.textContent
    //   if (this.isElementNode(node)) {
    //     this.compileElement(node)
    //   } else if (this.isTextNode(node) && reg.test(textContent)) {
    //     this.compileText(node, reg.exec(textContent)[1])
    //   }

    //   if (node.childNodes && node.childNodes.length) this.compile(node)
    // })

    let childNodes = el.childNodes

    Array.prototype.slice.call(childNodes).forEach((node) => {
      let textContent = node.textContent,
        reg = /\{\{(.*)\}\}/

      if (this.isElementNodeType(node)) this.compileElement(node)
      if (this.isTextNodeType(node) && reg.test(textContent))
        this.compileText(node, reg.exec(textContent)[1])

      if (node.childNodes && node.childNodes.length) this.compile(node)
    })
  },
  // compileElement: function (node) {
  //   let nodeAttrs = node.attributes
  //   Array.prototype.forEach.call(nodeAttrs, (attr) => {
  //     let attrName = attr.name

  //     if (this.isDirective(attrName)) {
  //       let val = attr.value,
  //         dir = attrName.substring(2)

  //       if (this.isEventDirective(dir)) {
  //         this.compileEvent(node, this.vm, val, dir)
  //       } else {
  //         this.compileModel(node, this.vm, val, dir)
  //       }

  //       node.removeAttribute(attrName)
  //     }
  //   })
  // },

  // compileText: function (node, exp) {
  //   let initText = this.vm[exp]
  //   this.textUpdater(node, initText)
  //   new Watcher(this.vm, exp, (value) => this.textUpdater(node, value))
  // },

  // compileEvent: function (node, vm, exp, dir) {
  //   let eventType = dir.split(':')[1]
  //   let cb = vm.methods && vm.methods[exp]

  //   if (eventType && cb) node.addEventListener(eventType, cb.bind(vm), false)
  // },

  // compileModel: function (node, vm, exp, dir) {
  //   const self = this;
  //   let val = this.vm[exp]
  //   this.modelUpdater(node, val)
  //   new Watcher(this.vm, exp, (val) => this.modelUpdater(node, val))

  //   node.addEventListener('input', (e) => {
  //     let newValue = e.target.value
  //     if (val === newValue) return

  //     self.vm[exp] = newValue
  //     val = newValue

  //   })
  // },

  // v-model 更新器
  // modelUpdater: function (node, value) {
  //   node.value = typeof value === 'undefined' ? '' : value
  // },

  // v-model 更新器
  // textUpdater: function (node, value) {
  //   node.textContent = typeof value === 'undefined' ? '' : value
  // },

  // 是否是‘v-’开头的指令
  // isDirective: function (attr) {
  //   return attr.indexOf('v-') === 0
  // },

  // 是否是element节点
  // isElementNode: function (node) {
  //   return node.nodeType === 1
  // },

  // 是否是text节点
  // isTextNode: function (node) {
  //   return node.nodeType === 3
  // },

  // 是否是事件directive
  // isEventDirective: function (attrname) {
  //   return attrname.indexOf('on:') === 0
  // },

  compileElement: function (node) {
    let attrs = node.attributes;

    Array.prototype.forEach.call(attrs, attr => {
      let attrName = attr.name,
        attrValue = attr.value;

      if (this.isDirectiveAttribute(attrName)) {        
        const directiveType = attrName.substring(2);
        if (this.isDirectiveEvent(directiveType)) this.compileEventDirective(node, this.vm, attrValue, directiveType);
        if (this.isDirectiveModel(directiveType)) this.compileModelDirective(node, this.vm, attrValue, directiveType);
      }
    });
  },
  // text nodeType 处理
  compileText: function (node, exp) {
    let initText = this.vm[exp]
    this.textUpdater(node, initText);
    new Watcher(this.vm, exp, val => this.textUpdater(node, val));
  },

  // event directive 处理
  compileEventDirective: function (node, vm, exp, dir) { 

  },

  // model directive 处理
  compileModelDirective: function (node, vm, exp, dir) { 

  },

  // 是否是element节点
  isElementNodeType: function (node) {
    return node.nodeType === 1
  },
  //是否是text节点
  isTextNodeType: function (node) {
    return node.nodeType === 3
  },
  //是否是属性directive
  isDirectiveAttribute: function (attr) {
    return attr.indexOf('v-') === 0;
  },
  //是否是事件directive
  isDirectiveEvent: function (directiveType) {
    return directiveType.indexOf('on') === 0;
  },
  //是否是model directive
  isDirectiveModel: function (directiveType) {
    return directiveType.indexOf('model') === 0;
  },


  // 文本更新器
  textUpdater: function (node, value) {
    return (node.textContent = typeof value === 'undefined' ? '' : value)
  },
  // model更新器
  modelUpdater: function (node, value) {
    return (node.textContent = typeof value === 'undefined' ? '' : value)
  },
}
