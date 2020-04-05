/* 
    SyncBailHook：当前任务返回值若不是一个undefined就停止往下执行
*/
class SyncBailHook {
    // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let ret,
            index = 0;
        do {
            ret = this.tasks[index++](...args);
        } while (ret === undefined && index < this.tasks.length);
    }
}

let hook = new SyncBailHook(["name"]);
hook.tap("node", name => {
    console.log("node", name);
    return "停止向下执行";
});

hook.tap("vue", name => {
    console.log("vue", name);
});
hook.call("海容");
