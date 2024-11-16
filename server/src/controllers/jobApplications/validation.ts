import { jobApplicationSchema } from '@shared/jobApplications/schema';
import { idSchema, paginationSchema } from './schemas';

export const createRecordReq = {
    body: jobApplicationSchema,
};

export const updateRecordReq = {
    body: jobApplicationSchema,
    params: idSchema,
};

export const deleteRecordReq = {
    params: idSchema,
};

export const getRecordsReq = {
    query: paginationSchema,
};
