<template>
  <div class="container">
    <main>
      <button-navigation class="mb-3" />
      <h2 class="page-title main-title text-center">{{ task.title }}</h2>
      <button-create data-bs-toggle="modal" data-bs-target="#addTodo"
        >Добавить дело</button-create
      >
      <ul class="todo__list">
        <todo-item
          @deleteTodo="deleteTodo"
          @editTodo="updateTodo"
          @editDescriptionTodo="editTodo"
          v-for="todo in task.todos"
          :key="todo.id"
          :todo="todo"
        />
      </ul>
      <base-modal>
        <form-edit-todo :todo="currentTodoEdit" />
      </base-modal>
      <base-modal modal-id="addTodo">
        <form-edit-todo />
      </base-modal>
    </main>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import useStoreTasks from "@/store/tasks";
import TodoItem from "@/components/task/TodoItem";
import ButtonNavigation from "@/components/buttons/ButtonNavigation";
import BaseModal from "@/components/BaseModal";
import FormEditTodo from "@/components/forms/FormEditTodo";
import { useRoute } from "vue-router";
import confirm from "@/helper/confirm";
import ButtonCreate from "@/components/buttons/ButtonCreate";

const props = defineProps(["id"]);
const storeTask = useStoreTasks();
const task = computed(() => {
  return storeTask.getTaskById(props.id);
});
const currentTodoEdit = ref(null);
const editTodo = (todoId) => {
  currentTodoEdit.value = todoId;
};
const route = useRoute();
const updateTodo = (todo) => {
  storeTask.editTodoInTask(route.params.id, todo);
};
const deleteTodo = async (todoId) => {
  const resultConfirm = await confirm("Вы уверенны?");
  if (resultConfirm) {
    storeTask.deleteTodoInTask(route.params.id, todoId);
  }
};
</script>

<style scoped></style>
