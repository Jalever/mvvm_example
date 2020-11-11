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

  compileElement: function (node) {
    let attrs = node.attributes

    Array.prototype.forEach.call(attrs, (attr) => {
      let attrName = attr.name,
        attrValue = attr.value

      //是否是directive
      if (this.isDirectiveAttribute(attrName)) {
        const directiveType = attrName.substring(2),
          isDirectiveEvent = this.isDirectiveEvent(directiveType),
          isDirectiveModel = this.isDirectiveModel(directiveType)

        //是否是事件directive
        if (isDirectiveEvent)
          this.compileEventDirective(node, this.vm, attrValue, attrName)

        //是否是model directive
        if (isDirectiveModel)
          this.compileModelDirective(node, this.vm, attrValue, attrName)
      }
    })
  },

  // text nodeType 处理
  compileText: function (node, exp) {
    let initText = this.vm[exp]
    this.textUpdater(node, initText)
    new Watcher(this.vm, exp, (val) => this.textUpdater(node, val))
  },

  // event directive 处理
  compileEventDirective: function (node, vm, exp, dir) {
    let eventType = dir.split(':')[1]
    let cb = vm.methods && vm.methods[exp]
    if (eventType && cb) node.addEventListener(eventType, cb.bind(vm), false)
  },

  // model directive 处理
  compileModelDirective: function (node, vm, exp, dir) {
    let val = this.vm[exp]    

    this.modelUpdater(node, val)

    new Watcher(this.vm, exp, (val) => this.modelUpdater(node, val))

    node.addEventListener('input', (e) => {
      var newValue = e.target.value
      if (val === newValue) return
      this.vm[exp] = newValue
      val = newValue
    })
  },

  // 是否是element节点
  isElementNodeType: function (node) {
    return node.nodeType === 1
  },
  //是否是text节点
  isTextNodeType: function (node) {
    return node.nodeType === 3
  },
  //是否是directive
  isDirectiveAttribute: function (attr) {
    return attr.indexOf('v-') === 0
  },
  //是否是事件directive
  isDirectiveEvent: function (directiveType) {
    return directiveType.indexOf('on') === 0
  },
  //是否是model directive
  isDirectiveModel: function (directiveType) {
    return directiveType.indexOf('model') === 0
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
