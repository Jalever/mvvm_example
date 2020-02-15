window.MVVM = require("./components/mvvm");

function requestData() {
  let xhr = new XMLHttpRequest();

  // 强制前端设置必须带上请示头cookie
  document.cookie = "name=haoxl";

  xhr.withCredentials = true;
  xhr.open("GET", "http://localhost:3000/getData", true);

  // 设置自定义请求头
  xhr.setRequestHeader("name", "haoxl");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.warn("xhr.response");
        console.log(xhr.response);
        //获取后台传来的已改变name值的请示头
        console.warn("xhr.getResponseHeader");
        console.log(xhr.getResponseHeader("name"));
        console.log("\n");
      }
    }
  };
  xhr.send();
}

requestData();
