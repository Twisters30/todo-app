<template>
  <router-link :to="previousPage" class="btn btn-outline-dark">
    <slot>назад</slot>
  </router-link>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router/dist/vue-router";
import { computed } from "vue";

const router = useRouter();

const previousPage = computed(() => {
  const lastPath = router.options.history.state.back;
  return lastPath ? lastPath : "/";
});
</script>

<style scoped></style>
