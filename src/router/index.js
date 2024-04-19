import { createRouter, createWebHistory } from "vue-router";
import TodoList from "@/views/TodoList";
import PageTask from "@/views/PageTodo";
import PageNotFound from "@/views/PageNotFound";

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/task/:id",
    name: "PageTodo",
    component: PageTask,
    props: true,
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
