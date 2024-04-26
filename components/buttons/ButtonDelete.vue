<template>
  <button type="button" class="btn btn-outline-danger btn__icon">
    <trash-icon />
    <slot><span v-if="showText" class="btn__text">Удалить</span></slot>
  </button>
</template>

<script setup lang="ts">
import TrashIcon from "@/components/icons/TrashIcon.vue";
import { defineProps } from "vue";

defineProps({
  showText: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss"></style>
