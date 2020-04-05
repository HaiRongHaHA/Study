class DonePlugin {
    // 每个Plugin都要有个apply方法
    apply(compiler) {
        /* 
            compiler.hook.done webpack的(编译完成,同步的)钩子函数
            tap：第一个参数无所谓放什么都行（一般是当前插件的名字），
                第二个参数一般是个回调
         */
        compiler.hooks.done.tap("DonePlugin", status => {
            console.log("编译完成");
        });
    }
}

module.exports = DonePlugin;
