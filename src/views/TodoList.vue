<template>
  <div class="container">
    <main>
      <button-create data-bs-toggle="modal" data-bs-target="#baseModal">
        Создать новый список задач
      </button-create>
      <VueDraggable
        tag="ul"
        v-model="todos"
        :animation="150"
        handle=".handle"
        class="task__list p-0"
      >
        <task-preview-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @deleteTodo="storeTodos.deleteTodo"
          :show-icon-sorting="todos.length >= 2"
        />
      </VueDraggable>
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
import { VueDraggable } from "vue-draggable-plus";
import { watch } from "vue";

const storeTodos = useTodoStore();
const { todos } = storeToRefs(storeTodos);
watch(
  () => todos.value,
  () => {
    storeTodos.updateAllTodos(todos.value);
  }
);
</script>
