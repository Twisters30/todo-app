import type { TKeyStore, Todo } from "@/types/todo";

export const useLocalStore = () => {
  const setLocalStore = (key: TKeyStore, data: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const getLocalStore = (key: "todos") => {
    const result = JSON.parse(localStorage.getItem(key) || "");
    if (!result) {
      return [];
    } else {
      return result;
    }
  };
  return {
    setLocalStore,
    getLocalStore,
  };
};
