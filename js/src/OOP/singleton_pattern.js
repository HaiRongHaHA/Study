/* 
    单例设计模式（singleton pattern）
    1、表现形式
    var obj = {
        xxx: xxx,
        ……
    };
    => 命名空间：给堆内存空间起个名字
    在单例模型中，obj不仅仅是对象名，它被称为命名空间[nameSpace]，把描述事物的属性
    放在命名空间中，多个命名空间是独立分开的，互不冲突
    2、作用
    => 把描述同一件事务的属性合特征进行分组、归类（存储在同一个堆内存
    空间中），因此避免了全局变量之间的冲突和污染
    3、单例设计模式命名的由来
    每一个命名空间都是JS中object这个内置基类的实例，而实例之间都是相互独立互不干扰的，
    所以我们称它为单例："单独的实例"
    => 单例模式一种抽象思想，不能局限到具体的某一种形式

*/

/* 
    高级单例模式 
    1、在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行
    匿名函数，形成一个私有作用域AA（不销毁的栈内存），在这个私有作用域当中
    创建一个堆内存，把堆内存地址赋值给命名空间
    2、这中模块的好处：我们完全可以在AA中创建很多内容（变量|函数），哪些需要
    供外面调取使用的，我们暴露到返回的对象当中（模块化实现的一种思想）
    var nameSpace = (function() {
        var n = 12;
        function fn() {
            // ……
        }
        function sum() {
            // ……
        }
        return {
            fn: fn,
            sum: sum
        };
    })();
*/

/* 
    习题
    => 自执行函数执行的时候，堆内存还没有存储完成键值对，和obj还没有关系，
    此时obj=undefined，obj.n会报错
    => 自执行函数执行
    1、实参初始化
    2、形参赋值
    3、变量提升
    4、代码执行

    var n = 2;
    var obj = {
        n: 3,
        fn: (function(n) {
            //=> n是自执行函数的形参
            n *= 2;
            this.n += 2;
            var n = 5;
            return function(m) {
                //=> n是上层作用域自执行函数的形参n
                this.n *= 2;
                console.log(m + ++n);
            };
        })(n)
        // => 自执行函数执行的时候，堆内存还没有存储完成键值对，和obj还没有关系，
        此时obj=undefined，obj.n会报错
    };
    var fn = obj.fn;
    fn(3); // 9
    obj.fn(3); // 10
    console.log(n, obj.n); // 8   6
*/

/* 
    模块化开发
    var utils = (function() {
        return {
            aaa: function() {
                // ……
            }
        };
    })();

    var modal1 = (function() {
        var fn = function() {
            // ……
        };
        return {
            init: function() {
                // ……
                fn();
                utils.aaa();
            }
        };
    })();
    modal1.init();

    var moda2 = (function() {
        return {
            init: function() {
                // ……
                modal1.init();
            }
        };
    })();
    moda2.init();
*/
