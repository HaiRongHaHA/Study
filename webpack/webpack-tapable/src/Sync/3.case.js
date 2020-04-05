/* 
    SyncWaterfallHook：同步瀑布流执行，当前任务的返回值是下一个任务的参数
*/
class SyncWaterfallHook {
    // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((prev, curr) => {
            return curr(prev);
        }, ret);
    }
}
let hook = new SyncWaterfallHook(["name"]);
hook.tap("node", data => {
    console.log("node", data);
    return "node学的还不错";
});

hook.tap("vue", data => {
    console.log("vue", data);
    return "vue学的还不错";
});

hook.tap("webpack", data => {
    console.log("webpack", data);
});
hook.call("海容");
