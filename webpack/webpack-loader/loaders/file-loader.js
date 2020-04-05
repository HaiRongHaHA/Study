const loaderUtils = require("loader-utils");
function loader(source) {
    /* 
        interpolateName: 根据给的格式生成一个路径(图片)
        "[hash](hash文件名).[ext](文件后缀)"
        content(source文件流)
    */
    let filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
        content: source
    });
    this.emitFile(filename, source);
    // file-loader需要返回路径
    return `module.exports='${filename}'`;
}
loader.raw = true; // 源码->二级制模式
module.exports = loader;
