import { Request } from 'express';

export const getClientIp = (req: Request): string => {
    return req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || '';
};
