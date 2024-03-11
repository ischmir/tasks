<script setup>
import { nextTick, ref } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  task: { type: String, default: null },
  createdAt: { type: Object, default: null },
  updatedAt: { type: Object, default: null },
});

const editMode = ref(false);
const editInputRef = ref(null);
const taskInput = ref(props.task);

const changeEditState = () => {
  editMode.value = !editMode.value;
  task: taskInput.value;
  if(editMode.value) {
    nextTick(() => console.log(editInputRef.value.focus()));
  }
};

const deleteTask = () => {
  console.log('delete task');
};
</script>

<template>
  <div class="task">
    <h3 class="task__title" v-if="!editMode">{{ task }}</h3>
    <input v-else v-model="taskInput" class="task__title" ref="editInputRef" />

    <p class="task__datetime">
      <span class="label">Created at</span>
      <span class="value timestamp" v-if="createdAt?.seconds">
        {{ new Date(createdAt.seconds * 1000).toLocaleString() }}
      </span>
    </p>

    <div>
      <button class="task__btn" @click="changeEditState">{{ editMode? 'Cancel' : 'Edit' }}</button>
      <button class="task__btn" v-if="editMode" @click="saveTask">Save</button>
      <button class="task__btn" v-if="!editMode" @click="deleteTask">Delete</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task {
  align-items: center;
  border-top: 1px solid #393939;
  display: flex;
  gap: 1rem;

  &:first-child {
    border-top: none;
  }

  &__datetime {
    display: flex;
    gap: 1ch;
  }

  &__title {
    flex: 1;
    font-size: 1.5rem;
    margin: .5rem;
  }

  &__btn {
    width: 4rem;
  }
}
</style>

