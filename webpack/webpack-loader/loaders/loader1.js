function loader(source) {
    console.log("loader1");
    // loader的参数就是源代码
    return source;
}
module.exports = loader;
