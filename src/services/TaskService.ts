import Task from '../models/Task';
import { ITask, TaskStatus } from '../interfaces/Task';

export class TaskService {
  // Recherche avancée de tâches
  async findTasks(filters: Partial<ITask>) {
    const query: any = {};
    
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.priority) {
      query.priority = filters.priority;
    }
    if (filters.assignedTo) {
      query.assignedTo = filters.assignedTo;
    }

    return Task.find(query);
  }

  // Obtenir les tâches par statut
  async getTasksByStatus(status: TaskStatus) {
    return Task.find({ status });
  }

  // Obtenir les tâches en retard
  async getOverdueTasks() {
    const now = new Date();
    return Task.find({
      dueDate: { $lt: now },
      status: { $ne: TaskStatus.COMPLETED }
    });
  }

  // Mettre à jour le statut d'une tâche
  async updateTaskStatus(taskId: string, status: TaskStatus) {
    return Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );
  }
}