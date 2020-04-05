const path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, "dist")
    },
    resolveLoader: {
        modules: ["node_modules", path.resolve(__dirname, "loaders")]
    },
    devtool: "source-map",
    watch: true,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        /* 目的就是根据图片生成一个md5戳 发射到dist目录下，
                        file-loader还会返回当前得图片路径 
                        
                        url-loader: 显示file-loader处理路径，会调用file-loader
                        */
                        loader: "url-loader",
                        options: {
                            limit: 200 * 1024
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "banner-loader",
                        options: {
                            text: "海容出品",
                            filename: path.resolve(__dirname, "banner.js")
                        }
                    }
                ]
            }
            // {
            //     test: /\.js$/,
            //     use: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 presets: ["@babel/preset-env"]
            //             }
            //         }
            //     ]
            // }
        ]
    }
};
