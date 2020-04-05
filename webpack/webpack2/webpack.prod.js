const { smart } = require("webpack-merge");
const base = require("./webpack.base.js");
const webpack = require("webpack");
module.exports = smart(base, {
    mode: "production",
    optimization: {
        // 优化项
        minimizer: []
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify("production"),
            FLAG: "true",
            EXPORESSION: JSON.stringify("海容")
        })
    ]
});

// npm run build -- --config webpack.prod.js
