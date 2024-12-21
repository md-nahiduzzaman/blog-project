/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const handleCastError = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: err.message || 'Invalid data type',
    statusCode: 400,
    error: { details: err?.message },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
