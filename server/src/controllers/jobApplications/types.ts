import { z } from 'zod';
import { idSchema, paginationSchema } from './schemas';

export type IdParam = z.infer<typeof idSchema>;

export type Pagination = z.infer<typeof paginationSchema>;
