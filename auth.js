//进入路由之前要求此用户未登录，如果未登录的话可继续访问路由，如果已经登录，则跳回首页，提示已经登录, 比如登录和注册页面
exports.checkNotLogin = function (req,res,next) {
    if(req.session.user){ //如果已经登录，跳回首页
        res.redirect("/");
    }else{
        next(); //继续访问
    }
};

//如果要求此路由登录后才能访问，则会判断当前的登录状态，如果已经登录，则正常继续访问，如果未登录，则跳回登录页;比如发表文章页面和退出页面
exports.checkLogin = function(req,res,next){
    if(req.session.user){ //如果已经登录继续访问
        next();
    }else{
        // 重定向到登录页
        res.redirect("/user/signin");
    }
};