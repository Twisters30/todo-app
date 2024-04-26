import type { TKeyStore, Todo } from "@/types/todo";

export const useLocalStore = () => {
  const setLocalStore = (key: TKeyStore, data: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const getLocalStore = (key: "todos") => {
    const jsonData = localStorage.getItem(key);
    const result = jsonData ? JSON.parse(jsonData) : jsonData;
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
