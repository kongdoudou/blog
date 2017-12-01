let express = require("express");
let router = express.Router();
let {User} = require("../model");
let {checkNotLogin,checkLogin} = require("../auth");
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

router.post('/signup',checkNotLogin,function(req,res){
    console.log(req);
    let user = req.body;
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