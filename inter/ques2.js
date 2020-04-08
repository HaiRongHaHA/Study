// 正则获取url params
console.log("————————————————— 正则获取url params —————————————————");
function getUrlParams() {
    url = window.location.href;
    let reg = /#([^?&#=]+)|([^?&#=]+)=([^?&#=]+)/g;
    let obj = {};
    url.replace(reg, (...item) => {
        let [, $1, $2, $3] = item;
        if ($1) {
            obj["hash"] = $1;
            return;
        }
        obj[$2] = $3;
    });
    console.log(obj);
}
getUrlParams();
// 正则切分价格千分符
console.log("————————————————— 正则切分价格千分符 —————————————————");
function formatPrice(price) {
    price = typeof price === "number" ? price.toString() : price;
    let reg = /\d{1,3}(?=(\d{3})+(\.|$))/g;
    console.log(price.replace(reg, "$&,"));
}
formatPrice(12634567.97);
formatPrice(8415);
// 正则切分银行卡卡号
function formatbankCard(card) {
    let reg = /(\d{4})(?=\d)/g;
    card.replace(reg, (...item) => {
        console.log(item);
    });
    console.log(card.replace(reg, "$& "));
}
formatbankCard("1234567891234567652");
// 实现xss-filter

//  渲染一个超长list,实现dom节点复用

// 一次可以走一步或者两步，n个阶梯的楼梯有多少种走法
// 求一个数组中比左边和右边的元素都大的元素
// 实现扫雷(二维数组,随机分布地雷坐标)
// random7实现random10

// http常用返回码及含义
// http缓存控制，协商缓存相关的几个头部之间的优先级关系？
// 什么是cors? 为什么要用cors?
// xss是什么? 如何防范?具体例子,jsonp如何防止xss?
// cookie有什么用?存在什么问题?如何解决?crsf如何防范?
// dns寻址过程?简述cdn原理

// 如何定位内存泄漏
// 前端适配方案
