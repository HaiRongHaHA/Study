/* -------------------- call -------------------- */
Function.prototype.call2 = function (context) {
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let args = [...arguments].slice(1);
    let result = context[fn](...args);
    delete context[fn];
    return result;
};

/* -------------------- apply -------------------- */
Function.prototype.apply2 = function (context, args) {
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let result = !args ? context[fn]() : context[fn](...args);
    delete context[fn];
    return result;
};
/* -------------------- bind -------------------- */
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new TypeError("bind必须是一个函数");
    }
    let _this = this,
        args = [...arguments].slice(1),
        fNOP = function () {},
        fBound = function () {
            let bindArgs = [...arguments];
            return _this.apply(this instanceof fBound ? this : context, [
                ...args,
                ...bindArgs,
            ]);
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};
/* -------------------- 测试用例 -------------------- */
var value = "window";
var foo = {
    value: "foo",
};

function bar(a, b, c) {
    this.name = "海容";
    console.log(this.value, a, b, c);
}
bar.prototype.habit = "吃饭";

bar.call2(foo, 1, 3, 5);
bar.apply2(foo, ["aa", "bb", 123]);

let barBind = bar.bind2(foo, "bind");
let newBind = new barBind("new的");
bar.prototype.aa = "11";
barBind("直接执行的", "haha");
