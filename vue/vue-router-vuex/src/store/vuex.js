let Vue;
class Store {
    constructor(options) {
        this.vm = new Vue({
            // new vue创建vue实例，将状态变为响应式的 如果数据更新则试图刷新
            data: { state: options.state }
        });
        this.state = this.vm.state;
        this.mutations = options.mutations;
        this.actions = options.actions;
    }
    commit = event => {
        this.mutations[event](this.state);
    };

    dispatch = event => {
        this.actions[event](this);
    };
}

const install = _Vue => {
    Vue = _Vue; // 保证是当前的vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    });
};
export default {
    Store,
    install
};
