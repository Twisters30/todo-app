<template>
  <div class="container">
    <main>
      <button-create data-bs-toggle="modal" data-bs-target="#baseModal" />
      <ul class="task__list p-0">
        <task-preview-item v-for="task in tasks" :key="task.id" :task="task" />
      </ul>
      <base-modal>
        <form-create-task />
      </base-modal>
      <h2 v-if="!storeTasks.getTasks.value.value.length">Задач нет...</h2>
    </main>
  </div>
</template>

<script setup>
import TaskPreviewItem from "@/components/task/TaskPreviewItem";
import useStoreTasks from "@/store/tasks";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import BaseModal from "@/components/BaseModal";
import FormCreateTask from "@/components/forms/FormCreateTask";

const storeTasks = useStoreTasks();
const tasks = storeTasks.getTasks.value;
console.log(storeTasks.getTasks.value.value);
</script>
<style scoped lang="scss"></style>
