import { Request, Response } from 'express';
import Task from '../models/Task';
import { ITask } from '../interfaces/Task';

export class TaskController {
  // Créer une tâche
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Récupérer toutes les tâches
  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Récupérer une tâche par ID
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

  // Mettre à jour une tâche
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

  // Supprimer une tâche
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