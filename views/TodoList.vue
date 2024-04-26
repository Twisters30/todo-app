<template>
  <div class="container">
    <main>
      <button-create data-bs-toggle="modal" data-bs-target="#baseModal" />
      <ul class="task__list p-0">
        <task-preview-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @deleteTodo="storeTodos.deleteTodo"
        />
      </ul>
      <base-modal>
        <form-create-task @createTodo="storeTodos.createTodo" />
      </base-modal>
      <h2 v-if="!todos.length">Задач нет</h2>
    </main>
  </div>
</template>

<script setup lang="ts">
import TaskPreviewItem from "@/components/task/TaskPreviewItem.vue";
import { useTodoStore } from "@/store/todos";
import ButtonCreate from "@/components/buttons/ButtonCreate.vue";
import BaseModal from "@/components/BaseModal.vue";
import FormCreateTask from "@/components/forms/FormCreateTodo.vue";
import { storeToRefs } from "pinia";

const storeTodos = useTodoStore();
const { todos } = storeToRefs(storeTodos);
</script>
