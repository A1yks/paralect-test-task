'use client';

import { useJobApplications } from '@/api/jobApplications/hooks';
import usePageNumber from '@/hooks/usePageNumber';
import { Pagination } from '@mantine/core';
import { memo } from 'react';

function TablePagination() {
    const { page, setPage } = usePageNumber();
    const { data, isError } = useJobApplications(page);

    const hasError = isError || !data;

    if (hasError) return null;

    const totalPages = Math.ceil(data.amount / 10);

    if (totalPages < 2) return null;

    return <Pagination total={totalPages} value={page} onChange={setPage} />;
}

export default memo(TablePagination);
