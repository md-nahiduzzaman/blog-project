/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import mongoose from 'mongoose';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
  res: Response,
) => {
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    };
  });

  res.status(400).json({
    success: false,
    message: err.message || 'Validation failed',
    statusCode: 400,
    issues: issues,
    error: { details: err?.message },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
