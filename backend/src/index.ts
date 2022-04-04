/// <reference types="./types" />
import * as Sentry from '@sentry/node';
import { createConnection } from 'typeorm';
import connectionOptions from './infrastructure/database/config';
import version from './version';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENVIRONMENT_NAME,
    release: version ? `orida-backend@${version}` : undefined,
});

(async () => {
    await createConnection(connectionOptions);

    const { default: app } = await import('./infrastructure/app');

    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
    });
})().catch((error) => {
    console.error(error);

    process.exitCode = 1;
});
