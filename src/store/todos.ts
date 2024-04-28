import { ref, toRef } from "vue";
import { defineStore } from "pinia";
import { useLocalStore } from "@/store/safeState";
import type { Todo, Task } from "@/types/todo";
import router from "@/router";

export const useTodoStore = defineStore("todos", () => {
  const { getLocalStore, setLocalStore } = useLocalStore();
  const todos = ref<Todo[]>(getLocalStore("todos"));
  // Получить задачу по id
  const getTodoById = (todoId: string) => {
    return todos.value.find((todo) => todo.id === todoId);
  };
  // создать новый ТОДО
  const createTodo = (payloadTodo: Todo) => {
    console.log(payloadTodo, "create todo");
    todos.value.push(payloadTodo);
    setLocalStore("todos", todos.value);
  };
  // добавить новую под задачу
  const addTask = (payloadTodo: Todo, payloadTask: Task) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === payloadTodo.id) {
        todo.tasks.unshift(payloadTask);
      }
      return todo;
    });
    setLocalStore("todos", todos.value);
  };
  // Удалить всю задачу
  const deleteTodo = async (todoId: string) => {
    const resultConfirm = await confirm("Вы уверенны?");
    if (resultConfirm) {
      todos.value = todos.value.filter((todo) => todo.id !== todoId);
    }
    setLocalStore("todos", todos.value);
  };
  // Удалить дело в задаче
  const deleteTaskInTodo = async (todoId: string, taskId: string) => {
    const resultConfirm = await confirm("Вы уверенны?");
    if (!resultConfirm) return;
    todos.value = todos.value.map((todo) => {
      // ищем задачу по id
      if (todo.id === todoId) {
        // в ней ищем дело и получаем все не равные taskId
        const updatedTasks = todo.tasks.filter((task) => {
          return task.id !== taskId;
        });
        return { ...todo, tasks: updatedTasks };
      }
      return todo;
    });
    clearEmptyTodos();
    setLocalStore("todos", todos.value);
  };
  // редактируем дело
  const updateTodo = (todoPayload: Todo) => {
    todos.value = todos.value.map((todo) => {
      if (todoPayload.id === todo.id) {
        return todoPayload;
      }
      return todo;
    });
    setLocalStore("todos", todos.value);
  };
  const updateAllTodos = (todosPayload: Todo[]) => {
    todos.value = todosPayload;
    setLocalStore("todos", todosPayload);
  };
  const updateTaskInTodo = (todoPayload: Todo, taskPayload: Task) => {
    return todoPayload.tasks.map((task) => {
      if (task.id === taskPayload.id) {
        return toRef(taskPayload).value;
      }
      return task;
    });
  };
  const updateTodoTitle = ({
    id,
    title,
  }: {
    id: Todo["id"];
    title: Todo["title"];
  }) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    setLocalStore("todos", todos.value);
  };
  const clearEmptyTodos = () => {
    const todosCount = todos.value.length;
    todos.value = todos.value.filter((todo) => todo.tasks.length);
    if (todosCount !== todos.value.length) {
      router.push({ name: "TodoList" });
    }
    setLocalStore("todos", todos.value);
  };
  return {
    todos,
    deleteTodo,
    getTodoById,
    createTodo,
    addTask,
    deleteTaskInTodo,
    updateTodo,
    updateTaskInTodo,
    updateTodoTitle,
    updateAllTodos,
  };
});
