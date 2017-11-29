let express = require("express");
let app = express();
let index = require("./routes/index");
let user = require("./routes/user");
let article = require("./routes/article");

app.use("/",index);
app.use("/user",user);
app.use("/article",article);

app.listen(8080);