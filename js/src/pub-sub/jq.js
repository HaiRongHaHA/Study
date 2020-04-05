import $ from 'jquery';
let $pond1 = $.Callbacks();
let fn1 = function() {
    console.log(1);
};
let fn2 = function() {
    console.log(2);
};
let fn3 = function() {
    console.log(3);
};
$pond1.add(fn1);
$pond1.add(fn2);
$pond1.add(fn2); //=> jq中没有做去重处理
$pond1.add(fn3);

setTimeout(() => {
    $pond1.fire(100, 200);
}, 1000);

let fn4 = function(n, m) {
    console.log(4, n, m);
};
$pond1.add(fn4);

$pond1.remove(fn2);
