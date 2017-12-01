let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
let session = require("express-session");
//消息提示中间件
let flash = require("connect-flash");

//设置模板引擎html
app.set("view engine","html");
//指定模板的存放根目录
app.set("views",path.resolve("./views"));
//指定对于html类型的模板使用ejs方法进行渲染
app.engine("html",require("ejs").__express);

//此静态文件中间件会拦截到客户端对静态文件的请求如bootstrap.css，然后会在当前目录的node_modules目录下查找到文件，如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve("node_modules")));
//解析客户端提交过来的请求体，并转成对象赋值给req.body
app.use(bodyParser.urlencoded({extended:true}));
//在使用了此会话中间件之后，会在请求对象上添加一个req.session的属性
app.use(session({
    resave:true,  //每次客户端请求到服务器都会重新保存session
    saveUninitialized:true,  //保存未初始化的session，不管客户端用不用这个session，都初始化一个session供客户端用
    secret:"kong"  //用来加密cookie的
}));

//切记此中间件的使用要放在session的后面，因为此中间件是需要依赖session的
app.use(flash());

app.use(function(req,res,next){
    //res.locals保存的数据在模板中可以直接使用，一般放一些公共的变量
    console.log(req.session);
    res.locals.user = req.session.user;
    //flash的功能是读完一次之后会立刻清空数据
    res.locals.success = req.flash("success").toString();
    res.locals.error = req.flash("error").toString();
    next();
});

let index = require("./routes/index");
let user = require("./routes/user");
let article = require("./routes/article");

app.use("/",index);
app.use("/user",user);
app.use("/article",article);

app.listen(8080);