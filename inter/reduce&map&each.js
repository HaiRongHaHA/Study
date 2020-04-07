/* -------------------- forEach & map -------------------- */
Array.prototype.forEach2 = function (fn, thisArg) {
    if (typeof fn !== "function") {
        throw new TypeError(fn + "is not a function");
    }
    var O = Object(this),
        k = 0,
        len = O.length;
    while (k < len && k in O) {
        fn.call(thisArg, O[k], k, O);
        k++;
    }
};

Array.prototype.map2 = function (fn, thisArg) {
    if (typeof fn !== "function") {
        throw new TypeError(fn + "is not a function");
    }
    var O = Object(this),
        k = 0,
        len = O.length,
        result = new Array(len);
    while (k < len && k in O) {
        var mapperValue = fn.call(thisArg, O[k], k, O);
        result[k] = mapperValue;
        k++;
    }
    return result;
};

/* -------------------- filter -------------------- */
Array.prototype.filter2 = function (fn, thisArg) {
    if (typeof fn !== "function") {
        throw new TypeError(fn + "is not a function");
    }
    var O = Object(this),
        k = 0,
        len = O.length,
        newArr = [];
    while (k < len && k in O) {
        var item = O[k];
        fn.call(thisArg, item, k, O) ? newArr.push(item) : null;
        k++;
    }
    return newArr;
};

/* -------------------- reduce -------------------- */
Array.prototype.reduce2 = function (fn, initVal) {
    if (this.length < 1) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
    if (typeof fn !== "function") {
        throw new TypeError(fn + "is not a function");
    }
    let k = 0,
        O = Object(this),
        len = O.length,
        prev = initVal || O[k++];
    while (k < len && k in O) {
        prev = fn(prev, O[k], k, O);
        k++;
    }
    return prev;
};

/* -------------------- each -------------------- */

/* -------------------- 测试用例 -------------------- */
let arr = [1, 3, 4, 5, 6, 73, 2, 1, 46];
let obj = {
    name: "asb",
    1: 1,
    2: 2,
    3: 3,
};
let name = "window";

let filterArr = arr.filter2((item) => item > 10);
console.log(filterArr);

let add = arr.reduce2((prev, cur) => prev + cur);
console.log(add);
