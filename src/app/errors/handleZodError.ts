/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ZodError } from 'zod';

export const handleZodError = (err: ZodError, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      name: item.message,
      path: item.path.join('>'),
      message: item.message,
    };
  });

  res.status(400).json({
    success: false,
    message: err.message || 'Zod validation failed',
    statusCode: 400,
    issues: issues,
    error: { name: err?.name },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
