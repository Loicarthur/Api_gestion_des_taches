import mongoose, { Schema, Document } from 'mongoose';
import { ITask, TaskStatus, TaskPriority } from '../interfaces/Task';

/**
 * Interface pour le document Mongoose d'une tâche
 * @interface ITaskDocument
 * @extends {ITask}
 * @extends {Document}
 */
export interface ITaskDocument extends ITask, Document {}

/**
 * Schéma Mongoose pour les tâches
 * @constant {Schema} TaskSchema
 */
const TaskSchema: Schema = new Schema({
  /**
   * Titre de la tâche
   * @member {String}
   * @required
   */
  title: {
    type: String,
    required: true,
    trim: true
  },

  /**
   * Description détaillée de la tâche
   * @member {String}
   * @required
   */
  description: {
    type: String,
    required: true
  },

  /**
   * Statut actuel de la tâche
   * @member {TaskStatus}
   * @default TaskStatus.TODO
   */
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO
  },

  /**
   * Niveau de priorité de la tâche
   * @member {TaskPriority}
   * @default TaskPriority.MEDIUM
   */
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM
  },

  /**
   * Date d'échéance de la tâche
   * @member {Date}
   * @optional
   */
  dueDate: {
    type: Date
  },

  /**
   * Identifiant de l'utilisateur assigné à la tâche
   * @member {String}
   * @optional
   */
  assignedTo: {
    type: String
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

/**
 * Modèle Mongoose pour les tâches
 * @const {Model<ITaskDocument>}
 */
export default mongoose.model<ITaskDocument>('Task', TaskSchema);