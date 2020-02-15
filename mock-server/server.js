var express = require("express");
var app = express();

let whiteList = ["http://localhost:8004"];

app.use(function(req, res, next) {
  let origin = req.headers.origin;

  if (whiteList.includes(origin)) {
    //设置那个源可以访问我，参数为 * 时，允许任何人访问，但是不可以和 cookie 凭证的响应头共同使用
    res.setHeader("Access-Control-Allow-Origin", origin);

    //允许带有name的请求头的可以访问
    res.setHeader("Access-Control-Allow-Headers", "name");

    // 设置哪些请求方法可访问
    res.setHeader("Access-Control-Allow-Methods", "GET");

    // 设置带cookie请求时允许访问
    res.setHeader("Access-Control-Allow-Credentials", true);

    // 后台改了前端传的name请示头后，再传回去时浏览器会认为不安全，所以要设置下面这个
    res.setHeader("Access-Control-Expose-Headers", "name");

    // 预检的存活时间-options请示
    res.setHeader("Access-Control-Max-Age", 3);

    // 设置当预请求发来请求时，不做任何处理
    if (req.method === "OPTIONS") {
      res.end(); //OPTIONS请示不做任何处理
    }
  }
  next();
});

app.put("/getData", function(req, res) {
  res.end("hello world");
});

app.get("/getData", function(req, res) {
  res.end("Nice to meet you");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
