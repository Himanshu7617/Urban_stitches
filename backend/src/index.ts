import express, {Express} from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/AdminRoutes';
import userRoutes from './routes/UserRoutes';
import path from 'path';
dotenv.config();


const app : Express = express();
const port = process.env.BACKEND_PORT || 4000;

app.use('/uploads',express.static('./uploads'));
app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
})

