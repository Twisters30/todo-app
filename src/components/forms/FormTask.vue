<template>
  <form @submit.prevent="submitForm">
    <label class="form-label">Название дела</label>
    <div class="todo__input-row mb-3">
      <input
        ref="refInput"
        required
        v-model="description"
        placeholder="ведите дело"
        type="text"
        class="form-control"
      />
    </div>
    <div class="control__btn-group flex-column-reverse">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Закрыть
      </button>
      <button
        :disabled="!description"
        data-bs-dismiss="modal"
        type="submit"
        class="btn btn-primary"
      >
        Подтвердить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, PropType } from "vue";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/types/todo";

const emits = defineEmits(["submitForm"]);
const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    default: () => ({ description: "" }),
  },
});
const refInput = ref<HTMLInputElement | null>(null);
const description = ref(props.task.description);
watch(
  () => props.task,
  (newTask) => {
    description.value = newTask.description;
    if (refInput.value && description.value) {
      refInput.value.focus();
    }
  }
);
const submitForm = () => {
  emits("submitForm", {
    id: props.task.id || uuidv4(),
    description: description.value,
    done: props.task.done || false,
  });
  description.value = "";
};
</script>

<style scoped></style>
