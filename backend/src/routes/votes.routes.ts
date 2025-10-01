import { Router } from 'express';
import { voteController } from '../controllers/votes.controller';

const router = Router();

router.post('/:id/vote', voteController);

export default router;
