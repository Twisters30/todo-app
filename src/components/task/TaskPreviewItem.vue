<template>
  <li class="task__container main-hover">
    <div class="task__title">{{ task.title }}</div>
    <div class="task__body">
      <ol class="task__todo-preview">
        <li v-for="todo in task.todos" :key="todo.id" class="task__todo-item">
          {{ todo.description }}
        </li>
      </ol>
      <div class="control__btn-group">
        <router-link :to="{ name: `PageTask`, params: { id: task.id } }">
          <button-edit />
        </router-link>
        <button-delete @click="deleteTask" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import useStoreTask from "@/store/tasks";
import confirm from "@/helper/confirm";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
const storeTask = useStoreTask();
const deleteTask = async () => {
  const resultConfirm = await confirm("Вы уверенны?");
  if (resultConfirm) {
    storeTask.deleteTask(props.task.id);
  }
};
</script>

<style scoped lang="scss">
.task {
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 24px;
  }
  &__container {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
  }
  &__todo-preview {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
