import { pageSize } from '@/constants/jobApplications';
import { getJobApplications } from './requests';
import getQueryClient from '../getQueryClient';

export const prefetchJobApplications = async (page: number) => {
    return await getQueryClient().fetchQuery({
        queryKey: ['job-applications', { page }],
        queryFn: () => getJobApplications(page, pageSize),
    });
};
