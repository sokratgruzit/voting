import { Router } from 'express';
import { getIdeasController } from '../controllers/ideas.controller';

const router = Router();

router.get('/', getIdeasController);

export default router;
