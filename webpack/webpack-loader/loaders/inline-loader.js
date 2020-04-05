function loader(source) {
    console.log("inline-loader");
    // loader的参数就是源代码
    return source;
}
module.exports = loader;
