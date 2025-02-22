import { Request, Response } from 'express';
import Task from '../models/Task';
import { ITask } from '../interfaces/Task';
import { TaskService } from '../services/TaskService';
import { TaskStatus, TaskPriority } from '../interfaces/Task';

/**
 * Contrôleur pour la gestion des tâches
 * @class TaskController
 */
export class TaskController {
    private taskService: TaskService;

    /**
     * Initialise une nouvelle instance du TaskController
     */
    constructor() {
      this.taskService = new TaskService();
    }
  
    /**
     * Récupère les tâches par statut
     * @async
     * @param {Request} req - Requête Express contenant le statut dans les paramètres
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async getTasksByStatus(req: Request, res: Response): Promise<void> {
      try {
        const { status } = req.params;
        const tasks = await this.taskService.getTasksByStatus(status as TaskStatus);
        res.json(tasks);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  
    /**
     * Récupère les tâches en retard
     * @async
     * @param {Request} req - Requête Express
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async getOverdueTasks(req: Request, res: Response): Promise<void> {
      try {
        const tasks = await this.taskService.getOverdueTasks();
        res.json(tasks);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }

    /**
     * Crée une nouvelle tâche
     * @async
     * @param {Request} req - Requête Express contenant les données de la tâche
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async createTask(req: Request, res: Response): Promise<void> {
      try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }

    /**
     * Récupère toutes les tâches
     * @async
     * @param {Request} req - Requête Express
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async getAllTasks(req: Request, res: Response): Promise<void> {
      try {
        const tasks = await Task.find();
        res.json(tasks);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }

    /**
     * Récupère une tâche par son ID
     * @async
     * @param {Request} req - Requête Express contenant l'ID dans les paramètres
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async getTaskById(req: Request, res: Response): Promise<void> {
      try {
        const task = await Task.findById(req.params.id);
        if (!task) {
          res.status(404).json({ message: 'Tâche non trouvée' });
          return;
        }
        res.json(task);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }

    /**
     * Met à jour une tâche existante
     * @async
     * @param {Request} req - Requête Express contenant l'ID et les données de mise à jour
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async updateTask(req: Request, res: Response): Promise<void> {
      try {
        const task = await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!task) {
          res.status(404).json({ message: 'Tâche non trouvée' });
          return;
        }
        res.json(task);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }

    /**
     * Supprime une tâche
     * @async
     * @param {Request} req - Requête Express contenant l'ID de la tâche à supprimer
     * @param {Response} res - Réponse Express
     * @returns {Promise<void>}
     */
    async deleteTask(req: Request, res: Response): Promise<void> {
      try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
          res.status(404).json({ message: 'Tâche non trouvée' });
          return;
        }
        res.json({ message: 'Tâche supprimée avec succès' });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
}