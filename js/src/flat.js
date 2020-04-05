/* 
    编写一个程序，将数组扁平化，最终得到一个升序且不重复的数组
*/

let arr = [[1, 2, 3], [3, 4, [2, 12], 5], [6, 7, [11, 12, [14]]], 10];

/* 
    方案一：es6方法 flat扁平化数组
*/
function flat1(arr) {
    return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
}

/* 
    方案二：数组变为字符串
*/
function flat2(arr) {
    return arr
        .toString()
        .split(',')
        .map(item => Number(item));
}

/* 
    方案三：JSON.stringify+正则
*/
function flat3(arr) {
    let res = JSON.stringify(arr)
        .replace(/(\[|\])/g, '')
        .split(',')
        .map(item => Number(item));
    return res;
}

/* 
    方案四：some
*/
function flat3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
/* 
    方案五：递归
*/
function flat4(arr) {
    let res = [];
    let fn = arr => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (Array.isArray(item)) {
                fn(item);
                continue;
            }
            res.push(item);
        }
    };
    fn(arr);
    return res;
}

console.log(flat4(arr));
