import { VotesRepository } from '../repositories/votes.repository';
import { Vote } from '../models/vote.model';

export class VotesService {
    constructor(private repo = new VotesRepository()) {}

    async vote(vote: Vote) {
        const count = await this.repo.countByIp(vote.ip);
        if (count >= 10) throw { status: 409, message: 'Limit exceeded' };

        const already = await this.repo.exists(vote.ip, vote.ideaId);
        if (already) throw { status: 409, message: 'Already voted' };

        await this.repo.add(vote);
        return { message: 'Vote counted' };
    }
}
