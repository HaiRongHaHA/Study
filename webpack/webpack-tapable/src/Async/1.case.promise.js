/* 
    tapable库中有三种注册方法：
        tab同步注册     tapAsync(cb)    tapPromise(注册的是promise)
        call            callAsync       promise
*/
class AsyncParallelHook {
    constructor(args) {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let tasks = this.tasks.map(task => task(...args));
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelHook(["name"]);
hook.tapPromise("node", name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("satrt node", name);
            resolve();
        }, 1000);
    });
});
hook.tapPromise("vue", name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("satrt vue", name);
            resolve();
        }, 1000);
    });
});

hook.promise("海容").then(() => {
    console.log("学完拉");
});
