/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const handleCastError = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: err.message || 'An error occurred',
    statusCode: 400,
    error: {
      details: err.details || 'No additional details available',
    },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
