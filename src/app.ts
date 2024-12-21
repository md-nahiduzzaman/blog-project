// const express = require("express");
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import userRouter from './app/module/user/user.router';
import AuthRouter from './app/module/auth/auth.router';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import blogRouter from './app/module/blog/blog.router';
import adminRouter from './app/module/admin/admin.router';

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/blogs', blogRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Alhamdulillah, Blog Project Server Live..',
  });
});

app.use(globalErrorHandler);

//Not Found
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found!!',
    error: '',
  });
});

export default app;
