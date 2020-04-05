import dog from "./dog.jpg"; // 把图片引入，返回的结果是一个新的图片地址
require("./index.css");
require("./a.less");
let image = new Image();
image.src = dog;
// image.src = "./dog.jpg"; // 就是一个普通的字符串
document.body.appendChild(image);
// import str from "./a.js";
// import $ from "jquery";

// console.log($);
// console.log(str, "hello world");

// let fn = () => {
//     console.log("箭头函数");
// };
// fn();

/* 高级语法转es5语法 */
// @log
// class A {
//     a = 1;
// }

// let a = new A();
// console.log(a.a);

// function log(target) {
//     console.log(target);
// }
