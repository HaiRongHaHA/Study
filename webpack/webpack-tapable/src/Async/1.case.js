/* 
    异步的钩子：
        串行：一个任务执行完接着执行下一个任务
        并行：同时执行任务，需要等待所有并发的异步事件执行后再执行回调方法
    AsyncParallelHook：同时发送多个请求，异步并行钩子
    注册方法 分为   tap注册(同步) tapAsync注册(异步)：任何一个回调没执行，最终的回调都不会执行
    AsyncParallelBailHook: 带保险的异步并行钩子（如果当前任务失败就不再向下执行）
*/
class AsyncParallelHook {
    constructor(args) {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let done = () => {
            index++;
            if (index == this.tasks.length) {
                finalCallback();
            }
        };
        this.tasks.map(task => {
            task(...args, done);
        });
    }
}

let hook = new AsyncParallelHook(["name"]);
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
