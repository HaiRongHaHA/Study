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
