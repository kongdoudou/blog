let express = require("express");
let router = express.Router();

router.get('/',function(req,res){
    //路径是相对路径，相对于模板根目录
    res.render("index",{
        title:"孔翠娟的博客"
    });
});

module.exports = router;