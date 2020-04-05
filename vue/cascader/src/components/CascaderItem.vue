<template>
    <div class="item_wrap">
        <div class="content_item">
            <div
                class="item"
                v-for="(item, index) in options"
                :key="index"
                @click="select(item)"
            >
                {{ item.label }}
            </div>
        </div>
        <div class="content_item" v-if="getChildren && getChildren.length > 0">
            <CascaderItem
                :options="getChildren"
                :value="value"
                :level="level + 1"
                @change="change"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "CascaderItem",
    props: {
        level: {
            type: Number,
            required: true
        },
        value: {
            type: Array,
            default: () => []
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    },
    computed: {
        getChildren() {
            return this.value[this.level] && this.value[this.level].children;
        }
    },
    methods: {
        // 递归给自己绑change事件
        change(value) {
            this.$emit("change", value);
        },
        select(item) {
            let cloneValue = JSON.parse(JSON.stringify(this.value));
            cloneValue[this.level] = item;
            cloneValue.splice(this.level + 1);
            this.$emit("change", cloneValue);
        }
    }
};
</script>

<style lang="less" scoped>
.item_wrap {
    display: flex;
    justify-content: space-around;
    .content_item {
        flex: 1;
        .item {
            height: 30px;
            line-height: 30px;
            &:hover {
                cursor: pointer;
                background-color: #eee;
            }
        }
    }
}
</style>
