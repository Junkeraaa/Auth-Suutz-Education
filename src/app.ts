import express from 'express';
import authRoutes from './routes/authRoutes';
import classRoutes from './routes/classRoutes'

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);

export default app;
