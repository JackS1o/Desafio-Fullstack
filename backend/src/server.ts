import express from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(router);

app.listen(4000, () => console.log('Server is running on localhost:4000'));
