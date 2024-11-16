import { z } from 'zod';

export const searchParamsSchema = z.object({ page: z.coerce.number().int().positive().min(1).default(1) });
