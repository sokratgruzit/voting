import pool from '../config/db';
import { Vote } from '../models/vote.model';
import { QueryResult } from 'pg';

export class VotesRepository {
    async countByIp(ip: string): Promise<number> {
        const res = await pool.query('SELECT cnt FROM ip_counters WHERE ip = $1', [ip]);
        return res.rowCount ? res.rows[0].cnt : 0;
    }

    async exists(ip: string, ideaId: number): Promise<boolean> {
        const res = await pool.query('SELECT 1 FROM votes WHERE ip=$1 AND idea_id=$2', [ip, ideaId]);
        return (res.rowCount as number) > 0;
    }

    async add(vote: Vote): Promise<void> {
        await pool.query('BEGIN');

        try {
            // вставляем голос
            await pool.query('INSERT INTO votes (idea_id, ip) VALUES ($1, $2)', [vote.ideaId, vote.ip]);

            // обновляем количество голосов в таблице ideas
            await pool.query('UPDATE ideas SET votes = votes + 1 WHERE id = $1', [vote.ideaId]);

            // обновляем счетчик по IP
            await pool.query(`
                INSERT INTO ip_counters(ip, cnt) VALUES($1, 1)
                ON CONFLICT(ip) DO UPDATE SET cnt = ip_counters.cnt + 1
            `, [vote.ip]);

            await pool.query('COMMIT');
        } catch (err) {
            await pool.query('ROLLBACK');
            throw err;
        }
    }


    async getIdeaIdsByIp(ip: string): Promise<number[]> {
        const res = await pool.query('SELECT idea_id FROM votes WHERE ip=$1', [ip]);
        return res.rows.map(r => r.idea_id);
    }
}
