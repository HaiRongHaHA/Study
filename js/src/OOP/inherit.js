/* 
    封装：低耦合高内聚
    多态：重载和重写
        重载：方法名相同，形参个数或者类型不一样(js中不存在真正意义上的重载，js中重载指的是
            同一个方法，根据传参不同，实现出不同效果)
        重写：在类的继承中，子类可以重写父类中的方法    
    继承：子类继承父类中的属性和方法(目的是让子类的实例能够调取父类的属性和方法)
*/
/* 
    继承方案一：原型继承
        让父类中的属性和方法在子类实例的原型链上
        Child.prototype = new Parent()
        Child.prototype.constructor = Child
        // 一个对象的原型重定向之后就要手动加一个constructor以保证它的完整性
        
    特点：
        1、不像其他语言中的继承一样（其他语言中一般是拷贝继承，也就是子类继承父类，会
            把父类中的属性和方法拷贝一份到子类中，供子类的实例调取使用）(拷贝性继承)。
            js是把父类的原型放到子类实例的原型链上，实例想调取这些方法，是基于原型链查找
            机制完成的(查找性继承)
        3、其他语言中重写只是重写的拷贝过来的属性和方法，并不会影响父类的属性和方法。
            而js中子类可以重写父类上的方法（这样导致父类其他的实例也受到影响）
        3、父类中私有或公有的属性方法，最后都会变为子类中公有的属性和方法

    function A(x) {
        this.x = x;
    }

    A.prototype.getX = function() {
        console.log(this.x);
    };

    function B(y) {
        this.y = y;
    }

    B.prototype = new A(200);
    B.prototype.constructor = B; // 原型重定向之后的完整性
    B.prototype.getY = function() {
        console.log(this.y);
    };

    let b1 = new B(100);
    console.log(b1.y);
    console.log(b1.x);
    b1.getY();
    b1.getX();
*/

/* 
    继承方案二：CALL继承
        Child方法中把Parent当作普通函数执行，让Parent中的this指向Child的实例，
        相当于给Child的实例设置了很多私有的属性或方法
    特点：
        1、只能继承父类私有的属性或方法（因为是把Parent当作普通函数执行，和其原型
        上的属性和方法没有关系）
        2、父类私有变为子类私有的
    
    function A(x) {
        this.x = x;
    }

    A.prototype.getX = function() {
        console.log(this.x);
    };

    function B(y) {
        //=>this: B的实例b1
        A.call(this, 200); // b1.x = 200;
        this.y = y;
    }

    B.prototype.getY = function() {
        console.log(this.y);
    };

    let b1 = new B(100);
    console.log(b1.x)
    b1.getY();
    b1.getX();
*/

/* 
    继承方案二：寄生组合继承（在没有ES6之前这个方案比较常用）
        CALL继承+类似于原型继承
    特点：
        1、父类私有和公有分别是子类实例的私有和公有属性方法（推荐）
    
    function A(x) {
        this.x = x;
    }

    A.prototype.getX = function() {
        console.log(this.x);
    };

    function B(y) {
        //=>this: B的实例b1
        A.call(this, 200); // b1.x = 200;
        this.y = y;
    }
    //=>Object.create(obj)：创建一个空对象(函数对象)，让它的__proto__指向obj
    B.prototype = Object.create(A.prototype);
    B.prototype.constructor = B;
    B.prototype.getY = function() {
        console.log(this.y);
    };

    let b1 = new B(100);
    console.log(b1.x);
    b1.getY();
    b1.getX();
*/

/* 
    —————————————————————————————ES5原型继承习题—————————————————————————————————
    function Fn() {
        var n = 10;
        this.m = 20;
        this.aa = function() {
            console.log(this.m);
        };
    }

    Fn.prototype.bb = function() {
        console.log(this.n);
    };

    var f1 = new Fn();

    Fn.prototype = {
        aa: function() {
            console.log(this.m + 10);
        }
    };
    var f2 = new Fn();

    console.log(f1.constructor); // Fn
    console.log(f2.constructor); //  object

    f1.bb(); // this->f1 => fn.n = undefined
    f1.aa(); // this->f1 => fn.m = 20
    // f1.__proto__.aa(); // f1.aa is not a function
    // f2.bb(); //  f2.bb is not a function
    f2.aa(); // this->f2 => f2.m = 20
    f2.__proto__.aa(); // this->f1.__proto__ => f2.__proto__.m+10 = undefined+10 = NaN

    —————————————————————————————END—————————————————————————————————
*/

/* 
    ES6中基于class创造出来的类不能当作普通函数执行(call继承就不能玩了),只能通过new执行
    不允许重定向原型的指向
*/

class A {
    constructor(x) {
        this.x = x;
    }
    getX() {
        console.log(this.x);
    }
}
//=> class Child extends Parent{} => B.prototype.__proto__ = A.prototype
class B extends A {
    constructor(y) {
        /* 
            子类只要继承父类，可以不写constructor，一旦写了，
            则在constructor中的第一句话必须是super() 
            如果不写constructor，浏览器会自己默认创建
            （constructor(...args) {super(...args)}）
        */
        super(200);
        /* 
            A.call(this,200) 把父类当作普通方法执行，
            给方法传递参数，让方法中的this是子类的实例
        */
        this.y = y;
    }
    getY() {
        console.log(this.y);
    }
}
let b1 = new B(100);
console.log(b1);
