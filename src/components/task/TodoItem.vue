<template>
  <li v-if="props.task" class="todo__item main-hover list__item">
    <button-sort-grab v-if="showIconSorting" class="handle mb-3" />
    <div class="todo__content-wrapper">
      <div
        @click.stop="toggleCheckbox"
        class="form-check form-check-inline todo__description"
      >
        <label class="todo__content-wrapper">
          <input
            ref="checkboxRef"
            @change="toggleCheckbox($event.currentTarget.checked)"
            :checked="props.task?.done"
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
          />
        </label>
        {{ task.description }}
      </div>
      <div class="control__btn-group">
        <button-edit
          @click.stop="$emit('editDescriptionTodo', task)"
          data-bs-toggle="modal"
          data-bs-target="#baseModal"
        />
        <button-delete @click.stop="$emit('deleteTodo', $props.task.id)" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import ButtonSortGrab from "@/components/buttons/ButtonSortGrab.vue";
import { Task } from "@/types/todo";

interface Props {
  task: Task;
  showIconSorting: boolean;
}

const emits = defineEmits(["deleteTodo", "changeState", "editDescriptionTodo"]);
const props = defineProps<Props>();
const checkboxRef = ref<HTMLInputElement | null>(null);
console.log(props.showIconSorting);
const toggleCheckbox = (done: boolean | undefined) => {
  emits("changeState", {
    ...props.task,
    done: typeof done === "boolean" ? done : !checkboxRef.value?.checked,
  });
};
</script>

<style lang="scss">
.todo {
  &__content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__item {
    display: block;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    @media (max-width: 664px) {
      flex-direction: column;
    }
  }
  div &__description {
    display: flex;
    word-break: break-all;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      margin-right: auto;
      margin-bottom: 1rem;
    }
  }
}
ul {
  list-style-type: none !important;
}
.sort-icon {
  width: fit-content;
  margin-right: auto;
}
</style>
