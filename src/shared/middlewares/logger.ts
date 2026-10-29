import type { RequestHandler } from 'express';

export const logger: RequestHandler = (req, res, next): void => {
    const startedAt = performance.now();

    res.on('finish', () => {
        const durationMs = performance.now() - startedAt;

        const log = {
            timestamp: new Date().toISOString(),
            type: 'http',
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Number(durationMs.toFixed(2)),
            ip: req.ip,
            userAgent: req.get('user-agent'),
        };

        const message = JSON.stringify(log);

        if (res.statusCode >= 500) {
            console.error(message);
            return;
        }

        if (res.statusCode >= 400) {
            console.warn(message);
            return;
        }

        console.info(message);
    });

    next();
};