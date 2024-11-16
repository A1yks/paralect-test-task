'use client';

import { useJobApplications } from '@/api/jobApplications/hooks';
import usePageNumber from '@/hooks/usePageNumber';
import ApplicationsTableRow from './ApplicationsTableRow';

export default function ApplicationsList() {
    const { page } = usePageNumber();
    const { data, isError, error } = useJobApplications(page);

    if (isError) {
        throw error;
    }

    return data?.applications.map((element) => <ApplicationsTableRow key={element._id} record={element} />);
}
