import express from 'express';
import AccountRoutes from './routes/account.routes';
import ClassroomRoutes from './routes/classroom.routes';
import StudentRoutes from './routes/student.routes';


const app = express();

app.use(express.json());


app.use('/api/auth', AccountRoutes);
app.use('/api/classroom', ClassroomRoutes);
app.use('/api/student', StudentRoutes);



export default app;
