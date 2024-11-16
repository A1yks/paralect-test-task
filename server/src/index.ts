import 'express-async-errors';
import env from '@/env';
import mongoose from 'mongoose';
import express, { NextFunction } from 'express';
import cors from 'cors';
import APIError from '@/errors/APIError';
import jobApplicationsRouter from '@/routes/jobApplications';
import '@shared/config/zod';

async function main() {
    await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME });
    console.log('Connected to database');

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/job-applications', jobApplicationsRouter);

    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });

    app.use((err: unknown, req: Server.Request, res: Server.Response, _next: NextFunction) => {
        console.error(err);

        if (err instanceof APIError) {
            return res.status(err.status).json({ error: err.message });
        }

        res.status(500).json({ error: 'Произошла непредвиденная ошибка' });
    });
}

main();
