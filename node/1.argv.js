/*
    var a = 1;
    console.log(this);
    console.log(this === module.exports);
    (function() {
        console.log(Object.keys(this));
    })();
    console.log(process);   
*/

const program = require("commander"); // 添加命令
const chalk = require("chalk"); // 粉笔 命令行颜色
// 解析用户的参数
program // 配置命令 输入命令后执行内容
    .command("create")
    .alias("c")
    .description("create project")
    .action(() => {
        console.log("create project");
    });
program // 配置属性 给代码传递参数
    .option("-p --port <val>", "set port")
    .version("1.0.0");
program
    .on("--help", () => {
        console.log("\r\nExamples");
        console.log("   node 1.js --help");
        console.log("   node 1.js " + chalk.green("create project"));
    })
    .parse(process.argv);

console.log(program.port);
