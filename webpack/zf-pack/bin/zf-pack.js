#! /usr/bin/env node

/* 
    1)、需要找到当前执行名得路径，拿到webpack.config.js

*/
// 1)、需要找到当前执行名得路径，拿到webpack.config.js
const path = require("path");
let config = require(path.resolve("webpack.config.js")); // config配置文件

// 编译
const Compiler = require("./../lib/Compiler.js");
let compiler = new Compiler(config);
compiler.hooks.entryOption.call();
compiler.run(); // 标识运行编译
