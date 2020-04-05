/* 
    
*/
class AsyncSeriesWaterfallHook {
    constructor(args) {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            if (!task || err) return finalCallback();
            if (index === 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        };
        next();
    }
}

let hook = new AsyncSeriesWaterfallHook(["name"]);
hook.tapAsync("node", (name, cb) => {
    setTimeout(() => {
        console.log("satrt node", name);
        // cb("error", "node学完了");
        cb(null, "node学完了");
    }, 1000);
});
hook.tapAsync("node", (data, cb) => {
    setTimeout(() => {
        console.log("satrt vue", data);
        cb(null);
    }, 1000);
});

hook.callAsync("海容", () => {
    console.log("学完拉");
});
