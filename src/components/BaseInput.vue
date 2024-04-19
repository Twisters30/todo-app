<template>
  <div class="mb-3">
    <label v-if="isShowLabel" class="form-label"
      ><slot>Название задачи</slot></label
    >
    <input
      @input="$emit('update', inputValue)"
      v-model="inputValue"
      v-bind="titleAttrs"
      placeholder="ведите задачу"
      type="text"
      class="form-control"
    />
    <span class="error-field">
      {{ errors.inputValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { computed, defineProps, defineEmits } from "vue";
import { toTypedSchema } from "@vee-validate/yup";
import * as yap from "yup";

defineEmits(["update"]);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  isShowLabel: {
    type: Boolean,
    default: true,
  },
});
const { errors, defineField } = useForm({
  initialValues: {
    inputValue: props.modelValue,
  },
  validationSchema: computed(() =>
    toTypedSchema(
      yap.object({
        inputValue: yap.string().required("запоните поле"),
      })
    )
  ),
});
const [inputValue, titleAttrs] = defineField("inputValue");
</script>

<style scoped lang="scss"></style>
