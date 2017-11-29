let express = require("express");
let app = express();
let path = require("path");

//设置模板引擎html
app.set("view engine","html");
//指定模板的存放根目录
app.set("views",path.resolve("./views"));
//指定对于html类型的模板使用ejs方法进行渲染
app.engine("html",require("ejs").__express);

//此静态文件中间件会拦截到客户端对静态文件的请求如bootstrap.css，然后会在当前目录的node_modules目录下查找到文件，如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve("node_modules")));

let index = require("./routes/index");
let user = require("./routes/user");
let article = require("./routes/article");

app.use("/",index);
app.use("/user",user);
app.use("/article",article);

app.listen(8080);