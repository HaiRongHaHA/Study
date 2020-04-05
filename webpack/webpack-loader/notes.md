> ## loader 的引入方式

```
1) 直接引入模块
use: path.resolve(__dirname, "loaders", "loader1")

2)
resolveLoader: {
    // node_modules文件夹找不到就往loaders文件夹找
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
}
use: "loader1"

3)
resolveLoader: {
    alias: {  // 配置别名
        loader1: path.resolve(__dirname, "loaders", "loader1")
    }
}
use: "loader1"

```

> ## loader 配置

```
loader的写法：数组写法或对象写法
loader默认顺序：从右向左、从下到上
loader的分类：pre(在前执行)、post(在后执行)、normal
loader的执行顺序：pre->normal->inline->post

行内loader：
let str = require("!!inline-loader!./a");
-! 不会让文件再去通过pre+normal来处理了
! 没有normal执行
!! 什么都不要只要inline执行

每个loader都有两部分组成pitchLoader和normalLoader,pitch和normal的执行顺序相反，当pitch没有定义或者没有返回值时，会先执行pitch再获取资源执行loader，如果定义的某个pitch有返回值则会跳过读取资源和自己的loader。(pitch阻断功能)

例：use:[loader3,loader2,loader1]
会先执行pitch：loader3->loader2->loader1
再执行normal：loader3<-loader2<-loader1

若pitch有返回值（loader2的pitch有返回值）
会先执行pitch：loader3->loader2(跳过所有后续包含自身loader)执行前一个normal(loader3)


loader的特点：
第一个loader要返回js脚本
每个loader只做一件内容，为了使loader在更多场景链式调用
每一个loader都是一个模块
每个loader都是无状态的，确保loader在不同模块转换之间不保存状态

```
