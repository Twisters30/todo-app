<template>
  <button class="btn btn-outline-success btn__icon">
    <book-icon />
    <slot><span class="btn__text" v-if="showText">Открыть</span></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import BookIcon from "@/components/icons/BookIcon.vue";

defineProps({
  showText: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss"></style>
