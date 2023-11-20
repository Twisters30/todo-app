<template>
  <li class="todo__item main-hover">
    <div class="form-check form-check-inline todo__description">
      <input
        :checked="todo.done"
        @change="$emit('editTodo', { ...todo, done: !todo.done })"
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
      />
      {{ todo.description }}
    </div>
    <div class="control__btn-group">
      <button-edit
        @click="$emit('editDescriptionTodo', todo)"
        data-bs-toggle="modal"
        data-bs-target="#baseModal"
      />
      <button-delete @click="$emit('deleteTodo', props.todo.id)" />
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ButtonDelete from "@/components/buttons/ButtonDelete";
defineEmits(["deleteTodo", "editTodo", "editDescriptionTodo"]);
const props = defineProps({
  todo: {
    type: Object,
  },
});
</script>

<style lang="scss">
.todo {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  &__description {
    display: flex;
  }
}
ul {
  list-style-type: none !important;
}
</style>
