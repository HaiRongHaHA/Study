// webpack 是node写出来的 这里需要采用node写法
const path = require("path"); // 内置模块
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动建一个html打包到内存中
const TerserJSPlugin = require("terser-webpack-plugin"); //js混淆压缩插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css混淆压缩插件(未生效)
const Webpack = require("webpack");
module.exports = {
    mode: "development", // 模式 默认两种 production development
    entry: "./src/index.js", // 入口(从哪个文件开始打包)
    output: {
        /* 
            filename打包后的文件名，
            bundle.[hash:8].js：加hash每次都产生一个新的文件(防止覆盖或出现缓存问题) 
            [hash:8]：产生8位hash码
        */
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
        // publicPath会在html 路径的地方都加上指定路径
        // publicPath: "http://www.hairong.cn/"
        /* 
            路径必须是一个绝对路径, path.resolve可以把我们写的相对路径
            解析成绝对路径, __dirname(以当前目录下产生dist目录) 
        */
    },
    devServer: {
        // 开发服务器配置
        port: 3000, // 设置端口号
        progress: true, //内存中打包显示进度条
        open: true, // 启动默认打开浏览器
        compress: true, // gzp压缩
        contentBase: "./build" //以哪个文件夹作为静态服务
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        // 数组，放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", //打包后的文件名（默认原文件名）
            minify: {
                // 压缩模板
                removeAttributeQuotes: true // 删除属性中的双引号
                // collapseWhitespace: true // 折叠空行
            }
            // hash: true // 生成哈希戳
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css"
        })
        // new Webpack.ProvidePlugin({
        //     $: "jquery"
        // })
    ],
    externals: {
        jquery: "$"
    },
    module: {
        // 模板
        rules: [
            {
                test: /\.css$/,
                /* 
                    css-loader 主要来解析@import这种语法
                    style-loader 它是把css-loader插入到head标签中
                    
                    loader的特点——单一职责原则
                    loade的use用法，只用一个loader--字符串
                    loade的use用法，多个loader--数组 
                    loader的顺序 默认从右向左\从下到上执行
                    loader还可以写成对象方式（可以加options等属性）
                */
                // use: ["style-loader", "css-loader"]
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                // "postcss-loader" 未生效（之后研究下）
            },
            // 可以处理less\sass\stylus\node-sass\sass-loader stylus-loader
            {
                test: /\.less$/,
                // 把less -> css -> style
                // use: ["style-loader", "css-loader", "less-loader"]
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            // {
            //     test: require.resolve("jquery"),
            //     use: "expose-loader?$"
            // },
            {
                // loader 默认从右向左 从下到上
                test: /\.js$/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        enforce: "pre" // previous post(会在普通loader之后执行) 强制让这个loader在下边的前面执行
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 用babel-loader 把es6转化成es5
                        presets: ["@babel/preset-env"],
                        plugins: [
                            // 支持装饰器
                            [
                                "@babel/plugin-proposal-decorators",
                                { legacy: true }
                            ],
                            // 支持class语法
                            "@babel/plugin-proposal-class-properties",
                            // 支持更高级的语法
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                // 只找src目录下的
                include: path.resolve(__dirname, "src"),
                // 排除node_modules目录下的文件
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                // 做一个限制，当图片小于多少k时候用base64转化
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024,
                        outputPath: "img/",
                        publicPath: "http://www.hairong.cn/"
                    }
                }
            },
            {
                test: /\.html$/,
                use: "html-withimg-loader"
            }
        ]
    }
};
