import str from "./source";

//  当这个路径这个模块更新了，执行某个方法
if (module.hot) {
    // NamedModulesPlugin的作用
    module.hot.accept("./source", () => {
        console.log("文件更新了");
        let str = require("./source");
        console.log(str);
        // 每次更新都重新启用这个模块
    });
}
/* 
    强制更新
    热更新    
*/
