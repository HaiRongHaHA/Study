const path = require("path");
class P {
    apply(compiler) {
        compiler.hooks.emit.tap("emit", () => {
            console.log("emit");
        });
    }
}
class P2 {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap("afterPlugins", () => {
            console.log("afterPlugins");
        });
    }
}
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new P(), new P2()],
    module: {
        rules: [
            {
                test: /.less$/,
                use: [
                    path.resolve(__dirname, "loader", "style-loader"),
                    path.resolve(__dirname, "loader", "less-loader")
                ]
            }
        ]
    }
};
