<script setup lang="ts">
import SortIcon from "@/components/icons/SortIcon.vue";
</script>

<template>
  <button class="btn grab-icon"><sort-icon /></button>
</template>

<style scoped lang="scss">
.grab-icon {
  width: fit-content;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>
