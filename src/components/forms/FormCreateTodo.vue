<template>
  <form novalidate @submit.prevent="submitForm">
    <div class="mb-3">
      <label class="form-label">Название списка задач</label>
      <input
        v-model="title"
        v-bind="titleAttrs"
        placeholder="введите задачу"
        type="text"
        class="form-control"
      />
      <span class="error-field">
        {{ errors.title }}
      </span>
    </div>
    <ul class="mb-3">
      <li v-for="(task, i) in fields" :key="i">
        <label class="form-label">Название дела</label>
        <div class="todo__input-row">
          <div class="todo__outer-wrapper">
            <div class="todo__wrapper-input">
              <input
                v-model="task.value.description"
                placeholder="введите дело"
                type="text"
                class="form-control"
              />
              <span class="error-field">
                {{ errors[`tasks[${i}].description`] }}
              </span>
            </div>
            <button-delete
              class="todo__btn-delete"
              @click.stop="removeTask(task.id)"
              :show-text="false"
            />
          </div>
        </div>
      </li>
    </ul>
    <div class="control__btn-group">
      <button @click.stop="clickAddTask" type="button" class="btn btn-primary">
        добавить дело в список +
      </button>
      <span class="error-field">{{ errors.tasks }}</span>
      <button-delete class="mb-3" @click.stop="resetForm"
        >очистить форму
      </button-delete>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Закрыть
      </button>
      <button
        :disabled="!(meta.dirty && meta.valid)"
        data-bs-dismiss="modal"
        type="submit"
        class="btn btn-primary"
      >
        Создать задачу
      </button>
    </div>
  </form>
</template>

<script setup>
import { useForm, useFieldArray, useResetForm } from "vee-validate";
import { v4 as uuidv4 } from "uuid";
import { computed, defineEmits } from "vue";
import { toTypedSchema } from "@vee-validate/yup";
import * as yap from "yup";
import ButtonDelete from "@/components/buttons/ButtonDelete";

const emits = defineEmits(["createTodo"]);
const { handleSubmit, defineField, errors, meta } = useForm({
  initialValues: {
    title: "",
    tasks: [{ description: "", id: uuidv4() }],
  },
  validationSchema: computed(() =>
    toTypedSchema(
      yap.object({
        title: yap.string().required("запоните поле"),
        tasks: yap
          .array(
            yap.object({
              description: yap.string().required("запоните поле"),
              id: yap.string(),
            })
          )
          .min(1, "добавте дело"),
      })
    )
  ),
});
const { remove, push, fields } = useFieldArray("tasks");
const [title, titleAttrs] = defineField("title");
const resetForm = useResetForm();
// создаёт новою задачу
const clickAddTask = () => {
  push({ id: uuidv4() });
};
const submitForm = handleSubmit((values) => {
  emits("createTodo", { id: uuidv4(), ...values });
  resetForm();
});

// удалить не нужное дело по клику на крестик
const removeTask = (taskId) => {
  remove(taskId);
};
// очистка формы
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}
.todo {
  &__input-row {
    display: flex;
    flex-direction: column;
  }
  &__outer-wrapper {
    display: flex;
    gap: 10px;
  }
  &__wrapper-input {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    @media (max-width: 500px) {
      //flex-direction: column;
    }
  }
  &__btn-delete {
    width: fit-content;
    max-height: 38px;
  }
}
</style>
