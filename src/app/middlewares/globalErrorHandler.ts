/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleZodError } from '../errors/handleZodError';
import { handleCastError } from '../errors/handleCaseError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { handleGenericError } from '../errors/handleGenericError';

type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: {
    details: string;
  };
  stack?: string;
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
