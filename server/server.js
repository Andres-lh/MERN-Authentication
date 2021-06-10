import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import connectDb from './config/db.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/users', userRouter)

connectDb();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>console.log(`Server running on port http://localhost:${PORT}`))