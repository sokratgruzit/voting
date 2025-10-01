import { Request, Response, NextFunction } from 'express';
import { VotesService } from '../services/votes.service';
import { getClientIp } from '../utils/get-ip';

const service = new VotesService();

export const voteController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ip = getClientIp(req);
        const ideaId = Number(req.params.id);
        const result = await service.vote({ ip, ideaId });
        res.status(201).json(result);
    } catch (err: any) {
        next(err);
    }
};
