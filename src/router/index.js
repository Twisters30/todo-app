import { createRouter, createWebHistory } from "vue-router";
import TodoList from "@/views/TodoList";
import PageTask from "@/views/PageTask";
import PageNotFound from "@/views/PageNotFound";
import useStoreTasks from "@/store/tasks";

const storeTasks = useStoreTasks();
const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/task/:id",
    name: "PageTask",
    component: PageTask,
    props: true,
    beforeEnter(to) {
      const id = parseInt(to.params.id);
      const exist = storeTasks.getTaskById(id);
      if (!exist) {
        return { redirect: "/" };
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
