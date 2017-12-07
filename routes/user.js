let express = require("express");
let router = express.Router();
let {User} = require("../model");
let {checkNotLogin,checkLogin} = require("../auth");
let multer = require("multer");
let upload = multer({dest:"public/uploads/"});
/*
* 注册功能如何实现：
* 1、绘制注册页面模板（用户名、密码、邮箱）
* 2、提交用户注册的路由 post/user/signup
* 3、在路由中要获取请求体，然后把此用户信息保存到数据库中
* 4、保存完毕后跳转到登录页
*/
router.get('/signup',checkNotLogin,function(req,res){
    res.render("user/signup",{title:"注册"});
});

//single：当表单里只有一个上传文件字段的话，avatar是上传文件字段的name属性
router.post('/signup',checkNotLogin,upload.single("avatar"),function(req,res){
    let user = req.body;
    user.avatar = `/uploads/${req.file.filename}`;
    User.create(user,function(err,doc){
        if(err){
            req.flash("error","用户注册失败");
            res.redirect("back");
        }else{
            req.flash("success","用户注册成功");
            res.redirect("/user/signin");
        }
    });
});

router.get('/signin',checkNotLogin,function(req,res){
    res.render("user/signin",{title:"登录"});
});
//提交用户的登录信息
router.post('/signin',checkNotLogin,function(req,res){
    let user = req.body;  //得到用户提交的登录表单
    User.findOne(user,function(err,doc){
        if(err){
            req.flash("error","用户登录失败");
            res.redirect("back");
        }else{
            if(doc){
                //向会话对象中写入属性user = doc
                req.session.user = doc;
                //req.flash("success")存放的是数组，取出来的也是数组
                req.flash("success","用户登录成功");
                res.redirect("/");
            }else{
                req.flash("error","用户名或密码不正确");
                res.redirect("back");
            }
        }
    })
});
//用户退出登录
router.get('/signout',checkLogin,function(req,res){
    req.session.user = null;
    req.flash("success","用户退出登录成功");
    res.redirect('/user/signin');
});

module.exports = router;


/*
*
* req.file = { fieldname: 'avatar', 对应表单中上传的input元素的name属性
 originalname: 'smiley_004.png',  上传前的原始文件名
 encoding: '7bit',
 mimetype: 'image/png',  文件类型
 destination: 'public/uploads/',  在服务器上保存文件的目录
 filename: '3d9b2837f1fbe9c43e94b0b1b90ad5c5',  在服务器上保存的文件名
 path: 'public\\uploads\\3d9b2837f1fbe9c43e94b0b1b90ad5c5',  保存之后的文件路径
 size: 18199  文件的体积
 }

 req.body = {
 username: '孔翠娟',
 password: '021318',
 email: '467815144@qq.com'
 }
 */