<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/TodoStore';

const todo = useTodoStore();

const error = ref('');
const task = ref('');

const onCreateTodo = async () => {
  if(!task.value) return error.value = 'Task is required';
  error.value = '';

  await todo.createTask({
    task: task.value,
  });

  task.value = '';
};
</script>

<template>
  <form @submit.prevent="onCreateTodo" class="todo-form">
    <input id="task" v-model="task" placeholder="Task" />
    <button type="submit">Create</button>
  </form>
</template>

<style lang="scss" scoped>
</style>

