import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getTasks, saveTasks as saveTasksStorage } from '../services/taskStorage';
import { Task, TaskPriority } from '../types/task';

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, priority: TaskPriority, category: string) => Promise<void>;
  updateTask: (id: string, title: string, priority: TaskPriority, category: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext({} as TaskContextData);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getStorageKey() {
    return user ? `@tasks_user_${user.id}` : '@tasks_guest';
  }

  useEffect(() => {
    loadTasks();
  }, [user]);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setTasks([]);
        return;
      }

      const storedTasks = await getTasks(getStorageKey());
      setTasks(storedTasks);
    } catch (err) {
      console.log('Erro ao carregar tarefas:', err);
      setTasks([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  async function saveTasks(updated: Task[]) {
    try {
      setError(null);
      await saveTasksStorage(getStorageKey(), updated);
      setTasks(updated);
    } catch (err) {
      console.log('Erro real ao salvar tarefas:', err);
      throw err;
    }
  }

  async function addTask(title: string, priority: TaskPriority, category: string) {
    const now = new Date().toLocaleString('pt-BR');

    const newTask: Task = {
      id: String(Date.now()),
      title,
      description: '',
      status: 'pendente',
      priority,
      category,
      categoryIcon: category,
      createdAt: now,
      updatedAt: now,
    };

    await saveTasks([...tasks, newTask]);
  }

  async function updateTask(id: string, title: string, priority: TaskPriority, category: string) {
    const updated: Task[] = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            title,
            priority,
            category,
            categoryIcon: category,
            updatedAt: new Date().toLocaleString('pt-BR'),
          }
        : task
    );

    await saveTasks(updated);
  }

  async function removeTask(id: string) {
    const filtered = tasks.filter(task => task.id !== id);
    await saveTasks(filtered);
  }

  async function toggleTask(id: string) {
    const updated: Task[] = tasks.map(task => {
      if (task.id !== id) return task;

      let newStatus: Task['status'];

      if (task.status === 'pendente') {
        newStatus = 'em_andamento';
      } else if (task.status === 'em_andamento') {
        newStatus = 'concluida';
      } else {
        newStatus = 'pendente';
      }

      return {
        ...task,
        status: newStatus,
        updatedAt: new Date().toLocaleString('pt-BR'),
      };
    });

    await saveTasks(updated);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        removeTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}