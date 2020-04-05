const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const types = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const ejs = require("ejs");
const { SyncHook } = require("tapable");
/* 
    babylon  主要就是把源码转化成AST
    @babel/traverse  遍历节点
    @babel/types     替换节点
    @babel/generator 替换的节点生成
*/
class Compiler {
    constructor(config) {
        this.config = config;
        // 1、需要保存入口文件得路径
        this.entryId; //  './src/index.js'
        // 2、需要保存所有得模块依赖
        this.modules = {};
        this.entry = config.entry; // 入口路径
        this.root = process.cwd(); // 当前文件工作路径
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        };
        // 如果传递了plugins参数
        let plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.map(plugin => {
                plugin.apply(this);
            });
        }
        this.hooks.afterPlugins.call();
    }
    // 获取源码
    getSource(modulePath) {
        let rules = this.config.module.rules;
        let content = fs.readFileSync(modulePath, "utf-8");
        // 拿到每个规则来处理
        rules.map(rule => {
            let { test, use } = rule;
            let len = use.length - 1;
            // 这个模块需要通过loader来转化
            if (test.test(modulePath)) {
                function normalLoader() {
                    // loader获取对应得loader函数
                    let loader = require(use[len--]);
                    // 递归调用loader实现转化功能
                    content = loader(content);
                    if (len >= 0) {
                        normalLoader();
                    }
                }
                normalLoader();
            }
        });
        return content;
    }
    // 解析源码
    parse(source, parentPath) {
        // AST解析语法树
        let AST = babylon.parse(source);
        let dependencies = []; //依赖的数组
        traverse(AST, {
            CallExpression(p) {
                // 调用表达式 a() require()
                let node = p.node; //对应的节点
                if (node.callee.name === "require") {
                    node.callee.name = "__webpack_require__";
                    let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字
                    moduleName =
                        moduleName + (path.extname(moduleName) ? "" : ".js"); // ./a.js
                    moduleName = "./" + path.join(parentPath, moduleName);
                    dependencies.push(moduleName);
                    node.arguments = [types.stringLiteral(moduleName)];
                }
            }
        });

        let sourceCode = generator(AST).code;
        return { sourceCode, dependencies };
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 模块id modulePath 总路径-工作路径=相对路径 src/index.js
        let moduleName = "./" + path.relative(this.root, modulePath);

        if (isEntry) {
            this.entryId = moduleName; // 保存入口名字
        }
        // 解析需要把source源码进行改造，返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(
            source,
            path.dirname(moduleName) // 解析父路径 ./src
        );

        // 把相对路径和模块中的内容对应起来key：value
        this.modules[moduleName] = sourceCode;

        dependencies.map(dep => {
            //附模块的递归加载
            this.buildModule(path.join(this.root, dep), false);
        });
    }
    emitFile() {
        // 拿到输出得哪个目录下 输出路径
        let main = path.join(
            this.config.output.path,
            this.config.output.filename
        );
        // 模板路径
        let templateStr = this.getSource(path.join(__dirname, "main.ejs"));
        let code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        });
        this.assets = {};
        // 资源中路径对应得代码
        this.assets[main] = code;
        fs.writeFileSync(main, this.assets[main]);
    }
    run() {
        this.hooks.run.call();
        this.hooks.compile.call();
        // 执行并创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompile.call();
        // 发射一个文件 打包后的文件
        this.emitFile();
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler;
