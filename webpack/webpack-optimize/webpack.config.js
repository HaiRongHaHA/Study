const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: "./build"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html"
        }),
        // 打印更新的模块路径
        new webpack.NamedModulesPlugin(),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
