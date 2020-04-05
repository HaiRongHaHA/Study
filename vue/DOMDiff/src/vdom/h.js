import { vnode } from "./vnode";

// jsx 会通过loader来转换结果(就是一下的数据形式)
function createElement(type, props, ...children) {
    let key;
    if (props.key) {
        key = props.key;
        delete props.key;
        // key 不需要传不需要给，所以从props上delete了
    }
    // 将不是虚拟节点的子节点变成虚拟节点
    children = children.map(child => {
        if (typeof child === "string") {
            return vnode(undefined, undefined, {}, [], child);
        } else {
            return child;
        }
    });
    return vnode(type, key, props, children);
}

export default createElement;
