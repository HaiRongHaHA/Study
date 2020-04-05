let $Sub = (function(window) {
    // => Sub：发布订阅类
    class Sub {
        constructor() {
            //=> 创建一个事件池，用来存储后期需要执行的方法
            this.$pond = [];
        }
        // => 向事件池中追加方法
        add(fn) {
            // 事件池去重
            if (!this.$pond.some(item => item === fn)) {
                this.$pond.push(fn);
            }
        }
        // => 移除事件池中方法
        remove(fn) {
            let index = this.$pond.indexOf(fn);
            /* 
                splice移动导致了数组塌陷问题，不能这么写
                移除不能真移除，只能把当前项赋值为null
            */
            // this.$pond.splice(index, 1);
            this.$pond[index] = null;
        }
        // => 通知事件池的方法，按顺序执行
        fire(...arg) {
            let $pond = this.$pond;
            for (let i = 0; i < $pond.length; i++) {
                const item = $pond[i];
                if (typeof item !== 'function') {
                    // 此时再真正的删除
                    $pond.splice(i, 1);
                    i--;
                    continue;
                }
                item.call(this, ...arg);
            }
        }
    }
    return function subscrible() {
        return new Sub();
    };
})();

//
let fn1 = function() {
    console.log(1);
};
let fn2 = function() {
    console.log(2);
    pond.remove(fn1); // 导致数组塌陷
};
let fn3 = function(...arg) {
    console.log(3, arg);
};

let fn4 = function() {
    console.log(4);
    console.log('end^^^^');
};
let pond = $Sub();
pond.add(fn1);
pond.add(fn1);
pond.add(fn2);
pond.add(fn3);
pond.add(fn4);

let btn = document.createElement('button');
btn.innerText = '点点点~';
btn.onclick = function(e) {
    pond.fire(e);
};
document.body.appendChild(btn);
