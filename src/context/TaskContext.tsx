import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import {
  storeTasks,
  getTasksFromLocalStorage,
  storeCompletedTasks,
  getCompletedTasksFromLocalStorage,
} from '../utils/userPersistedState';

interface TaskContextData {
  tasks: TaskProps[];
  completedTasks: TaskProps[];
  taskFilter: string;
  taskDetails: TaskProps;
  isTaskDetailShown: boolean;
  createNewTask: (title: string, description: string, priority: string) => void;
  deleteTask: (position: number) => void;
  updateTaskFilter: (filter: string) => void;
  showTaskDetails: (task: TaskProps) => void;
  storeCompletedTask: (task: TaskProps) => void;
  getTasksFromLocalStorage: () => [];
  openTaskDetailsBox: () => void;
  closeTaskDetailsBox: () => void;
}

interface TaskProps {
  title: string;
  position: number;
  tag: string;
  priority: string;
  date: string;
  description: string;
  checked?: boolean;
}

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext({} as TaskContextData);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskProps[]>([]);
  const [taskFilter, setTaskFilter] = useState('allTasks');
  const [isTaskDetailShown, setIsTaskDetailShown] = useState(true);
  const [taskDetails, setTaskDetails] = useState<TaskProps>(null);
  const [lastPosition, setLastPosition] = useState();

  function createNewTask(title: string, description: string, priority: string) {
    const task = {
      title: title,
      position: tasks.length === 0 ? 1 : tasks[tasks.length - 1].position + 1,
      tag: '',
      priority: priority,
      date: '',
      description: description,
      checked: false,
    };
    setTasks([...tasks, task]);
  }

  function deleteTask(position: number) {
    const tempTask = tasks.filter(task => {
      return task.position !== position && task;
    });
    setTasks(tempTask);
  }

  function updateTaskFilter(filter: string) {
    setTaskFilter(filter);
  }

  function storeCompletedTask(completedTask: TaskProps) {
    completedTask.checked = true;
    setCompletedTasks([...completedTasks, completedTask]);
  }

  function showTaskDetails(task: TaskProps) {
    setTaskDetails(task);
  }

  function openTaskDetailsBox() {
    setIsTaskDetailShown(true);
  }

  function closeTaskDetailsBox() {
    setIsTaskDetailShown(false);
  }

  useEffect(() => {
    setTasks(getTasksFromLocalStorage());
    setCompletedTasks(getCompletedTasksFromLocalStorage());
  }, []);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storeCompletedTasks(completedTasks);
  }, [completedTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        taskFilter,
        taskDetails,
        isTaskDetailShown,
        createNewTask,
        deleteTask,
        updateTaskFilter,
        showTaskDetails,
        storeCompletedTask,
        getTasksFromLocalStorage,
        openTaskDetailsBox,
        closeTaskDetailsBox,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}