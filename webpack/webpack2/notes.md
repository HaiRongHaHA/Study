> ## 多页面应用配置

```
entry: {
    home: "./src/index.js",
    other: "./src/other.js"
},
output: {
    // [name]  相当于 home|other 实现多出口打包
    // filename: "[name].[hash]js",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
},
plugins: [
    new htmlWebpackPlugin({
        template: "./index.html",
        filename: "home.html",
        chunks: ["home"]
    }),
    new htmlWebpackPlugin({
        template: "./index.html",
        filename: "other.html",
        // 代码块
        chunks: ["other"]
    })
],
```

> ## source-map

```
mode为production时代码混淆，不利于调试报错代码，可以加入source-map

1)、增加映射文件，可以帮我们调试源代码,会单独生成一个source-map文件，出错了，会标识当前报错的列和行

    devtool: "source-map"

2)、不会产生单独的文件,但是可以显示行和列

    devtool: "eval-source-map"

3)、 不会产生列,但是是一个单独的映射文件,产生后可以保留起来

    devtool: "cheap-module-source-map"

4)、不会产生文件，集成在打包后的文件中，不会产生列

    devtool: "cheap-module-eval-source-map"

```

> ## watch 监听修改实时打包

```
watch: true, // 监控文件修改
watchOptions: {
    poll: 1000, // 每秒 问1000次
    aggregateTimeout: 500, // 防抖，输入代码后得500毫秒更新
    ignored: /node_moudles/ // 不需要进行监控得文件
}

npm run build
```

> ## webpack 小插件

```
1)  clean-webpack-plugin
清除插件->每次打包清空打包目录重新生成打包文件
new CleanWebpackPlugin()

2)  copyWebpackPlugin
拷贝插件->复制文件到打包目录下
new CopyWebpackPlugin([
    {
        from: "./doc",
        to: "./"
    }
])

3)  BannerPlugin (webpack内置的版权插件)
new webpack.BannerPlugin("make 2020 by hairong")
```

> ## webpack 跨域问题

```
webpack-dev-server 内部是express
devServer: {
    1) 服务器路径代理解决跨域
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            // 重写的方式 把请求代理到服务器上
            pathRewrite: { "/api": "" }
        }
    }
    2) 前端单纯模拟接口数据
    before(app) {
        app.get("/user", (req, res) => {
            res.json({ name: "海容-before" });
        });
    }
}
3) 有服务端，但不想用代理处理， 在服务端中启用webpack，
端口用服务端端口（相当于前端和后端启用在同一个端口下）
服务端代码:
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");// 中间件(在服务端启动webpack)
let config = require("./webpack.config.js");
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler)); // 启用webpack
```

> ## resolve 属性的配置

```
resolve: { // 解析第三方包模块
    // commonJs规范中查找包先查找当前目录下的node_moudles,如果找不到往上不停的找

    // 只在当前目录查找(就不会再向上层目录查找了)
    modules: [path.resolve("node_moudles")],

    // 设置mainFields属性,先指定入口找style,找不到了才找main入口
    //mainFields: ['style','main'],

    // 指定找入口的文件名
    //mainFiles: [],

    /*
    alias: {
        //别名
        bootstrap: "bootstrap/dist/css/bootstrap.css"
    }
    */

    impor xx from 'nav'(不写后缀自动后缀查找)
    extensions: ['.js','.vue','.css']
}
文件里引入时只用写 import 'bootstrap';就能直接导入样式
```
