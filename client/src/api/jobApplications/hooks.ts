import { pageSize } from '@/constants/jobApplications';
import { useQuery } from '@tanstack/react-query';
import { getJobApplications } from './requests';

export function useJobApplications(page: number) {
    return useQuery({
        queryKey: ['job-applications', { page }],
        queryFn: () => getJobApplications(page, pageSize),
    });
}
