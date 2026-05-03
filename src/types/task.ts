export type TaskPriority = 'baixa' | 'media' | 'alta';

export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
};