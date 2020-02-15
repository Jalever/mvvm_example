module.exports = {
  updateText: function(node, value) {
    node.textContent = typeof value === "undefined" ? "" : value;
  },
  modelUpdater: function(node, value) {
    node.value = typeof value === "undefined" ? "" : value;
  },
  isDirective: function(attr) {
    return attr.indexOf("v-") === 0;
  },
  isEventDirective: function(dir) {
    return dir.indexOf("on:") === 0;
  },
  isElementNode: function(node) {
    return node.nodeType === 1;
  },
  isTextNode: function(node) {
    return node.nodeType === 3;
  }
};
