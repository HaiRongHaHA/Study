/* 
    tapable库中有三种注册方法：
        tab同步注册     tapAsync(cb)    tapPromise(注册的是promise)
        call            callAsync       promise
*/
class AsyncSeriesHook {
    constructor(args) {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let [first, ...others] = this.tasks;
        return others.reduce((prev, curr) => {
            return prev.then(() => curr(...args));
        }, first(...args));
    }
}

let hook = new AsyncSeriesHook(["name"]);
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
