import { cache } from 'react';
import { api } from '.';
import { ApiResponse } from '../types';
import { CreatedJobApplicationType, JobApplicationType } from '@shared/jobApplications/types';
import { request } from '../requestWrapper';

export const getJobApplications = cache(
    request(async (page: number, pageSize: number) => {
        return await api
            .get<ApiResponse<{ applications: CreatedJobApplicationType[]; amount: number }>>('/', { params: { page, pageSize } })
            .then((r) => r.data);
    }),
);

export const createRecord = request(async (record: JobApplicationType) => {
    return await api.post<ApiResponse<CreatedJobApplicationType>>('/', record).then((r) => r.data);
});

export const updateRecord = request(async (id: string, record: JobApplicationType) => {
    return await api.patch<ApiResponse<CreatedJobApplicationType>>(`/${id}`, record).then((r) => r.data);
});

export const removeRecord = request(async (id: string) => {
    await api.delete(`/${id}`);
});
