const { SyncLoopHook } = require("tapable");
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(["name"])
        };
    }
    tap() {
        // 注册监听函数
        this.hooks.arch.tap("node", name => {
            console.log("satrt node", name);
            return ++this.index === 3 ? undefined : "继续学";
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
