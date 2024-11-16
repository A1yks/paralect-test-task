import { z } from 'zod';

export const idSchema = z.object({
    id: z.string(),
});

export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().optional(),
});
