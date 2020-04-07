// Object.assign 原理及其实现
if (typeof Object.assignCopy != "function") {
    Object.defineProperty(Object, "assignCopy", {
        value: function (target) {
            "use strict";
            if (target == null) {
                throw new TypeError("不能拼接null||undefined对象");
            }
            let returnObj = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var next = arguments[i];
                if (next != null) {
                    for (var key in next) {
                        if (Object.prototype.hasOwnProperty.call(next, key)) {
                            returnObj[key] = next[key];
                        }
                    }
                }
            }
            return returnObj;
        },
        writable: true,
        configurable: true,
    });
}

let originObj = {
    a: 222,
    c: "ccc",
};
let testObj = Object.create(null);
testObj.b = "bbb";

console.log(Object.assignCopy(originObj, testObj));

/*  -------------  深拷贝 ------------- */

// 1、简单实现
function deepClone1(source) {
    let clone = {};
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === "object") {
                clone[key] = deepClone1(source[key]);
            } else {
                clone[key] = source[key];
            }
        }
    }
    return clone;
}

// 2、拷贝数组、对象判断
function isObject(obj) {
    return typeof obj === "object" && obj != null;
}

function deepClone2(source) {
    if (!isObject(source)) return source;
    let clone = Array.isArray(source) ? [] : {};
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                clone[key] = deepClone2(source[key]);
            } else {
                clone[key] = source[key];
            }
        }
    }
    return clone;
}
/* ------------- 3、循环引用  -------------  */

// ES6实现
function deepClone3(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    let clone = Array.isArray(source) ? [] : {};
    hash = hash.set(source, clone);

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                clone[key] = deepClone3(source[key], hash);
            } else {
                clone[key] = source[key];
            }
        }
    }
    return clone;
}

// ES5实现
function deepClone3(source, uniqueList) {
    if (!isObject(source)) return source;
    if (!uniqueList) uniqueList = [];

    let clone = Array.isArray(source) ? [] : {};

    let uniqueData = find(uniqueList, source);
    if (uniqueData) {
        return uniqueData.clone;
    }

    uniqueList.push({
        source: source,
        clone: clone,
    });
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                clone[key] = deepClone3(source[key], uniqueList);
            } else {
                clone[key] = source[key];
            }
        }
    }
    return clone;
}

function find(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }
    return null;
}

/* -------------  4、拷贝Symbol  -------------  */

// 方法一
function deepClone4(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    let clone = Array.isArray(source) ? [] : {};
    hash = hash.set(source, clone);

    let symKeys = Object.getOwnPropertySymbols(source);
    if (symKeys.length) {
        symKeys.map((symkey) => {
            if (isObject(source[symkey])) {
                clone[symkey] = deepClone4(source[symkey], hash);
            } else {
                clone[symkey] = source[symkey];
            }
        });
    }

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                clone[key] = deepClone4(source[key], hash);
            } else {
                clone[key] = source[key];
            }
        }
    }
    return clone;
}

// 方法二
function deepClone4(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    let clone = Array.isArray(source) ? [] : {};
    hash = hash.set(source, clone);
    Reflect.ownKeys(source).map((key) => {
        if (isObject(source[key])) {
            clone[key] = deepClone4(source[key], hash);
        } else {
            clone[key] = source[key];
        }
    });
    return clone;
}

/* -------------  5、破解递归爆栈  -------------  */

function deepClone5(source) {
    const root = {};
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: source,
        },
    ];

    while (loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;
        let hash = node.hash || new WeakMap();
        if (hash.has(data)) {
            parent[key] = hash.get(data);
            continue;
        }
        let res = parent;
        if (typeof key !== "undefined") {
            res = parent[key] = Array.isArray(data) ? [] : {};
            hash = hash.set(data, res);
        }
        Reflect.ownKeys(data).map((k) => {
            if (isObject(data[k])) {
                loopList.push({
                    parent: res,
                    key: k,
                    data: data[k],
                    hash: hash,
                });
            } else {
                res[k] = data[k];
            }
        });
    }
    return root;
}

// 测试用例
let obj = { obj: "我是obj" };
let a = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45",
    },
    pages: [1, 2, 4, 5],
    a1: undefined,
    a2: null,
    a3: 123,
    obj1: obj,
    obj2: obj,
    fn: function aa() {},
};
let sym1 = Symbol("a");
a[sym1] = "localSymbol";
a.circleRef = a;

let b = deepClone5(a);

var abc = function qq() {};
var efg = abc;
abc = function ee() {};
console.log(efg);

// console.log(b)
