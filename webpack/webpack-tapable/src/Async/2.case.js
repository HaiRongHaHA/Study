/* 
    异步串行：第一个执行完再执行第二个
*/
class AsyncSeriesHook {
    constructor(args) {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (this.tasks.length === index) return finalCallback();
            this.tasks[index++](...args, next);
        };
        next();
    }
}

let hook = new AsyncSeriesHook(["name"]);
hook.tapAsync("node", (name, cb) => {
    setTimeout(() => {
        console.log("satrt node", name);
        cb();
    }, 1000);
});
hook.tapAsync("node", (name, cb) => {
    setTimeout(() => {
        console.log("satrt vue", name);
        cb();
    }, 1000);
});

hook.callAsync("海容", () => {
    console.log("学完拉");
});
