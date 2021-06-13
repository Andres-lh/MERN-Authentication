import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import connectDb from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import privateRouter from './routes/privateRouter.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/private', privateRouter)

//Error handler
app.use(errorHandler);

connectDb();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>console.log(`Server running on port http://localhost:${PORT}`))