const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Happypack = require("happypack");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: "./dist"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "dist", "manifest.json")
        }), // 先从Dll动态理解库里找，找不到了才去打包
        // 从moment中如果引入了locale(多了500k)就把它忽略掉
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
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
    ],
    module: {
        noParse: /jquery/, // 不去解析jq中得依赖关系
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/, // 排除
                include: path.resolve("src"), // 包含
                use: "Happypack/loader?id=js"
            },
            {
                test: /\.css$/,
                use: "Happypack/loader?id=css"
            }
        ]
    }
};
