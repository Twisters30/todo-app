<template>
  <router-link
    :to="previousPage"
    class="nav-btn btn btn-outline-dark btn__icon"
  >
    <arrow-left-icon />
    <slot>Назад</slot>
  </router-link>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router/dist/vue-router";
import { computed } from "vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";

const router = useRouter();

const previousPage = computed(() => {
  const lastPath = router.options.history.state.back;
  return lastPath ? lastPath : "/";
});
</script>

<style scoped>
.nav-btn {
  width: fit-content;
}
</style>
