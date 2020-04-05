import Vue from "vue";
import Vuex from "./vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: "海容"
    },
    mutations: {
        changeName(state) {
            state.name = "哈哈哈";
        }
    },
    actions: {
        changeName({ commit }) {
            setTimeout(() => {
                commit("changeName");
            }, 1000);
        }
    },
    modules: {}
});
