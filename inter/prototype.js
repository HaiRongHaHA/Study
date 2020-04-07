/* ----------- Object.create 模拟实现 ----------- */
console.log("/* ----------- Object.create 模拟实现 ----------- */ ");

Object.prototype.create2 = function (obj) {
    let f = function () {};
    f.prototype = obj;
    return new f();
};

let abc = {
    a: 12,
    b: "23",
};

console.log(Object.create2(abc), "create2");
console.log(Object.create(abc), "create");

/* ----------- new 构造调用函数 模拟实现 ----------- */
console.log("/* ----------- new 构造调用函数 模拟实现 ----------- */");

var objFactory = function () {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === "object" ? ret : obj;
};

function Person(name, age) {
    this.name = name;
    return {
        age: age,
    };
}
Person.prototype.getName = function () {
    return this.name;
};
var a = objFactory(Person, "海容", 18);
console.log(a);
