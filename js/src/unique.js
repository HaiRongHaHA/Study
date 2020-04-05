let array = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 3, 2]; // 测试数据

/*
    方案一：建新数组，循环原数组，判断新数组中没有
    当前项就push，得到的新数组就不会有重复元素
*/
function unique(arr) {
    let res = [];
    arr.map(item => {
        if (!res.includes(item)) {
            res.push(item);
        }
    });
    return res;
}

/*
    方案二：循环数组，当前项与当前项后面所有项比较，有重复就删除重复项
    但会导致数组塌陷问题，解决塌陷：下标-- 
*/
function unique1(arr) {
    for (let i = 0; i < arr.length; i++) {
        const prev = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            const next = arr[j];
            if (next === prev) {
                // splice改变了原数组，arr length变了 j要先--
                arr.splice(j, 1);
                // 数组塌陷了，j后面的每一项索引都提前了一位，
                // 一下次要比较的应该还是j这个索引的内容
                j--;
            }
        }
    }
    return arr;
}

/*
    方案三：基于对象处理，如果数组里有对象就处理不了了
*/
function unique2(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (obj[item] !== undefined) {
            // 基于splice实现删除性能不好：当前项被删后，后面每一项的索引都要向前提一位，
            // 若后面数据量过大会影响性能，开销太大
            // arr.splice(i, 1);

            // 解决如下：把最后一项的值获取替换到当前本要删除的这一项，然后删掉最后一项即可
            //  最后的值替换到当前项为做比较，所以下次还是要从当前下标对较，性能还比较好
            arr[i] = arr[arr.length - 1];
            arr.length--;
            i--;
            continue;
        }
        obj[item] = item;
    }
    return arr;
}

/*
    方案四：先排序，而后正则去重
*/
function unique3(arr) {
    arr.sort();
    let str = arr.join('@') + '@';
    let reg = /(\d+@)\1*/g; // \1代表跟前面分组里出现一模一样的内容
    let res = [];
    str.replace(reg, (n, m) => {
        /* 
            n 大正则匹配的内容
            m 小分组匹配的信息
        */
        // n            m
        // 1@1@1@1@     1@
        // 2@2@2@2@2@   2@
        // 3@3@3@       3@
        m = Number(m.slice(0, m.length - 1));
        res.push(m);
    });
    return res;
}

/* 
    方案五：先排序，循环找当前项在数组种出现的最后位置（下标不等于当前项）
    即将数组当前项到最后出现位置所有项都删除
*/
function unique4(arr) {
    arr.sort();
    arr.map((item, index) => {
        if (arr.lastIndexOf(item) !== index) {
            arr.splice(index + 1, arr.lastIndexOf(item));
        }
    });
    return arr;
}

/* 
    方案六：  [...new Set(arr)] （不能去除对象数组）
*/

console.log(unique3(array));
