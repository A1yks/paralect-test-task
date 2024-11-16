import { z } from 'zod';

export const applicationStatuses = ['pending', 'interview_scheduled', 'awaiting_interview', 'offer', 'rejected', 'decision_pending'] as const;

const baseJobApplicationSchema = z.object({
    company: z.string().min(1),
    position: z.string().min(1),
    salaryFrom: z.coerce.number().int().min(1),
    salaryTo: z.coerce.number().int().min(1),
    status: z.enum(applicationStatuses),
    note: z.string().trim().max(500).optional(),
});

export const jobApplicationSchema = baseJobApplicationSchema.refine((data) => data.salaryTo > data.salaryFrom, {
    message: 'Максимальная зарплата должна быть больше минимальной',
    path: ['salaryTo'],
});

export const createdJobApplicationSchema = baseJobApplicationSchema.extend({
    _id: z.string({ message: 'Идентификатор должен быть строкой' }),
    createdAt: z.coerce.date({ message: 'Дата создания является невалидной' }),
    updatedAt: z.coerce.date({ message: 'Дата обновления является невалидной' }),
});
