import { ref, computed, watch } from "vue";
import useSafeState from "@/store/safeState";
import generateId from "@/helper/generateId";

const tasks = ref([
  {
    id: 1,
    title: "сделать todo-list",
    todos: [
      { id: 1, description: "подумать", done: false },
      { id: 2, description: "набросать дизайн", done: false },
      { id: 3, description: "продумать логику", done: false },
      { id: 4, description: "выполнить команду vue create todo", done: false },
      { id: 5, description: "приступить к вёрстке", done: false },
      { id: 6, description: "сделать логику", done: false },
    ],
  },
]);
// Загрузка данных и сохронение в localStorage
const safeState = useSafeState();
const keyTaskStore = "#tasks-store";
let flagTasksLoaded = false;
watch(
  () => tasks.value,
  (currentTasks) => {
    // загрузка данных из localStorage
    if (!flagTasksLoaded) {
      tasks.value = safeState.get(keyTaskStore);
      flagTasksLoaded = true;
    }
    // сохраняем задачи  в localStorage
    safeState.set(keyTaskStore, currentTasks);
  },
  { immediate: true, deep: true }
);
export default function () {
  // Получить все задачи
  const getTasks = computed(() => {
    return tasks;
  });
  // Получить задачу по id
  const getTaskById = (id) => {
    return tasks.value.find((task) => Number(task.id) === Number(id));
  };
  // Создать новую задачу
  const createTask = (payloadTask) => {
    tasks.value.push({ ...payloadTask, id: generateId() });
  };
  // Удалить всю задачу
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };
  // Удалить дело в задаче
  const deleteTodoInTask = (taskId, todoId) => {
    tasks.value = tasks.value.map((task) => {
      // ищем задачу по id
      if (Number(task.id) === Number(taskId)) {
        // в ней ищем дело и получаем все не равные todoId
        const updatedTodos = task.todos.filter(
          (todo) => Number(todo.id) !== Number(todoId)
        );
        return { ...task, todos: updatedTodos };
      }
      return task;
    });
  };
  // редактируем дело
  const editTodoInTask = (taskId, payloadTask) => {
    console.log(taskId, payloadTask);
    console.log("id" in payloadTask);
    tasks.value = tasks.value.map((task) => {
      if (Number(task.id) === Number(taskId)) {
        // если id отстутствуем тогда добавим дело как новое
        if (!("id" in payloadTask)) {
          payloadTask.id = generateId();
          payloadTask.done = false;
          task.todos.push(payloadTask);
          console.log(task);
          return task;
        }
        const updatedTodos = task.todos.map((todo) => {
          if (Number(todo.id) === Number(payloadTask.id)) {
            return payloadTask;
          }
          return todo;
        });
        return { ...task, todos: updatedTodos };
      }
      return task;
    });
  };
  return {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    deleteTodoInTask,
    editTodoInTask,
  };
}
