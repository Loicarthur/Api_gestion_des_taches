import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`Error ${error.name}: ${error.message}`);
  console.error(error.stack);

  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Une erreur interne est survenue',
      code: error.code || 'INTERNAL_ERROR',
      status: error.status || 500
    }
  });
};