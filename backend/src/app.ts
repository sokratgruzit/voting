import express from 'express';
import cors from 'cors';
import ideasRoutes from './routes/ideas.routes';
import votesRoutes from './routes/votes.routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.set('trust proxy', process.env.TRUST_PROXY === 'true');

app.use('/api/ideas', ideasRoutes);
app.use('/api/ideas', votesRoutes); // POST /:id/vote

app.use(errorHandler);

export default app;
