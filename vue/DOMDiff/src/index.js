import { h, render, patch } from "./vdom";
// 1、先实现虚拟dom 主要就是一个对象 来描述dom节点
// jsx(会转成h方法,createElement方法)

/* 
    对常见的dom操作优化
    1、前后追加
    2、正序倒序
*/
let vnode = h(
    "div",
    { id: "wrap" },
    h("li", { style: { background: "red" }, key: "A" }, "A"),
    h("li", { style: { background: "yellow" }, key: "B" }, "B"),
    h("li", { style: { background: "blue" }, key: "C" }, "C"),
    h("li", { style: { background: "green" }, key: "D" }, "D")
);
// 2、render 将虚拟节点渲染成真实节点
// window上会默认挂一个app属性
render(vnode, app); // oldVnode.domElement

let newVnode = h(
    "div",
    { id: "abc" },
    h("li", { style: { background: "green" }, key: "G" }, "G"),
    h("li", { style: { background: "blue" }, key: "C" }, "C"),
    h("li", { style: { background: "yellow" }, key: "E" }, "E"),
    h("li", { style: { background: "red" }, key: "A" }, "A")
);
setTimeout(() => {
    //  vue源码中wathch监听数据，数据一变化就走patch方法比对dom
    patch(vnode, newVnode); // 只是用虚拟节点更新真实节点
}, 2000);
/* 
    <div id="wrap" a=1>
        <span style="color=red;">hello</span>
        hairong
    <div>
        
    {
        type: "div",
        props: { id: "wrap", a: 1 },
        children: [
            {
                type: "span",
                props: { style: {color: "res"} },
                children: [
                    {
                        type: "",
                        props: "",
                        children: [],
                        text: "hello"
                    }
                ]
            },
            {
                type: "",
                props: "",
                children: [],
                text: "hairong"
            }
        ]
    };
*/
