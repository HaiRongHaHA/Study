const { AsyncSeriesHook } = require("tapable");
class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(["name"])
        };
    }
    tap() {
        // 注册监听函数
        this.hooks.arch.tapAsync("node", (name, cb) => {
            setTimeout(() => {
                console.log("satrt node", name);
                cb();
            }, 1000);
        });
        this.hooks.arch.tapAsync("vue", (name, cb) => {
            setTimeout(() => {
                console.log("satrt vue", name);
                cb();
            }, 1000);
        });
    }
    start() {
        this.hooks.arch.callAsync("hairong", () => {
            console.log("学完拉");
        });
    }
}

let ls = new Lesson();
ls.tap(); //    注册这两个事件
ls.start(); // 启动钩子
