/* 
    vnode       传进来的虚拟dom
    container   要渲染的dom容器
*/
export function render(vnode, container) {
    let ele = createDomElementFrom(vnode);
    container.appendChild(ele);
}
// 通过虚拟对象 创建真实dom
function createDomElementFrom(vnode) {
    let { type, key, props, children, text } = vnode;
    if (type) {
        // 元素
        // vnode.domElement建立虚拟节点和真实元素的一个关系，后面用来更新真实dom
        vnode.domElement = document.createElement(type);
        updateProperties(vnode); // 根据当前的虚拟节点的属性去更新真实的dom元素
        // children中放的也是一个个的虚拟节点
        // 递归渲染子的虚拟节点
        children.map(childVnode => render(childVnode, vnode.domElement));
    } else {
        // 文本
        vnode.domElement = document.createTextNode(text);
    }
    return vnode.domElement;
}
// 后续比对的时候会根据老的属性和新的属性重新更新节点
function updateProperties(newVnode, oldProps = {}) {
    let domElement = newVnode.domElement; //真实的dom元素
    let newProps = newVnode.props; //当前虚拟节点中的属性
    // 如果老的里面有，新的里面没有这个属性 说明这个属性被移除了
    for (let oldPropName in oldProps) {
        if (!newProps[oldPropName]) {
            delete domElement[oldPropName];
        }
    }
    /* 
        如果新的里面有style，老的里面也有style style可能
        还不一样，老的有有bg,新的里面没有bg 
    */
    let newStyleObj = newProps.style || {};
    let oldStyleObj = oldProps.style || {};
    for (const propsName in oldStyleObj) {
        if (!newStyleObj[propsName]) {
            // 老的dom元素上更新之后，没有某个样式需要删除
            domElement.style[propsName] = ""; // removeAttribute
        }
    }

    // 如果老的里面没有，新的里面有
    for (let newPropName in newProps) {
        // 用新节点的属性直接覆盖调老节点的属性即可
        // @click  addEventListener
        if (newPropName === "style") {
            let styleObj = newProps[newPropName];
            for (const key in styleObj) {
                // setAttribute
                domElement.style[key] = styleObj[key];
            }
        } else {
            domElement[newPropName] = newProps[newPropName];
        }
    }
}

export function patch(oldVnode, newVnode) {
    // 类型不同（元素）
    if (oldVnode.type !== newVnode.type) {
        return oldVnode.domElement.parentNode.replaceChild(
            createDomElementFrom(newVnode),
            oldVnode.domElement
        );
    }
    // 类型相同(文本)
    if (oldVnode.text !== newVnode.text) {
        return (oldVnode.domElement.textContent = newVnode.text);
    }

    // 类型一样且是标签 需要根据新节点的属性更新老节点的属性
    let domElement = (newVnode.domElement = oldVnode.domElement);
    updateProperties(newVnode, oldVnode.props);

    let oldChildren = oldVnode.children;
    let newChildren = newVnode.children;
    // 1、老的有儿子    新的有儿子
    // 2、老的有儿子    新的没儿子
    // 2、新增了儿子
    if (oldChildren.length > 0 && newChildren.length > 0) {
        //比对两个儿子
        updateChildren(domElement, oldChildren, newChildren);
    } else if (oldChildren.length > 0) {
        // 说明新的里面是空的
        domElement.innerHTML = "";
    } else if (newChildren.length > 0) {
        // 说明老的里面是空的、
        for (let i = 0; i < newChildren.length; i++) {
            domElement.appendChild(createDomElementFrom(newChildren[i]));
        }
    }
}

function createMapBykeyToIndex(oldChildren) {
    let map = {};
    for (let i = 0; i < oldChildren.length; i++) {
        const current = oldChildren[i];
        if (current.key) {
            map[current.key] = i;
        }
    }
    return map;
}

// diff 最复杂的就是列表比对
function updateChildren(parent, oldChildren, newChildren) {
    let oldStartIndex = 0;
    let oldStartVnode = oldChildren[oldStartIndex];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];
    let map = createMapBykeyToIndex(oldChildren);

    let newStartIndex = 0;
    let newStartVnode = newChildren[newStartIndex];
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];

    // 判断老的孩子和新的孩子 循环的时候谁先结束就停止循环
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!newStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex];
        }
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 先比较头和头（向后追加） 从前往后比
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex]; // 先++
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // 头和头不相等才比较尾和尾（向前追加） 从后往前比
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            //  倒序比对
            patch(oldStartVnode, newEndVnode);
            parent.insertBefore(
                oldStartVnode.domElement,
                oldEndVnode.domElement.nextSibling
            );
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            //  倒序比对
            patch(oldEndVnode, newStartVnode);
            parent.insertBefore(
                oldEndVnode.domElement,
                oldStartVnode.domElement
            );
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else {
            /* 
                暴力对比(没听懂)
                需要先拿到新的节点 去老得中去查找 如存在就复用，不存在插入即可
            */
            let index = map[newStartVnode.key];
            if (index == null) {
                // 新的队列中没有此项
                parent.insertBefore(
                    createDomElementFrom(newStartVnode),
                    oldStartVnode.domElement
                );
            } else {
                let toMoveNode = oldChildren[index];
                patch(toMoveNode, newStartVnode);
                parent.insertBefore(
                    toMoveNode.domElement,
                    oldStartVnode.domElement
                );
                oldChildren[index] = undefined;
            }
            newStartVnode = newChildren[++newStartIndex];
        }
    }
    // 只有小于或者等于才说明有剩余
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            /* 
                如果是追加元素newEndIndex循环完值是newChildren.length,
                如果+1后面是没有元素的为null，如果是从前面插入元素newEndIndex循环
                完值是-1，加一之后是newChildren的第一个元素，也就是要插入的元素
            */
            let beforeElement =
                newChildren[newEndIndex + 1] === undefined
                    ? null
                    : newChildren[newEndIndex + 1].domElement;
            parent.insertBefore(
                createDomElementFrom(newChildren[i]),
                beforeElement
            ); // 合并前后追加逻辑
            /* 
                insertBefore：如果引用结果传得是null就会变成appendChild
            */
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parent.removeChild(oldChildren[i].domElement);
            }
        }
    }
}

function isSameVnode(oldVnode, newVnode) {
    if (oldVnode.type === newVnode.type && oldVnode.key === newVnode.key) {
        return true;
    }
}
