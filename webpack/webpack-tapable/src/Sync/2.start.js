const { SyncWaterfallHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(["name"])
        };
    }
    tap() {
        // 注册监听函数
        this.hooks.arch.tap("node", name => {
            console.log("satrt node", name);
            return "node学的还不错";
        });
        this.hooks.arch.tap("vue", data => {
            console.log("satrt vue", data);
        });
    }
    start() {
        this.hooks.arch.call("hairong");
    }
}

let ls = new Lesson();
ls.tap(); //    注册这两个事件
ls.start(); // 启动钩子
