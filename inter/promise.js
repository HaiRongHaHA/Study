/*
    自定义Promise函数模块: IIFE
*/

(function (window) {
    /*
        Promise构造函数
        excutor: 执行器函数(同步执行)
    */

    function Promise(excutor) {
        this.status = "pending"; // 给promise对象指定status属性,初始值为pending
        this.data = undefined; // 给promise对象指定一个用于存储结果数据的属性
        this.callbacks = []; // 每个元素的结构: {onResolved(){}, onRejected(){} }

        this.resolve = (value) => {
            changStatus(this, "resolved", value, "onResolved");
        };

        this.reject = (reason) => {
            changStatus(this, "rejectd", reason, "onRejected");
        };

        try {
            excutor(this.resolve, this.reject);
        } catch (error) {
            // 如果执行器抛异常, promise对象变为rejectd
            this.reject(error);
        }
    }

    /*
        改状态,执行回调
    */

    function changStatus(_this, status, data, callbackName) {
        if (_this.status !== "pending") {
            // 一个promise对象只能成功或失败一次
            return;
        }
        _this.status = status;
        _this.data = data;
        if (_this.callbacks.length > 0) {
            // 如果有待执行callback函数, 立即异步执行回调函数
            setTimeout(() => {
                // 放入队列中执行所有成功或失败回调
                _this.callbacks.map((callbacksObj) => {
                    callbacksObj[callbackName](data);
                });
            });
        }
    }

    /*
        指定成功和失败的回调函数
        返回一个新的promise对象
    */
    Promise.prototype.then = function (onResolved, onRejected) {
        // 回调默认值必须是函数
        onResolved =
            typeof onResolved === "function" ? onResolved : (value) => value;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason;
                  };
        const _this = this;
        return new Promise((resolve, reject) => {
            function handle(callback) {
                /*
                        1 返回的是error对象
                        2 返回的是正常值
                        3 返回的是一个promise对象,
                    */

                try {
                    const result = callback(_this.data); // 执行回调获得返回值
                    if (result instanceof Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (this.status === "pending") {
                // 当前状态还是pending状态, 将回调函数保存到回调队列
                this.callbacks.push({
                    onResolved(value) {
                        handle(onResolved);
                    },
                    onRejected(reason) {
                        handle(onRejected);
                    },
                });
            } else if (this.status === "resolved") {
                // 异步执行onResolved并改变return的promise状态
                setTimeout(() => {
                    handle(onResolved);
                });
            } else {
                setTimeout(() => {
                    handle(onRejected);
                });
            }
        });
    };
    /*
        指定失败的回调函数
        返回一个新的promise对象
    */
    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };
    /*
        返回一个指定结果成功的promise
    */
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    };
    /*
        返回一个reason的失败的promise
    */
    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    };
    /*
        返回一个promise, 只有当所有promise都成功时才成功, 否则失败
    */
    Promise.all = function (promises) {
        const values = new Array(promises.length);
        let resolvedCount = 0;
        return new Promise((resolve, reject) => {
            promises.map((item, index) => {
                Promise.resolve(item).then(
                    (value) => {
                        resolvedCount++;
                        values[index] = value; // 以传进来的原顺序存值
                        if (resolvedCount === promises.length) {
                            resolve(values);
                        }
                    },
                    (reason) => {
                        reject(reason);
                    }
                );
            });
        });
    };
    /*
        返回一个promise, 其结果由第一个完成或失败的promise决定
    */
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.map((item) => {
                Promise.resolve(item).then(
                    (value) => {
                        resolve(value);
                    },
                    (reason) => {
                        reject(reason);
                    }
                );
            });
        });
    };

    window.Promise = Promise;
})(window);
