<template>
  <form @submit.prevent="submitForm">
    <label class="form-label">Название дела</label>
    <div class="todo__input-row mb-3">
      <input
        required
        v-model="formTodo.description"
        placeholder="ведите дело"
        type="text"
        class="form-control"
      />
    </div>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Закрыть
      </button>
      <button data-bs-dismiss="modal" type="submit" class="btn btn-primary">
        Подтвердить
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import useStoreTask from "@/store/tasks";
import { useRoute } from "vue-router";

const props = defineProps({
  todo: {
    type: [Object, null],
  },
});
const storeTask = useStoreTask();
const formTodo = ref({
  description: "",
});
const route = useRoute();
const submitForm = () => {
  storeTask.editTodoInTask(route.params.id, formTodo.value);
  formTodo.value = { description: "" };
};
watch(
  () => props.todo,
  (currentTodo) => {
    if (currentTodo) {
      formTodo.value = currentTodo;
    }
  }
);
</script>

<style scoped></style>
