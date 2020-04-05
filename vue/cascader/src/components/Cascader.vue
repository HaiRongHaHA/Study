<template>
    <div class="cascader_wrap" v-clickOutside="() => (isVisible = false)">
        <div class="title" @click="isVisible = true">
            <span>{{ result }}</span>
        </div>
        <div class="content_wrap" v-if="isVisible">
            <CascaderItem
                :options="options"
                :value="value"
                :level="0"
                @change="change"
            />
        </div>
    </div>
</template>

<script>
import { clickOutside } from "./directives";
import CascaderItem from "./CascaderItem";
export default {
    name: "Cascader",
    components: { CascaderItem },
    props: {
        value: {
            type: Array,
            default: () => {}
        },
        options: {
            type: Array,
            default: () => {}
        }
    },
    directives: {
        clickOutside
    },
    data() {
        return {
            isVisible: false,
            currSeleted: null
        };
    },
    computed: {
        getChildren() {
            return this.currSeleted && this.currSeleted.children;
        },
        result() {
            return this.value.map(item => item.label).join("--");
        }
    },
    methods: {
        select(item) {
            this.currSeleted = item;
        },
        change(value) {
            this.$emit("input", value);
        }
    }
};
</script>

<style lang="less" scoped>
.cascader_wrap {
    display: inline-block;
    .title {
        cursor: pointer;
        width: 300px;
        height: 40px;
        border: 3px solid yellowgreen;
    }
    .content_wrap {
        width: 300px;
        background-color: yellowgreen;
        border: 3px solid yellowgreen;
    }
}
</style>
