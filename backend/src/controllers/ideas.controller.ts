import { Request, Response, NextFunction } from 'express';
import { IdeasRepository } from '../repositories/ideas.repository';

const repo = new IdeasRepository();

export const getIdeasController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.ip) return res.status(400).json({ error: 'IP не определён' });

        const ideas = await repo.findAllWithVoted(req.ip);
        res.json(ideas); 
    } catch (err) {
        next(err);
    }
};
