function loader(source) {
    console.log("loader2");
    // loader的参数就是源代码
    return source;
}
module.exports = loader;
