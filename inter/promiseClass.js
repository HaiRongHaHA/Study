class Promise {
    constructor(excutor) {
        this.status = "pending"; // 给promise对象指定status属性,初始值为pending
        this.data = undefined; // 给promise对象指定一个用于存储结果数据的属性
        this.callbacks = []; // 每个元素的结构: {onResolved(){}, onRejected(){} }

        this.resolve = (value) => {
            handleStatus.call(this, "resolved", value, "onResolved");
        };

        this.reject = (reason) => {
            handleStatus.call(this, "rejectd", reason, "onRejected");
        };
        try {
            excutor(this.resolve, this.reject);
        } catch (error) {
            // 如果执行器抛异常, promise对象变为rejectd
            this.reject(error);
        }
    }

    then(onResolved, onRejected) {
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
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }

    static all(promises) {
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
    }

    static race(promises) {
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
    }
}

function handleStatus(status, data, callbackName) {
    if (this.status !== "pending") {
        // 一个promise对象只能成功或失败一次
        return;
    }
    this.status = status;
    this.data = data;
    if (this.callbacks.length > 0) {
        // 如果有待执行callback函数, 立即异步执行回调函数
        setTimeout(() => {
            // 放入队列中执行所有成功或失败回调
            this.callbacks.map((callbacksObj) => {
                callbacksObj[callbackName](data);
            });
        });
    }
}

window.Promise = Promise;
