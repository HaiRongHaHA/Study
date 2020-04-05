let Vue;
class Router {
    constructor({ routes }) {
        this.routeMap = routes.reduce(
            (memo, curr) => ((memo[curr.path] = curr.component), memo),
            {}
        );
        this.route = { current: "/" };
        // 定义响应式数据
        Vue.util.defineReactive(this, "route", { current: "/" });
        // # 哈希 / h5的api
        window.addEventListener("load", () => {
            location.hash ? "" : (location.hash = "/");
        });
        window.addEventListener("hashchange", () => {
            this.route.current = location.hash.slice(1);
        });
    }
}

// install扩展属性或组件指令
Router.install = _Vue => {
    Vue = _Vue;
    // _Vue 代表vue的构造函数
    Vue.mixin({
        // mixn会把这个对象给每个组件的属性混在一起,保证从根开始
        /*
            vue源码中生命周期会做个数组[mimin的beforeCreate,组件内的beforeCreate]
            mimin的beforeCreate先于组件内的beforeCreate
        */
        beforeCreate() {
            // 当组件创建之前(代表的是每一个vue实例)
            // 判断根组件
            /* 
                this.$options代表new vue()时候传的参
            */
            if (this.$options && this.$options.router) {
                this._router = this.$options.router;
            } else {
                // 让所有的子组件都又这个_router属性指向当前router
                this._router = this.$parent && this.$parent._router;
            }
            // 每个组件都有 $route $router
            /*  
                Object.defineProperty(this, "$route", {
                    value: {}
                });
                // 每个组件都有 $route $router
                Object.defineProperty(this, "$router", {
                    value: {}
                }); 
            */
        }
    });

    // router-link      router-view
    Vue.component("router-link", {
        props: {
            to: String
        },
        render() {
            return <a href={`#${this.to}`}>{this.$slots.default}</a>;
        }
    });
    Vue.component("router-view", {
        render(h) {
            return h(this._router.routeMap[this._router.route.current]);
        }
    });
};
export default Router;
