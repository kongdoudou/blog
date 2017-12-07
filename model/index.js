let mongoose = require("mongoose");
//连接数据库
let db = mongoose.connect("mongodb://localhost/blog");
//定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});

//定义用户模型
let user = mongoose.model("User",userSchema);

//把用户模型挂载到导出对象上
module.exports = {
    User:user
};
