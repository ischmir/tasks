<script setup>
import { useTodoStore } from '@/stores/TodoStore';
import TodoListItem from '@/components/TodoListItem.vue';

const todo = useTodoStore();
</script>

<template>
  <div v-if="todo.tasks.length > 0">
    <TodoListItem
      v-for="task in todo.tasks"
      :key="task.id"
      :id="task.id"
      :task="task.task"
      :createdAt="task.createdAt"
      :updatedAt="task.updatedAt"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>

