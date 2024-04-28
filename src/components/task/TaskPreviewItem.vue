<template>
  <li class="task__container main-hover">
    <button-sort-grab v-if="showIconSorting" class="handle" />
    <div>
      <h3 class="task__title">{{ todo.title }}</h3>
      <div class="task__body">
        <ol class="task__todo-preview">
          <li v-for="task in todo.tasks" :key="task.id" class="task__todo-item">
            {{ task.description }}
          </li>
        </ol>
        <div class="control__btn-group">
          <router-link :to="{ name: `PageTodo`, params: { id: todo.id } }">
            <button-link>К задачам</button-link>
          </router-link>
          <button-delete @click="$emit('deleteTodo', todo.id)" />
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import ButtonDelete from "@/components/buttons/ButtonDelete.vue";
import { Todo } from "@/types/todo";
import ButtonLink from "@/components/buttons/ButtonLink.vue";
import ButtonSortGrab from "@/components/buttons/ButtonSortGrab.vue";

interface Props {
  showIconSorting: boolean;
  todo: Todo;
}

defineProps<Props>();
defineEmits(["deleteTodo"]);
</script>

<style scoped lang="scss">
.task {
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__title {
    text-align: center;
    font-size: 24px;
  }
  &__container {
    display: block;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
    &:focus-within > ol {
      display: block;
    }
  }
  &__todo-preview {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/78779/star.svg");
    background-position: 0 1.3em;
    background-size: 10px 9px;
    background-repeat: repeat-x;
  }
}
</style>
