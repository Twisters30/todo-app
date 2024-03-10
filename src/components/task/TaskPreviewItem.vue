<template>
  <li class="task__container main-hover">
    <div class="task__title">{{ todo.title }}</div>
    <div class="task__body">
      <ol class="task__todo-preview">
        <li v-for="task in todo.tasks" :key="task.id" class="task__todo-item">
          {{ task.description }}
        </li>
      </ol>
      <div class="control__btn-group">
        <router-link :to="{ name: `PageTodo`, params: { id: todo.id } }">
          <button-edit />
        </router-link>
        <button-delete @click="$emit('deleteTodo', todo.id)" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import ButtonEdit from "@/components/buttons/ButtonEdit.vue";
import ButtonDelete from "@/components/buttons/ButtonDelete.vue";

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
defineEmits(["deleteTodo"]);
</script>

<style scoped lang="scss">
.task {
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 24px;
  }
  &__container {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
  }
  &__todo-preview {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
