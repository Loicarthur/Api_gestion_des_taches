import { Request, Response, NextFunction } from 'express';
import { TaskStatus, TaskPriority } from '../interfaces/Task';

export const validateTaskInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { title, description, status, priority } = req.body;

    if (!title || title.trim().length < 3) {
      res.status(400).json({ message: 'Le titre doit contenir au moins 3 caractères' });
      return;
    }

    if (!description || description.trim().length < 10) {
      res.status(400).json({ message: 'La description doit contenir au moins 10 caractères' });
      return;
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
      res.status(400).json({ message: 'Statut invalide' });
      return;
    }

    if (priority && !Object.values(TaskPriority).includes(priority)) {
      res.status(400).json({ message: 'Priorité invalide' });
      return;
    }
  }
  next();
};