<template>
  <div v-if="todo" class="container">
    <main>
      <button-navigation class="mb-3" />
      <div class="page-title__wrapper align-items-baseline">
        <base-input
          :is-show-label="false"
          v-if="isEditTitle"
          :model-value="todo?.title"
          @update="updateTaskTitle"
        />
        <h2 v-else class="page-title main-title text-center">
          {{ todo?.title }}
        </h2>
        <button
          :disabled="!todo?.title"
          v-if="isEditTitle"
          @click="hideEditTitle"
          class="btn btn-primary"
        >
          подтвердить
        </button>
        <button-edit v-else @click="showEditTitle">редактировать</button-edit>
      </div>
      <button-create data-bs-toggle="modal" data-bs-target="#addTask"
        >Добавить дело
      </button-create>
      <ul class="todo__list">
        <todo-item
          @editDescriptionTodo="editTask"
          @deleteTodo="deleteTask"
          @changeState="dispatchTask"
          v-for="task in todo.tasks"
          :key="task?.id"
          :task="task"
        />
      </ul>
      <div>
        <base-modal>
          <form-task @submitForm="submitTaskFormEdit" :task="currentTask" />
        </base-modal>
        <base-modal modal-id="addTask">
          <form-task @submitForm="submitTaskFormCreate" />
        </base-modal>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUpdate, ref } from "vue";
import { useTodoStore } from "@/store/todos";
import TodoItem from "@/components/task/TodoItem.vue";
import ButtonCreate from "@/components/buttons/ButtonCreate.vue";
import ButtonNavigation from "@/components/buttons/ButtonNavigation.vue";
import BaseModal from "@/components/BaseModal.vue";
import FormTask from "@/components/forms/FormTask.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { Task, Todo } from "@/types/todo";
import ButtonEdit from "@/components/buttons/ButtonEdit.vue";
import BaseInput from "@/components/BaseInput.vue";

const isEditTitle = ref(false);
const route = useRoute();
const todo = computed<Todo>(
  () => todos.value.find((todo) => todo.id === route.params.id) as Todo
);
const storeTodos = useTodoStore();
const currentTask = ref({ description: "" });
const { todos } = storeToRefs(storeTodos);
const deleteTask = (taskId: Task["id"]) => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  storeTodos.deleteTaskInTodo(id, taskId);
};

const dispatchTask = (payloadTask: Task) => {
  const updatedTasks = storeTodos.updateTaskInTodo(todo.value, payloadTask);
  storeTodos.updateTodos({ ...todo.value, tasks: updatedTasks });
};
const editTask = (taskPayload: Task) => {
  currentTask.value = taskPayload;
};
const submitTaskFormEdit = (payloadTask: Task) => {
  dispatchTask(payloadTask);
};
const submitTaskFormCreate = (payloadTask: Task) => {
  storeTodos.addTask(todo.value, payloadTask);
};
const showEditTitle = () => {
  isEditTitle.value = true;
};
const hideEditTitle = () => {
  isEditTitle.value = false;
};
const updateTaskTitle = (title: Todo["title"]) => {
  storeTodos.updateTodoTitle({ id: todo.value.id, title });
};
onBeforeUpdate(() => {
  if (todo.value?.title === "") {
    updateTaskTitle("Название задачи");
  }
});
</script>
<style lang="scss">
.page-title {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
}
</style>
