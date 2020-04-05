<template>
    <div>
        <input v-model="value" class="sreach_input" />
        <button @click="add" class="sreach_btn">点击一下</button>
        <ul>
            <li v-for="(item, index) of arr" :key="index"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            value: "",
            arr: []
        };
    },
    methods: {
        add() {
            if (this.value) {
                this.arr = [1, 2, 3];
            }
        }
    }
};
</script>

<style lang="" scoped></style>
