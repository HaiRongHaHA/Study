/* 
    1、call和apply的区别是什么，那个性能更好一些？
    答：call的性能要比apply好那么一些（尤其是传递给函数的参数超出三个的时候），
    因为apply的参数格式导致其内部要多做判断和数据格式转换
    
    自己实现性能测试（仅供参考）：任何的代码性能测试都是和测试的环境有关系的，
    例如CPU、内存、GPU等电脑当前性能不会有相同的情况，不同浏览器也会导致性能上的不同
    console.time()测试一段程序执行的时间
*/

(function test1() {
    console.time('A');
    for (let i = 0; i < 100000; i++) {}
    console.timeEnd('A');
})();

/*  
    2、实现(5).add(3).minus(2)，使其输出结果为：6
*/
(function test2() {
    function check(n) {
        n = Number(n);
        return isNaN(n) ? 0 : n;
        /*
            以下代码错误，返回的是个表达式，n并没有转为number类型
            return (n = Number(n)) && (isNaN(n) ? 0 : n);
        */
    }
    function add(n) {
        console.log(this, 'this');
        // this是不能像变量一样去赋值的，所以 this+=n 是不行的
        n = check(n);
        return this + n;
    }
    function minus(n) {
        n = check(n);
        return this - n;
    }

    ['add', 'minus'].map(item => {
        Number.prototype[item] = eval(item);
    });
    console.log((5).add('3').minus(2));
})();

/* 
    3、箭头函数与普通函数的区别是什么？构造函数可以使用new生成实例
    那么箭头函数可以吗？为什么？
    (1)、箭头函数语法上比普通函数更简洁
    (2)、箭头函数没有自己的this，它的this是继承函数所处上下文中的this
    使用call|apply等任何方式都无法改变this指向
    (3)、箭头函数中没有arguments（类数组），只能基于...arg获取传递的参数集合（数组）
    (4)、箭头函数不能被new执行，因为它没有prototype也没有this
    // * 回调函数中的this一般都指向window
*/

(function test3() {
    let fn = (...arg) => {
        console.log(arg);
    };
})();

/* 
    4、如何把一个字符串的大小写取反，例如：'AbC'=>'aBc'
*/

(function test4() {
    let str = 'AI海容bCEf456HAhA';
    str = str.replace(/[a-zA-Z]/g, content => {
        return content.toUpperCase() === content
            ? content.toLowerCase()
            : content.toUpperCase();
    });
})();

/* 
    5、实现一个字符串匹配算法，从字符串S中，查找是否存在字符串T，若存在
    返回所在位置，不存在返回-1！（如果不能用indexOf/includes等内置方法）
*/

(function test5() {
    function indexOfMine(T) {
        /* 
            思路一：循环原始数组中的每一项，让每一项从当前位置向后截取T.length个字符，
            然后和T进行比较，如果不一样，继续循环：如果一样返回当前所有即可（循环结束）
        */
        // let Tlen = T.length,
        //     Slen = this.length,
        //     res = -1;
        // if (Slen < Tlen) return res;
        // for (let i = 0; i <= Slen - Tlen; i++) {
        //     if (this.substr(i, Tlen) === T) {
        //         res = i;
        //         break;
        //     }
        // }
        // return res;
        /* 
            思路二：正则捕获
        */
        let reg = new RegExp(T);
        let res = reg.exec(this);
        return res === null ? -1 : res.index;
    }
    String.prototype.indexOfMine = indexOfMine;
    const S = 'haironghaha';
    const T = 'ong';
    console.log(S.indexOfMine(T));
})();

/* 
    6、输出下面代码运行结果
*/
(function test6() {
    var aaa = {
        110: '哈哈',
        '110': '嘿嘿'
    };
    console.log(aaa); // 110: "嘿嘿"

    // example1
    var a = {},
        b = '123',
        c = 123;
    a[b] = 'b';
    a[c] = 'c';
    console.log(a[b]); // c

    // example2
    var a = {},
        b = Symbol('123'),
        c = Symbol('123');
    a[b] = 'b';
    a[c] = 'c';
    console.log(a[b]); // b

    // example3
    var a = {},
        b = { key: 123 },
        c = { key: 456 };
    a[b] = 'b';
    a[c] = 'c';
    /* 
        1、对象的属性名不能是一个对象（遇到对象名，会默认转字符串）
            obj = {}; arr=[12,23]; obj[arr]='海容'  obj=>{"12,23":"海容"}
        2、普通对象.toString() 调取的是Object.prototype上的方法（这个方法
        是用来检测数据类型的）
            obj={} obj.toString()=>"[object object]"
    */

    console.log(a[b]); // c //a is [object Object]: "c"
})();

/* 
    验证字符串是否符合url网址的格式
    let str = "http://www.baidu.com/?lx=1&from=wx#video"
    //=> url格式
    1.  协议:// http/https/ftp  (?:(http|https|ftp):\/\/)?
    2.  域名（不能省）          ((?:[\w-]+\.)+[a-z0-9]+)
        www.xxx.xx  www.baidu.com
        xxx.xx  baidu.com
        xxx.xxx.xx.xx.xx kbs.sports.com.cn
    3.  请求路径                (?:(\/[^/?#]*)+)?
        index.html
        stu/index.html
        stu/
    4.  问号传参                (\?[^#]+)?
        ?xxx=xxx&xxx=xxx
    5.  哈希值                  (#.+)
        #xxx
*/

(function test6() {
    let str = 'http://www.baidu.com/?lx=1&from=wx#video';
    let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
    console.log(reg.exec(str));
})();

/* 
    编写正则，一个6-16位的字符串，必须同时包含有大小写字母和数字
    负向预查——必须不能有什么
    正向预查——必须有什么
*/

(function test7() {
    let reg = /(?![a-zA-Z]+$)(?![a-z0-9]+$)(?![A-Z0-9]+$)(?![0-9]+$)^[a-zA-Z0-9]{6,16}$/;
})();

/* 
    编写正则，英文字母汉字组成的字符串，用正则给英文单词前后加空格
*/

(function test8() {
    let str = 'good好好Study天天Up天';
    let reg = /\b[a-z]+\b/gi;
    console.log(str.replace(reg, ' $& ').trim());
})();

/* 
    let arr1 = ['D1', 'D2', 'A1', 'A2', 'C1', 'C2', 'B1', 'B2'];
    let arr2 = ['B', 'A', 'D', 'C'];
    // 合并后数组为：['D1', 'D2', 'D', 'A1', 'A2', 'A','C1', 'C2','C', 'B1', 'B2','B']
*/

(function test9() {
    let arr1 = ['D1', 'D2', 'A1', 'A2', 'C1', 'C2', 'B1', 'B2'];
    let arr2 = ['B', 'A', 'D', 'C'];
    let eq = 0;
    arr2.map(item => {
        arr1.map((atem, index) => {
            if (atem.includes(item)) {
                eq = index;
            }
        });
        arr1.splice(eq + 1, 0, item);
    });
    // let arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    // let arr2 = ['A', 'B', 'C', 'D'];
    // arr2 = arr2.map(item => item + '3');
    // arr1 = arr1
    //     .concat(arr2)
    //     .sort((a, b) => a.localeCompare(b))
    //     .map(item => item.replace('3', ''));
    console.log(arr1, 'arr1');
})();

/* 
    循环定时器打印输出
    1、let存在块级作用域，每一次循环都会在当前块作用域中形成一个私有变量i
    当定时器执行的时候，所使用的i就是所处块作用域中的i
    2、闭包实现
*/
(function test9() {
    for (var i = 0; i < 10; i++) {
        /* 
            闭包1
            (function(i) {
                setTimeout(() => {
                    console.log(i);
                });
            })(i);
        */
        /* 
            闭包2
            setTimeout(
                (i => {
                    console.log(i);
                })(i),
                1000
            );
         */
        /* 
            基于bind预先处理机制：在循环的时候就把每次执行函数需要输出的结果，
            预先传给函数即可
                
            var fn = function(i) {
                console.log(i);
            };
            setTimeout(fn.bind(null, i), 1000);
        */
    }
})();

/* 
    下面代码打印输出什么
    1、本应匿名的函数如果设置了函数名，在外面还是无法调用，但在函数内可以使用
    2、而且类似于创建常量一样，这个名字存储的值不能再被修改（非严格模式下不报错，
    但是不会有任何效果，严格模式下直接报错，可以把匿名函数b理解为用const创建的）
*/
~(function test10() {
    var b = 10;
    (function b() {
        /*
            若想要该句打印20怎么做?（里面的b一定需是私有的，不能是全局的，声明或者改为形参）
            * 匿名函数若有函数名（不被法则认可的），若函数体有与函数名相同的声明名
            则会摒弃函数名以声明为准
        */
        b = 20;
        console.log(b); //函数
    })();
    console.log(b); // 10
})();

/* 
    var a = ?
    if (a == 1 && a == 2 && a == 3) {
        console.log('哈罗');
    }
    a 等于什么if判断才会执行？？
*/

(function test11() {
    /* 对象比较时会调toSting，添加私有toString方法++value
        var a = {
            n: 0,
            toString: function() {
                return ++this.n;
            }
        };
        if (a == 1 && a == 2 && a == 3) {
            console.log('哈罗');
        } 
    */
    /* 
        把删除第一项内容返回给toString方法
        let a = [1, 2, 3];
        a.toString = a.shift;
        if (a == 1 && a == 2 && a == 3) {
            console.log('哈罗');
        }
   */
    /*
        使用Object.defineProperty改写a属性的get方法
    */
    Object.defineProperty(window, 'a', {
        get: function() {
            this.value ? this.value++ : (this.value = 1);
            return this.value;
        }
    });
    if (a == 1 && a == 2 && a == 3) {
        console.log('哈罗');
    }
})();

/* 
    以下代码打印输出什么？
*/

(function test12() {
    /* 先理解push的实现
        Array.prototype.push = function(val) {
            this[this.length] = val;
            return ++this.length;
        }; 
    */
    let obj = {
        2: 3,
        3: 4,
        length: 2,
        push: Array.prototype.push
    };
    obj.push(1);
    obj.push(2);
    console.log(obj);
    /* 输出结果如下：
        {
            2: 1,
            3: 2,
            length: 4,    
            push: Array.prototype.push
        }
    */
})();

/* 
    某公司1到12月份的销售额存在一个对象里面
    如下：{
        1：222,
        2：123,
        5：888,
    }
    请把数据处理为如下结构：[222,123,null,null,888,null,null,null,null,null
    ,null,null,null]
*/

(function test13() {
    let obj = {
        1: 222,
        2: 123,
        5: 888
    };
    /* 
        let res = new Array(12)
        .fill(null)
        .map((item, index) => obj[index + 1] || null);
    */
    /* 
        let res = [];
        for (let i = 1; i <= 12; i++) {
            res.push(obj[i] || null);
        }
   */
    /* 
        obj.length = 12;
        let res = Array.from(obj)
            .slice(1)
            .map(item => {
                return typeof item === 'undefined' ? null : item;
            });
  */

    let res = new Array(12).fill(null);
    Object.keys(obj).map(item => (res[item - 1] = obj[item]));

    console.log(res);
})();
/* 
    交差并补
*/
(function test14() {
    // 交集
    let nums1 = [12, 23, 42, 61, 23, 23];
    let nums2 = [10, 42, 15, 23, 50];
    // => 输出结果[42,23]
    /*  
        let res = [];
        nums2.map(item2 => {
            nums1.map(item1 => {
                if (item2 === item1) {
                    res.push(item1);
                }
            });
        }); 
    */
    let res = nums2.reduce((prev, curr) => {
        if (nums1.includes(curr)) {
            prev.push(curr);
        }
        return prev;
    }, []);
    console.log(res, '交集');

    //差集：交集判断条件取反（大家都没有的）
    //并集：交集去重 [...new Set(res)]
    //补集：求第一个数组的补集=>把没有的加进来
})();

/* 
    旋转数组：给定一个数组，将数组中的元素向右移动k个位置，其中k是非负数
*/
(function test15() {
    // 得到结果=> [5,6,7,1,2,3,4]
    let arr = [1, 2, 3, 4, 5, 6, 7],
        k = 3;
    let res = arr.reduce((prev, curr, index) => {
        prev[(index + k) % arr.length] = curr;
        return prev;
    }, []);
    console.log(res);
})();
/* 
    思考题：[1]、实现each方法
    let arr = [10,20,30,'AA',40];
        obj = {};
    arr = arr.each(function (item,index){
        // => THIS: obj (each第二个参数不传，this是window即可)
        if(isNaN(item)){
            return false; //=> 如果return的是false，则结束当前循环数组的循环
        }
        return item*10 //=> 返回的结果是啥，就把数组中当前项替换成啥
    }, obj);
*/

(function test16() {
    Array.prototype.each = function(fn, obj) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i];
            const callback = fn.call(obj || window, element, i);
            if (callback === false) {
                break;
            }
            this[i] = callback || element;
        }
        return this;
    };
    let arr = [10, 20, 30, 'AA', 40];
    obj = {};
    arr = arr.each(function(item, index) {
        // => THIS: obj (each第二个参数不传，this是window即可)
        if (isNaN(item)) {
            return false; //=> 如果return的是false，则结束当前循环数组的循环
        }
        return item * 10; //=> 返回的结果是啥，就把数组中当前项替换成啥
    }, obj);
    console.log(arr, '实现each');
})();
/* 
    思考题：[2]、重写 replace 方法，实现和内置一样的效果（只需要考虑
    replace([REG], [CALLBACK])这中传参格式的处理）
    
    let str = 'hairong2019hairong2029';
    str = str.replace(/hairong/g, (...arg) => {
        // ARG中存储了每一次大正则匹配的信息和小分组匹配的信息
        return '@'; //=> 返回的是啥把当前正则匹配的内容替换成啥
    });

*/

(function test17() {
    String.prototype.replace2 = function(reg, fn) {
        if (!(reg instanceof RegExp)) {
            throw new TypeError('正则参数类型有误');
        }
        let _this = this.substring(0),
            isGlobal = reg.global,
            arr = reg.exec(_this);
        while (arr) {
            if (typeof fn === 'function') {
                let result = fn.call(this, arr),
                    big = arr[0],
                    index = arr.index;
                _this =
                    _this.substring(0, index) +
                    result +
                    _this.substring(index + big.length);
            }
            arr = reg.exec(_this);
            if (!isGlobal) break;
        }
        return _this;
    };
    let str = 'hairong2019hairong2029';
    str = str.replace2(/hairong/g, (...arg) => {
        // ARG中存储了每一次大正则匹配的信息和小分组匹配的信息
        return '@'; //=> 返回的是啥把当前正则匹配的内容替换成啥
    });
    console.log(str, '实现replace');
})();
