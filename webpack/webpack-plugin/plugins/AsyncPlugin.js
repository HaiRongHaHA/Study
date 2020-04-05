class AsyncPlugin {
    apply(compiler) {
        console.log("1");
        compiler.hooks.emit.tapAsync("AsyncPlugin", (compliation, cb) => {
            setTimeout(() => {
                console.log("文件发射出来");
                cb();
            }, 1000);
        });
        console.log("2");
        compiler.hooks.emit.tapPromise("AsyncPlugin", (compliation, cb) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("再等一秒");
                    resolve();
                }, 1000);
            });
        });
    }
}

module.exports = AsyncPlugin;
