import pool from '../config/db';
import { Idea } from '../models/idea.model';

export class IdeasRepository {
    async findAllWithVoted(ip: string): Promise<(Idea & { voted: boolean })[]> {
        const res = await pool.query(
            `SELECT i.id, i.title, i.description, i.votes,
                    (v.id IS NOT NULL) AS voted
            FROM ideas i
            LEFT JOIN votes v ON v.idea_id = i.id AND v.ip = $1
            ORDER BY i.votes DESC`,
            [ip]
        );

        return res.rows; 
    }
}

