'use client';

import { useJobApplications } from '@/api/jobApplications/hooks';
import usePageNumber from '@/hooks/usePageNumber';
import { Center, Title } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { useEffect } from 'react';

export default function ApplicationsDataChecker({ children }: React.PropsWithChildren) {
    const { page, setPage } = usePageNumber();
    const { data, isError } = useJobApplications(page);
    const prevPageValue = usePrevious(page);

    useEffect(() => {
        const noMoreRecords = prevPageValue === page && data?.applications.length === 0 && data.amount > 0;

        if (noMoreRecords) {
            const prevPage = page - 1;

            setPage(prevPage > 0 ? prevPage : 1);
        }
    }, [data?.amount, data?.applications.length, page, prevPageValue, setPage]);

    if (isError) {
        throw new Error('Не удалось загрузить данные');
    }

    if (data?.applications.length === 0) {
        return (
            <Center flex={1}>
                <Title order={3}>Нет данных</Title>
            </Center>
        );
    }

    return <>{children}</>;
}
