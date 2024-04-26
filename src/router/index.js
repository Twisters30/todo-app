import { createRouter, createWebHashHistory } from "vue-router";
import TodoList from "@/views/TodoList";
import PageTask from "@/views/PageTodo";

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
    name: "redirect",
    component: TodoList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
