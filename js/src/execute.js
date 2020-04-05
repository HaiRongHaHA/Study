/* 
    EC(STACK)执行环境栈
    EC(GLOBAL)全局执行上下文
        GO: 全局对象(浏览器提供得内置对象)，默认window指向GO
        全局变量不放在GO属性中
        VO: 变量对象：用来存储当前上下文中的变量
        函数名也是变量和let|var创建变量本质上是一样的(引用类型的)，
        区别是存得值是function类型，函数里面会存代码字符串(函数特点)、
            键值对(对象特点，存储的东西如下)
            length：1 形参个数
            name:'fn' 函数名称
            prototype: __原型
            ……
        每一个函数执行都有形成一个全新的执行上下文EC(xxx)
        函数执行形成的AO(活动对象)：
            1、初始化实参集合(argument)
                argument={}(类数组集合)
            2、创建形参变量并赋值
            3、代码执行
            非严格模式下1和3会建立映射关系，es6箭头函数中没有实参集合
            4、执行完后当前执行上下文出栈销毁（闭包不能出栈销毁所以会压入到栈底）

        
    代码自下而上执行，
    变量声明=>
    1、创建变量(declare)
    2、创建值（基本类型值存栈内存，引用类型得先开辟一个堆内存，把堆内存16进制地址赋值给变量）
    3、赋值（defined将值与变量关联）
    执行上下文里变量对象中的变量都是私有的
*/

/*  // 打印输出
    let a = {
        n: 1
    };
    let b = a;
    a.x = a = {
        n: 2
    };
    // => 同等级运算符都是从左到右（MDN运算符优先级)
    // => 先创建{n:2}内存地址，然后a.x指向这个地址，之后a指向这个地址
    console.log(a.x);
    console.log(b);
*/

/* 
    let x = [12, 23];
    function fn(y) {
        y[0] = 100;
        y = [100];
        y[1] = 200;
        console.log(y); // [100, 200]
    }
    fn(x);
    console.log(x); // [100, 23]
*/

/* 
    var x = 10;
    ~function(x) {
        console.log(x); // undefined
        x = x || 20 && 30 || 40;
        console.log(x); // 30
    }();
    console.log(x); // 10
*/

/* 
    // 区分这两个写法的区别
    let x = 10,
        y = 20;
    // let x;
    // let y;
    let x = y = 20;
    // let x;
    // y;
*/

/*
    let x = [1, 2],
        y = [3, 4];
    ~(function(x) {
        x.push('A');
        x = x.slice(0); // 简易的数据浅克隆(开辟新堆内存)
        x.push('B');
        x = y;          // y不是私有，查找上级作用域
        x.push('C');
        console.log(x, y); // [3,4,'C'], [3,4,'C']
    })(x);
    console.log(x, y);  // [1,2,'A'], [3,4,'C']
*/
/* ——————————————————————————————————————————————————————— */
/* 
函数创建的时候：
    1、创建了一个堆（存储代码字符串和对应的键值对）
    2、初始化了当前函数作用域[[scope]]
    [[scope]]: 所在上下文中的变量对象VO|AO
函数执行的时候：
    1、创建一个新的执行上下文（压缩到栈里执行）
    2、初始化this指向
    3、初始化作用域链
    [[scopeChain]]: <xxx, xxx> eg: <AO(A), A[[scope]]> // 作用域链
    4、创建AO活动对象来存储变量
    => arguments    => 形参    => 代码执行
    
闭包：当前上下文的堆被占用了，不能出栈销毁（形成闭包）
保护当前执行上下文中私有对象
保存当前执行上下文
this执行主体：谁把他执行
第一种：函数执行，看前面是否有"点", 有前面是谁就是谁，没有this就是window（严格模式
下是undefined）
第二种：给元素的事件行为绑定方法（DOM0/DOM2）,事件触发，方法会执行，此时方法中的this一般
都是当前元素本身

*/
/* 
    let x = 5;
    function fn(x) {
        return function(y) {
            console.log(y + ++x);
        };
    }
    let f = fn(6);
    f(7); // 14 VO(f)中的x=7        执行销毁
    fn(8)(9); // 18 AO(fn)中的x=9             执行销毁
    f(10); // 18    VO(f)中的x=8    执行销毁
    console.log(x); // 5 
*/

/* 
    let x = 5;
    function fn() {
        return function(y) {
            console.log(y + ++x);
        };
    }
    let f = fn(6);
    f(7); // 13 x=6
    fn(8)(9); // 16 x=7
    f(10); // 18 x=8
    console.log(x); // 8
*/
/* 
    let a = 0,
        b = 0;
    function A(a) {
        A = function(b) {
            alert(a + b++);
        };
        alert(a++);
    }
    A(1); // "1" 这次函数执行时把A指向了alert(a+b++)这个函数
    A(2); // "4"
*/

/* 

    var x = 3,
        obj = { x: 5 };
    obj.fn = (function() {
        this.x *= ++x;
        return function(y) {
            this.x *= (++x) + y;
            console.log(x);
        };
    })();

    // node环境下全局对象是global，所以与浏览器执行条件不一样
    var fn = obj.fn; //this<window>.x = NaN window.x=4
    obj.fn(6); // this<obj>.x = 55  window.x=5   // 打印5
    fn(4); // this<window>.x = NaN  window.x=6 // 打印6
    console.log(obj.x, x); // 55  6

    // 浏览器下打印输出如下：
    var fn = obj.fn; //this<window>.x = 12
    obj.fn(6); // this<obj>.x = 95  window.x=13   // 打印 13
    fn(4); // this<window>.x = 234(13*14+4(18))  window.x=14 // 打印 234
    console.log(obj.x, x); // 95  234
*/

/* ——————————————————————————————————————————————————————— */
/*
    box.style.color = 'red'
    => 修改的是堆内存中的值（只要堆内存中的值被修改，浏览器会基于DOM映射机制
    把页面中的元素进行重新渲染）
    let AA = body.style;    // 可行
        AA.color = "blue"  // 修改堆中的信息，有效果
    let BB = box.style.color = 'green'   // 不可行的
        BB = "green"  // 修改的不是堆中信息，不起作用

*/
