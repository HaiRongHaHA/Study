let express = require("express");
let app = express();
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
// 中间件(在服务端启动webpack)
let config = require("./webpack.config.js");
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));

app.get("/user", (req, res) => {
    res.json({ name: "海容" });
});
app.listen(3000);
