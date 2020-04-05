/* 
    SyncLoopHook：同步遇到某个不返回undefined的监听函数会多次执行
*/
class SyncLoopHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.map(task => {
            let ret;
            do {
                ret = task(...args);
            } while (ret !== undefined);
        });
    }
}

let hook = new SyncLoopHook(["name"]);
let total = 0;
hook.tap("node", name => {
    console.log("node", name);
    return ++total === 3 ? undefined : "继续学";
});

hook.tap("vue", name => {
    console.log("vue", name);
});

hook.tap("webpack", name => {
    console.log("webpack", name);
});

hook.call("海容");
