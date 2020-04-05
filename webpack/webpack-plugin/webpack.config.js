const path = require("path");
const DonePlugin = require("./plugins/DonePlugin");
const AsyncPlugin = require("./plugins/AsyncPlugin");
const FileListPlugin = require("./plugins/FileListPlugin");
const InlineSourcePlugin = require("./plugins/InlineSourcePlugin");
// const UploadPlugin = require("./plugins/UploadPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        // new DonePlugin(),
        // new AsyncPlugin(),
        new miniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new FileListPlugin({
            filename: "list.md"
        }),
        new InlineSourcePlugin({
            match: /\.(css|js)/
        })
        // new UploadPlugin({   //没有七牛云（之后再看这个视频）
        //     bucket: "", // 上传到哪个资源上桶
        //     domain: "", // 上传到哪个域名
        //     accessKey: "",
        //     secretKey: ""
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
};
