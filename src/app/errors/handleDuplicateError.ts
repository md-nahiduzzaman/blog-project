/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleDuplicateError = (err: any, res: Response) => {
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: err.message || 'An error occurred',
    statusCode: StatusCodes.CONFLICT,
    error: {
      details: err.details || 'No additional details available',
    },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
