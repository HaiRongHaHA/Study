<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
        {{ $store.state }}
    </div>
</template>
<script>
export default {
    mounted() {
        // this.$store.commit("changeName");
        this.$store.dispatch("changeName");
    }
};
</script>
