class SyncHook {
    // 钩子是同步的
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.map(task => task(...args));
    }
}

let hook = new SyncHook(["name"]);
hook.tap("node", name => {
    console.log("node", name);
});

hook.tap("vue", name => {
    console.log("vue", name);
});
hook.call("海容");
