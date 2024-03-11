<script setup>
</script>

<template>
  <form @submit.prevent="onCreateTodo">
    <div>
      <label for="title">Title</label>
      <input id="title" v-model="title" />
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<style lang="scss" scoped>
</style>

