import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import * as todo from '@/services/TodoService';

export const useTodoStore = defineStore('todos', () => {
  const tasks = ref([]);

  todo.onUpdate((data) => tasks.value = data);

  const createTask = async (task) => {
    try {
      const res = await todo.createTodo(task);
      return res;
    } catch(e) {
      return {
        error: e,
      };
    }
  };

  return {
    createTask,
    tasks,
  };
});
