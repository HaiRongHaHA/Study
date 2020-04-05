> ## webpack 的优化项

```
1)、如果明确一个库没有其他依赖关系的情况下，一个大的库是能够减少打包速度的
noParse: /jquery/   // 不去解析jq中得依赖关系

2)、场景：在我们加载moment的时候它会自动把所有语言包引入，所以这个包很大，我们用不到这么多语言，所以需要忽略掉它内部所有引入的本地语言文件

从moment中如果引入了locale(多了500k)就把它忽略掉
new webpack.IgnorePlugin(/\.\/locale/, /moment/)

忽略掉语言包之后，如果需要设置语言就要手动引入所需要的语言包，例：
import "moment/locale/zh-cn";
moment.locale("zh-cn");
```

> ## 动态链接库

```
场景：一下代码打包后很大(react、react-dom)
import React from "react";
import { render } from "react-dom";

render(<h1>jsx</h1>, window.root);

优化：把react和react-dom抽离出去，打包的时候就不打包这两个文件了，因为这两个文件属于
第三方库，而且它也不需要更改不用重新打包

1、独立的把react和react-dom进行打包，在开发的时候引用打包好的文件就不会重新被打包了
webpack.config.react.js
const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: {
        react: ["react", "react-dom"]
    },
    output: {
        filename: "_dll_[name].js",
        path: path.resolve(__dirname, "dist"),
        library: "_dll_[name]" // 打包产生的文件名
        // libraryTarget: "var" //默认var commonjs var this……
    },
    plugins: [
        new webpack.DllPlugin({
            // 建立任务清单manifest.json, 任务对应同名的变量(library)上找结果
            name: "_dll_[name]", // name === library(规定好的)
            path: path.resolve(__dirname, "dist", "manifest.json")
        })
    ]
};

2、npx webpack --config webpack.config.react.js

3、打包完已经在index.html中引入
<script src="/_dll_react.js"></script>

4、webpack.config.js引入Dll插件
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, "dist", "manifest.json")
}), // 先从Dll动态理解库里找，找不到了才去打包

此时打包大小减少了很多，因为已经打包好当在dist目录下了，用的时候用的打包后的结果，减少了打包大小，
修改代码的时候也只需要重新编译自己写的代码，而引入的react库无需打包找动态链接库，提高了编译速度

```

> ## 多线程打包 happypack

```
new Happypack({
    id: "js",
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        }
    ]
}),
new Happypack({
    id: "css",
    use: ["style-loader", "css-loader"]
})

rules: [
    {
        test: /\.js$/,
        use: "Happypack/loader?id=js"
    },
    {
        test: /\.css$/,
        use: "Happypack/loader?id=css"
    }
]

项目大的时候使用多线路打包速度会很快，小项目可能反而会慢
```

> ## webpack 自带优化

```
1、tree-shaking：把没用到的代码自动删除掉
import语法在生产环境下（production）会自动去除掉没用的代码（这就是为什么前端都用import导入模块的原因）
require语法不行，并不会进行tree-shaking

2、scope hosting(作用域提升)：在weback中会自动省略一些可以简化的代码
let a = 1,
    b=2,
    c=3;
    d=a+b+c;
console.log(d)  // 打包文件里直接把1+2+3结果6生成了
```

> ## 多页应用打包抽离公共代码块

```
entry: {
    index: "./src/index.js",
    other: "./src/other.js"
},
output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build")
},
optimization: {
    splitChunks: {
        // 分割代码
        cacheGroups: {
            //  缓存组
            common: {
                // 公共模块
                chunks: "initial",
                minSize: 0, //满足设定大小的文件就抽离
                minChunks: 2 // 满足设置引入次数就抽离
            },
            vendor: {
                // 第三方库抽离公共代码
                priority: 1, // 先抽离第三方再抽离代码中公共的
                test: /node_modules/,
                chunks: "initial",
                minSize: 0, //满足设定大小的文件就抽离
                minChunks: 2 // 满足设置引入次数就抽离
            }
        }
    }
}

```

> ## 懒加载

```
let button = document.createElement("button");
button.innerText = "hallo";
// 点击按钮时才加载某个资源
button.addEventListener("click", () => {
    // es6草案中的语法实际上就是靠jsonp实现动态加载文件
    import("./source").then(data => {
        console.log(data.default);
    });
    // vue|react路由的懒加载，都是靠这样来实现
});

document.body.appendChild(button);

```

> ## 热更新：增量更新

```
// 打印更新的模块路径
new webpack.NamedModulesPlugin(),
// 热更新插件
new webpack.HotModuleReplacementPlugin()
//  当这个路径这个模块更新了，执行某个方法

if (module.hot) {
    // NamedModulesPlugin的作用
    module.hot.accept("./source", () => {
        console.log("文件更新了");
        let str = require("./source");
    });
}
```
