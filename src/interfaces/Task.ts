export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
  export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export interface ITask {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    startDate?: Date;
    endDate?: Date;
    search?: string;
  }
  
  export interface PaginationOptions {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }