/* 
    chdir(改变目录)
    cwd(当前运行工作目录)
    env(环境变量)
        可以根据环境变量的不同执行不同的结果
        开发的时候  localhost
        上线的时候  www.xxx.cn
        临时的变量  export(mac)/set(windows) => cross-env(兼容前面两个) 
                   export a=1 & node 2.env
    nextTick(node中的微任务)
*/
const path = require("path");
console.log(path.resolve());
console.log(process.cwd());
/* 以上两个log功能都是解析除一个绝对路径 */
// console.log(process.env);
/* 
    可以根据环境变量的不同执行不同的结果
    开发的时候  localhost
    上线的时候  www.xxx.cn
    临时的变量  export(mac)/set(windows) => cross-env(兼容前面两个) 
               export a=1 & node 2.env  在命令行用
    
*/
let url = "";
if (process.env.NODE_ENV == "development") {
    url = "localhost";
} else {
    url = "www.xxx.cn";
}
console.log(url);

// nextTick
Promise.resolve().then(data => {
    console.log("Promise");
});
process.nextTick(() => {
    console.log("nextTick");
});

// 比promise快，在node中写异步直接用nextTick

/* 
    新版本node和浏览器的事件环基本一样
    事件环：node里是自己实现的事件环
*/

setTimeout(() => {
    console.log("setTimeout");
}, 1000);

/* 
    setImmediate相当于没有时间的setTimeout
    它在事件环check层，setTimeout在事件环timers层
    setImmediate和setTimeout的执行顺序是受node的性能影响的，
    不一定谁快，如果setTimeout时间还没到,事件环会往下层走
*/
setImmediate(() => {
    console.log("setImmediate");
});
