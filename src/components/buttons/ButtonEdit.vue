<template>
  <button class="btn btn-outline-info btn-edit">
    <pen-icon class="border-0" />
    <slot>редактировать</slot>
  </button>
</template>

<script setup>
import PenIcon from "@/components/icons/PenIcon.vue";
</script>

<style scoped lang="scss">
.btn-edit {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
