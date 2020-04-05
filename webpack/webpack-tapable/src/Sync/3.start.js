const { SyncBailHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(["name"])
        };
    }
    tap() {
        // 注册监听函数
        this.hooks.arch.tap("node", name => {
            console.log("satrt node", name);
            return "停止学习";
        });
        this.hooks.arch.tap("vue", name => {
            console.log("satrt vue", name);
        });
    }
    start() {
        this.hooks.arch.call("hairong");
    }
}

let ls = new Lesson();
ls.tap(); //    注册这两个事件
ls.start(); // 启动钩子
