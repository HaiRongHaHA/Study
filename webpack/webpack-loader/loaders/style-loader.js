function loader(source) {
    /* 
        在style-loader中导出一个脚本
        JSON.stringify  把源码转成字符串
    */
    let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
   `;
    return str;
}
module.exports = loader;
