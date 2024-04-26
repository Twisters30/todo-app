<template>
  <button class="btn btn-outline-info btn__icon">
    <pen-icon />
    <slot>
      <span v-if="showText" class="btn__text">Редактировать</span>
    </slot>
  </button>
</template>

<script setup>
import PenIcon from "@/components/icons/PenIcon.vue";
import { defineProps } from "vue";
defineProps({
  showText: {
    type: Boolean,
    default: true,
  },
});
</script>
<style></style>
