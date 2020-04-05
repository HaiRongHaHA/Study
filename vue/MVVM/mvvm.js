// 编译类
class Compiler {
    constructor(el, vm) {
        // 判断el属性是不是一个元素，如果不是元素那就获取它
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 把当前节点中的元素 获取到 放到内存中
        let fragment = this.nodeFragment(this.el);
        // 编译模板 用数据编译（把节点中的内容进行替换）
        this.compile(fragment);
        // 把编译后得内容再塞回到页面中
        this.el.appendChild(fragment);
    }
    // 是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
    // 是否是带有指令的属性
    isDirective(attrName) {
        /* 
            startsWith--->用来判断当前字符串是否以另外一个给定的子字符串开头，
            并根据判断结果返回 true 或 false。
        */
        return attrName.startsWith("v-");
    }
    // 把节点移到内存中
    nodeFragment(node) {
        // 创建一个文档碎片(内存)
        let fragment = document.createDocumentFragment();
        let firstChild;
        while ((firstChild = node.firstChild)) {
            /* 
                appendChild具有移动性，每append一个内存中就多一个，node中就少一个
            */
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    // 用来编译内存中的dom节点
    compile(node) {
        let childNodes = node.childNodes; // dom集合
        [...childNodes].map(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child);
                // 如果是元素的话 需要把自己传进去 再去遍历子节点
                this.compile(child);
            } else {
                this.compileText(child);
            }
        });
    }
    //编译元素的
    compileElement(node) {
        let attributes = node.attributes; // 类数组
        [...attributes].map(attr => {
            let { name, value: expr } = attr;
            if (this.isDirective(name)) {
                // v-model  v-html  v-bind v-on:click
                // let directive = /^v-(.+)$/.exec(name)[1];
                // /v-.+\:(.+)?/.exec;
                let [, directive] = name.split("-");
                let [directiveName, eventName] = directive.split(":");
                CompileUtil[directiveName](node, expr, this.vm, eventName);
            }
        });
    }
    //编译文本的
    compileText(node) {
        let content = node.textContent,
            reg = /\{\{(.+?)\}\}/; // 匹配花括号及内容 {{xxx}}
        // 判断当前文本节点中的内容是否包含 {{xxx}} 包含则调用修改dom内容方法
        reg.test(content) && CompileUtil["text"](node, content, this.vm);
    }
}

CompileUtil = {
    getVal(vm, expr) {
        // 根据表达式取到对应得数据  'school.name' [school,name]
        return expr.split(".").reduce((data, curr) => {
            return data[curr];
        }, vm.$data);
    },
    setVal(vm, expr, value) {
        // vm.$data 'school.name' = '海容'
        expr.split(".").reduce((data, curr, index, arr) => {
            if (index === arr.length - 1) {
                return (data[curr] = value);
            }
            return data[curr];
        }, vm.$data);
    },
    /* 
        解析v-model指令
        node: 节点
        expr: 表达式
        vm:   当前实例
    */
    model(node, expr, vm) {
        //给输入框赋予value属性 node.value = xx
        let fn = this.updater["modalUpdater"];
        // 给输入框加观察者（如果数据更新了会触发子方法，会拿新值给输入框赋值）（核心 把模板编译和数据结合一起）
        new Watcher(vm, expr, newVal => {
            fn(node, newVal);
        });
        node.addEventListener("input", e => {
            let value = e.target.value; // 获取用户输入的内容
            this.setVal(vm, expr, value);
        });
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    getContentValue(vm, expr) {
        // 遍历表达式将内容重新替换成一个完整的内容返还回去
        return expr.replace(/\{\{(.+?)\}\}/g, (...arg) => {
            return this.getVal(vm, arg[1]);
        });
    },
    text(node, expr, vm) {
        let fn = this.updater["textUpdater"];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...arg) => {
            // 给每个表达式都加上观察者（核心 把模板编译和数据结合一起）
            new Watcher(vm, arg[1], () => {
                fn(node, this.getContentValue(vm, expr));
            });
            return this.getVal(vm, arg[1]);
        });
        fn(node, content);
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, e => {
            vm[expr].call(vm, e);
        });
    },
    updater: {
        // 把数据插入到节点中
        modalUpdater(node, value) {
            node.value = value;
        },
        // 处理文本节点
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
};

// 数据劫持类
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (data && typeof data === "object") {
            for (const key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(obj, key, value) {
        this.observer(value); // 如果value是对象再递归进行监控
        let dep = new Dep(); // 给每个属性都加上一个具有发布订阅的功能
        Object.defineProperty(obj, key, {
            get() {
                // 创建watcher时，会取到对应的内容，并且把watcher发到全局上（核心 把模板编译和数据结合一起）
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: newVal => {
                if (newVal !== value) {
                    this.observer(newVal); // 设置了新对象也要进行监控
                    value = newVal;
                    dep.notify(); //（核心 把模板编译和数据结合一起）
                }
            }
        });
    }
}
// 订阅
class Dep {
    constructor() {
        this.subs = []; // 存放所有的watcher
    }
    // 订阅
    addSub(watcher) {
        // 添加watcher
        this.subs.push(watcher);
    }
    // 发布(提醒)
    notify() {
        this.subs.map(watcher => watcher.update());
    }
}

//  观察者 （发布订阅）     观察者 <-- 被观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 默认先存放一个老值
        this.oldVal = this.get();
    }
    get() {
        Dep.target = this; // 取值之前，先把自己this放在全局的Dep类上（核心 把模板编译和数据结合一起）
        /* 
            取值的时候，Dep上的target属性就是当前自己，再把这个观察者放到自己的这个数据里面，
            只要之后这个数据一更新就通知(notify)观察者执行(update)回调 
            (把watcher放到对应数据上,某一个数据变化只会对应更新某一个watcher,,不是把所有watch都存到
            一个数组里(一个数据变了都执行),而是某个数据变了去执行这个数据对应的watcher(实现了一对多的关系),
            例如: school: [watcher, watcher] text1: [watcher], school或者text1变了都不影响对方)
        */
        let value = CompileUtil.getVal(this.vm, this.expr);
        Dep.target = null; // 去完值以后就要把target取消掉(如果不取消任何值取值都会添加watcher从而造成重复)
        return value;
    }
    update() {
        // 更新操作 数据变化后会调用观察者的update方法
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if (newVal !== this.oldVal) {
            this.cb(newVal, this.oldVal);
        }
    }
}

// 基类 调度
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        // 根元素存在，编译模板
        if (this.$el) {
            // 把数据全部转化成用Object.defineProperty来定义
            new Observer(this.$data);
            // 将computed对象里的属性挂到$data上
            this.setComputed(options.computed);
            // 把数据获取操作 vm上的取值操作 都代理到vm.$data
            this.proxyVm(this.$data);
            this.proxyVm(options.methods);
            // 编译
            new Compiler(this.$el, this);
        }
    }
    setComputed(computed) {
        for (const key in computed) {
            // 有依赖关系
            Object.defineProperty(this.$data, key, {
                get: () => {
                    return computed[key].call(this);
                }
            });
        }
    }
    proxyVm(data) {
        // vm. vm.$data     拦截 代理
        for (const key in data) {
            // 实现可以通过vm取到对应的内容
            Object.defineProperty(this, key, {
                get() {
                    return data[key]; // 进行转换
                },
                set(newVal) {
                    // 设置代理
                    data[key] = newVal;
                }
            });
        }
    }
}
