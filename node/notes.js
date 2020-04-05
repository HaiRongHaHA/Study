/* 
>## node 中的全局对象

浏览器  window对象
浏览器无法直接访问global对象(所以需要window来代理)
=> 在node中可以直接访问global对象, node中每次执行只有一个global
=>  默认声明的属性是不放在global上的, 不是重要特定的属性不要放在global上
=>  node特点: 每个文件都是一个模块, 模块外面包了个匿名函数
    匿名函数的参数: require,exports,moudle,__filename,__dirname(可以全局访问)

=>  global中的属性是全局属性:
        process(进程): 开启很多个线程(js是单线程)
            platform(平台)
            argv(代表用户传递的参数)
                默认前两个参数没有实际意义
                执行node: node + 文件名执行
                参数执行node: 只能通过命令 + 文件名 + 参数(n个)
                取参数: process.argv.slice(2)
                npm包commander(包命令行的管家)
            pid(进程id)
            chdir()
            cwd(当前工作目录) current working directory
            env(环境变量)
            nextTick(node中的微任务)
        Buffer(缓冲区): node读取文件读的是内存中的数据(都是二级制)
        Buffer并不是真正的二级制,因为二级制很长,Buffer里把二级制变成了16进制
        宏任务:
            clearInterval setInterval
            clearTimeout setTimeout
            clearImmediate setImmediate

>## node 中的事件循环
   ┌───────────────────────────┐
┌─>│           timers          │    本阶段执行setTimeOut() 和 setInterval()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │    本阶段执行一些诸如TCP错误之类的系统操作的回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │    只内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │     获取新的I/O事件，查找已到时的定时器
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │    setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │    关闭事件的回调 socket.close事件
   └───────────────────────────┘


 */
