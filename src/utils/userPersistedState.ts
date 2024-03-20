import Cookies from "js-cookie";

interface TaskProps {
  title: string;
  position: number;
  tag: string;
  priority: string;
  date: string;
  description: string;
  checked?: boolean;
}

export function storeTasks(tasks: TaskProps[]) {
  // Cookies.set('tasks', JSON.stringify(tasks));
  localStorage.setItem("@nextTask:tasks", JSON.stringify(tasks));
}

export function getTasksFromLocalStorage() {
  const storagedTasks = localStorage.getItem("@nextTask:tasks");
  if (storagedTasks) {
    return JSON.parse(storagedTasks);
  } else {
    return [];
  }
}

export function storeCompletedTasks(completedTasks: TaskProps[]) {
  // Cookies.set('tasks', JSON.stringify(tasks));
  localStorage.setItem(
    "@nextTask:completedTasks",
    JSON.stringify(completedTasks),
  );
}

export function getCompletedTasksFromLocalStorage() {
  const storagedCompletedTasks = localStorage.getItem(
    "@nextTask:completedTasks",
  );
  if (storagedCompletedTasks) {
    return JSON.parse(storagedCompletedTasks);
  } else {
    return [];
  }
}
