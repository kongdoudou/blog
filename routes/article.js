let express = require("express");
let router = express.Router();
let {checkNotLogin,checkLogin} = require("../auth");

router.get("/add",checkLogin,function(req,res){
    res.render("article/add",{title:"发表文章"});
});

module.exports = router;