import express from 'express';
import authRoutes from './routes/authRoutes';
import classRoutes from './routes/classRoutes'
import lessonRoutes from './routes/lessonRoutes';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/lesson', lessonRoutes)

export default app;
