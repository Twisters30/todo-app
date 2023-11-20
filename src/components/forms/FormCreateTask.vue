<template>
  <form @input="formValidate" @submit.prevent="submitForm">
    <div class="mb-3">
      <label class="form-label">Название задачи</label>
      <input
        required
        v-model="taskState.title"
        placeholder="ведите задачу"
        type="text"
        class="form-control"
      />
    </div>
    <ul class="mb-3">
      <li v-for="(todo, i) in taskState.todos" :key="i">
        <label class="form-label">Название дела</label>
        <div class="todo__input-row">
          <input
            required
            v-model="todo.description"
            placeholder="ведите дело"
            type="text"
            class="form-control"
          />
          <button type="button" class="btn" @click.stop="deleteTodo(todo.id)">
            X
          </button>
        </div>
      </li>
    </ul>
    <div class="control__btn-group">
      <button @click.stop="addTodo" type="button" class="btn btn-primary mb-3">
        добавить дело +
      </button>
      <button-delete class="mb-3" @click.stop="clearForm"
        >очистить форму</button-delete
      >
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Закрыть
      </button>
      <button
        :disabled="isSubmitDisable"
        data-bs-dismiss="modal"
        type="submit"
        class="btn btn-primary"
      >
        Создать задачу
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import useStoreTasks from "@/store/tasks";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import generateId from "@/helper/generateId";

// storeTasks ипортируем для добавления задачи, у него есть свой метод createTask
const storeTasks = useStoreTasks();
const taskState = ref({
  title: "",
  todos: [],
});
// создаёт новое дело
const addTodo = () => {
  formValidate();
  const id = generateId();
  taskState.value.todos.push({ id, description: "", done: false });
};
const submitForm = () => {
  storeTasks.createTask(taskState.value);
  clearForm();
};
// по удалить не нужное дело
const deleteTodo = (id) => {
  taskState.value.todos = taskState.value.todos.filter(
    (todo) => todo.id !== id
  );
};
// очистка формы
const clearForm = () => {
  taskState.value.title = "";
  taskState.value.todos = [];
};

// небольшая валидация что бы не создавали пустые дела
const isSubmitDisable = ref(true);
const formValidate = () => {
  if (taskState.value.todos.length > 0) {
    // если дела созданны тогда доп проверка на заполнение поля description
    const checkTodosValidate = taskState.value.todos.some(
      (todo) => todo.description === ""
    );
    if (checkTodosValidate) {
      isSubmitDisable.value = true;
      return;
    }
  }
  if (!taskState.value.title) {
    // проверка на заполнение заголовка задачи
    isSubmitDisable.value = true;
    return;
  }
  isSubmitDisable.value = false;
};
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}
.todo {
  &__input-row {
    display: flex;
  }
}
</style>
