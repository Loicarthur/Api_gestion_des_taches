import Task from '../models/Task';
import { ITask, TaskStatus, TaskFilters, PaginationOptions } from '../interfaces/Task';

/**
 * Service pour la gestion des tâches
 * @class TaskService
 */
export class TaskService {
  /**
   * Recherche des tâches avec filtres
   * @param {Partial<ITask>} filters - Filtres à appliquer
   * @returns {Promise<ITask[]>} Liste des tâches filtrées
   */
  async findTasks(filters: Partial<ITask>): Promise<ITask[]> {
    const query: any = {};
    
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.assignedTo) query.assignedTo = filters.assignedTo;

    return Task.find(query);
  }

  /**
   * Récupère les tâches avec pagination et filtres avancés
   * @param {PaginationOptions} paginationOptions - Options de pagination
   * @param {TaskFilters} filters - Filtres à appliquer
   * @returns {Promise<{ tasks: ITask[]; total: number; pages: number }>}
   */
  async getTasks(
    paginationOptions: PaginationOptions,
    filters: TaskFilters
  ): Promise<{ tasks: ITask[]; total: number; pages: number }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = paginationOptions;
    const query: any = {};

    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = filters.startDate;
      if (filters.endDate) query.createdAt.$lte = filters.endDate;
    }

    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(query),
    ]);

    return {
      tasks,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Récupère les tâches par statut
   * @param {TaskStatus} status - Statut des tâches à récupérer
   * @returns {Promise<ITask[]>} Liste des tâches avec le statut spécifié
   */
  async getTasksByStatus(status: TaskStatus): Promise<ITask[]> {
    return Task.find({ status });
  }

  /**
   * Récupère les tâches en retard
   * @returns {Promise<ITask[]>} Liste des tâches en retard
   */
  async getOverdueTasks(): Promise<ITask[]> {
    const now = new Date();
    return Task.find({
      dueDate: { $lt: now },
      status: { $ne: TaskStatus.COMPLETED }
    });
  }

  /**
   * Met à jour le statut d'une tâche
   * @param {string} taskId - ID de la tâche à mettre à jour
   * @param {TaskStatus} status - Nouveau statut
   * @returns {Promise<ITask | null>} Tâche mise à jour
   */
  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<ITask | null> {
    return Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );
  }

  /**
   * Recherche des tâches par mot-clé
   * @param {string} keyword - Mot-clé de recherche
   * @returns {Promise<ITask[]>} Liste des tâches correspondantes
   */
  async searchTasks(keyword: string): Promise<ITask[]> {
    return Task.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });
  }
}