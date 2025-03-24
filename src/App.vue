<script setup>
    import { RouterView } from 'vue-router';
    import NavMain from './components/NavMain.vue';
</script>

<template>
    <header>
        <NavMain />
    </header>
    <RouterView />
</template>

<style scoped>
    header {
        background-color: #333;
        color: white;
        padding: 10px 0;
    }
</style>
