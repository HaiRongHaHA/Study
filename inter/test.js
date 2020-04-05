/* ——————————————打印输出—————————————— */
var a = 1;
let o = {
    a: 2,
    f(n) {
        const b = ({ n }) => {
            this.a = n++;
        };
        return b;
    }
};
let x = o.f;
let y = x(3);
let z = y(4);

console.log(x.a, "x.a"); // undefined
console.log(y.a, "y.a"); // undefined
// console.log(z.a, "z.a"); // Cannot read property 'a' of undefined
console.log(o.a, "o.a"); // 2
// console.log(window.a, "window.a"); // NaN

/* —————————————— 组装数据 —————————————— */
const tree = [
    {
        tree_id: "root_0",
        children: [
            {
                tree_id: "1_0",
                children: [
                    {
                        tree_id: "1_0_1"
                    },
                    {
                        tree_id: "1_0_2"
                    },
                    {
                        tree_id: "1_0_3"
                    }
                ]
            },
            {
                tree_id: "1_1",
                children: [
                    {
                        tree_id: "1_1_1"
                    }
                ]
            }
        ]
    }
];
const treeIds = ["root_0", "1_0", "1_0_1", "1_0_2", "1_1", "1_1_1"];
// tree_id 为唯一标识。可代表对应节点
// 如何过滤这棵树能获得 ['1_0_1','1_0_2','1_1','1_1_1']
// 1、如果一个节点的后代节点全部在treeIds中，则过滤出来
// 2、如果节点为叶子节点且在treeIds中，则过滤出来

const findNodeById = (tree, id) => {
    for (const item of tree) {
        if (item.tree_id === id) return item;
        if (item.children) {
            let find = findNodeById(item.children, id);
            if (find) return find;
        }
    }
    return undefined;
};

const isLeafChildNode = item => {
    return item.children === undefined;
};

const isAllChildrenInTreeIds = (tree, treeIds) => {
    for (const child of tree) {
        if (!treeIds.includes(child.tree_id)) return false;
        if (child.children) {
            let bool = isAllChildrenInTreeIds(child.children, treeIds);
            if (!bool) return false;
        }
    }
    return true;
};

const compare = (tree, treeIds) => {
    const filterIds = [];
    treeIds.forEach(id => {
        const level = findNodeById(tree, id);
        console.log(level);

        if (isLeafChildNode(level)) {
            filterIds.push(id);
            return;
        }
        if (!treeIds.includes(level.tree_id)) {
            return;
        }
        if (isAllChildrenInTreeIds(level.children, treeIds)) filterIds.push(id);
    });
    return filterIds;
};

console.log(compare(tree, treeIds));

// function filterTree(treeIds, tree) {
//     let res = [];
//     if (!tree[0].children) return tree;
//     for (let i = 0; i < tree.length; i++) {
//         const item = tree[i];
//         let childs = filterTree(treeIds, item.children);
//         if (childs) {
//             const filters = childs.filter(child => {
//                 if (treeIds.includes(child.tree_id)) {
//                     return child.tree_id;
//                 }
//             });
//             filters &&
//                 filters.map(child => {
//                     if (filters.length == childs.length) {
//                         res.push(item.tree_id);
//                     }
//                     res.push(child.tree_id);
//                     console.log(res, "res");
//                 });
//         } else {
//             break;
//         }
//     }
// }

// filterTree(treeIds, tree);
