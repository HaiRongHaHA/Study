const loaderUtils = require("loader-utils");
function loader(source) {
    // 通过require文件就会被打包
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ["let list=[]"];
    while ((current = reg.exec(source))) {
        let [matchUrl, g] = current;
        console.log(matchUrl, g);
        console.log(reg.lastIndex, matchUrl.length);

        let last = reg.lastIndex - matchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
        pos = reg.lastIndex;
        // 把g替换成require得写法 =>    url(require('xxx'))
        arr.push(`list.push('url('+require(${g})+')')`);
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`);
    return arr.join("\r\n");
}
/* 只要在style-loader上 写了pitch
style-loader less-loader css-loader */
loader.pitch = function(remainingRequest) {
    // remainingRequest 剩余的请求(less-loader!css-loader/./index.less)
    // 让style-loader去处理remainingRequest
    // stringifyRequest 转化成相对路径
    // require路径返回的就是css-loader处理好的结果
    let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(
            this,
            "!!" + remainingRequest
        )};
        document.head.appendChild(style)};
   `;
    return str;
};
module.exports = loader;

/* 这个loader不生效不知道为^_^ */
