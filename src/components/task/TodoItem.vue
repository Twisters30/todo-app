<template>
  <li @click="toggleCheckbox" class="todo__item main-hover">
    <div class="form-check form-check-inline todo__description">
      <input
        ref="checkboxRef"
        :checked="task.done"
        @change="toggleCheckbox($event.target.checked)"
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
      />
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
  </li>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ButtonDelete from "@/components/buttons/ButtonDelete";
const emits = defineEmits(["deleteTodo", "changeState", "editDescriptionTodo"]);
const props = defineProps({
  task: {
    type: Object,
  },
});
const checkboxRef = ref(null);
const toggleCheckbox = (done) => {
  if (checkboxRef.value) {
    emits("changeState", {
      ...props.task,
      done: typeof done === "boolean" ? done : !checkboxRef.value.checked,
    });
  }
};
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
