import { z } from 'zod';
import { createdJobApplicationSchema, jobApplicationSchema } from './schema';

export type JobApplicationType = z.infer<typeof jobApplicationSchema>;

export type CreatedJobApplicationType = z.infer<typeof createdJobApplicationSchema>;
