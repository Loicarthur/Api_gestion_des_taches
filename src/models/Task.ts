import mongoose, { Schema, Document } from 'mongoose';
import { ITask, TaskStatus, TaskPriority } from '../interfaces/Task';

export interface ITaskDocument extends ITask, Document {}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM
  },
  dueDate: {
    type: Date
  },
  assignedTo: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<ITaskDocument>('Task', TaskSchema);