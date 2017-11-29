#新建一个项目
```
npm install -y //这个命令汇创建一个package.json文件
```

#安装依赖的模块
```
npm install body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongoose connect-flash markdown multer async --save
```
--save-dev => -D
--save => -S

#创建并初始化git，创建一个.gitignore文件
```
git init
git add -A
git commit -m"初始化项目并安装依赖"
git remote add origin https://github.com/kongdoudou/blog.git
git push origin master
```

#创建服务
express+mongoose
```
let express = require("express");
let app = express();

app.listen(8080);
```

#跑通路由

#引入模板引擎

