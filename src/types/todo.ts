export type Task = {
  id: string;
  description: string;
  done: boolean;
};

export type Todo = {
  id: string;
  title: string;
  tasks: Task[];
};

export type TKeyStore = "todos";
