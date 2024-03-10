import { createRouter, createWebHistory } from "vue-router";
import TodoList from "@/views/TodoList";
import PageTask from "@/views/PageTodo";
import PageNotFound from "@/views/PageNotFound";
// import { useTotoStore } from '@/store/tasks'
//
// const store = useTotoStore();
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
    // beforeEnter(to) {
    //   const id = parseInt(to.params.id);
    //   const exist = store.getTodoById(id);
    //   if (!exist) {
    //     return { redirect: "/" };
    //   }
    // },
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
