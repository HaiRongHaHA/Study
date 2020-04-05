const { smart } = require("webpack-merge");
const base = require("./webpack.base.js");
module.exports = smart(base, {
    mode: "development",
    devtool: "eval-source-map",
    watch: true, // 监控文件修改
    watchOptions: {
        poll: 1000, // 每秒 问1000次
        aggregateTimeout: 500, // 防抖，输入代码后得500毫秒更新
        ignored: /node_moudles/ // 不需要进行监控得文件
    }
});

// npm run build -- --config webpack.dev.js
