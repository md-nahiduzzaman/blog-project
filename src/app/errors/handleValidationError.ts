/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    };
  });

  res.status(400).json({
    success: false,
    message: err.message || 'An error occurred',
    statusCode: 400,
    issues: issues,
    error: {
      details: err.details || 'No additional details available',
    },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
