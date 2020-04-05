<template>
    <div id="app">
        <Cascader :options="options" v-model="value" />
    </div>
</template>

<script>
import Cascader from "./components/Cascader.vue";
export default {
    name: "App",
    components: {
        Cascader
    },
    data() {
        return {
            value: [],
            options: [
                {
                    label: "默认",
                    children: []
                },
                {
                    label: "肉类",
                    children: [
                        {
                            label: "五花肉"
                        },
                        {
                            label: "里脊肉"
                        }
                    ]
                },
                {
                    label: "蔬菜类",
                    children: [
                        {
                            label: "小油菜"
                        },
                        {
                            label: "大白菜"
                        },
                        {
                            label: "菠菜",
                            children: [
                                {
                                    label: "有沙子"
                                },
                                {
                                    label: "没沙子"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "水果类",
                    children: [
                        {
                            label: "火龙果",
                            children: [
                                {
                                    label: "红肉的"
                                },
                                {
                                    label: "白肉的"
                                }
                            ]
                        },
                        {
                            label: "百香果"
                        },
                        {
                            label: "樱桃"
                        },
                        {
                            label: "沙糖桔"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        change(value) {
            this.value = value;
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
