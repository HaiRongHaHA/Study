/* 
    闭包两大作用：保护、保存
    函数柯里化：预先处理思想（利用闭包机制——闭包保存作用）
    bind的实现就是预先处理思想(柯里化函数编程思想)
*/
(function() {
    //柯里化函数编程思想
    function myBind(context = window, ...outArg) {
        //=> this: 需要改变this的函数
        //=> context:需要改变的this指向
        //=> outeArg:其余需要传递给函数的实参信息
        let _this = this;
        return function(...innerArg) {
            _this.call(context, ...outArg.concat(innerArg));
        };
    }
    Function.prototype.myBind = myBind;

    let obj = {
        name: 'OBJ'
    };
    function fn(...arg) {
        console.log(arg, 'arg', this);
    }
    document.body.style.height = 500 + 'px';
    document.body.onclick = fn.myBind(obj, 100, 200);
})();

/* 
    请实现一个add函数，满足以下功能
    add(1); //1
    add(1)(2);  //3
    add(1)(2)(3);   //6
    add(1)(2)(3)(4);    //10
    add(1)(2,3);    //6
    add(1,2)(3);    //6
    add(1,2,3);     //6
*/

function currying(fn, length) {
    // 函数的length就是函数参数的个数
    length = length || fn.length;
    return function(...args) {
        if (args.length >= length) {
            return fn(...args);
        }
        // 柯里化函数的递归(闭包套闭包)一直call方法return函数直到最底下执行的那层函数
        return currying(fn.bind(null, ...args), length - args.length);
    };
}

function $add(...args) {
    return args.reduce((prev, curr) => {
        return (prev += curr);
    }, 0);
}

let add = currying($add, 4);
console.log(add(1, 4, 3, 4, 6));
console.log(add(1, 2, 1)(3, 4));
console.log(add(1, 2)(3)(4));
console.log(add(1)(2)(3)(4));
