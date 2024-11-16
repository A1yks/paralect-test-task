import { z } from 'zod';
import getQueryClient from '@/api/getQueryClient';
import { prefetchJobApplications } from '@/api/jobApplications/prefetch';
import ApplicationsTable from '@/components/ApplicationsTable';
import TablePagination from '@/components/TablePagination';
import { Stack } from '@mantine/core';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect, RedirectType } from 'next/navigation';
import { searchParamsSchema } from './validation';
import ApplicationsDataChecker from '@/components/ApplicationsDataChecker';

type SearchParams = Promise<z.infer<typeof searchParamsSchema>>;

export default async function Home(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const { success, data: validatedSearchParams } = await searchParamsSchema.safeParseAsync(searchParams);

    if (!success) {
        redirect('/', RedirectType.replace);
    }

    const data = await prefetchJobApplications(validatedSearchParams.page);

    if (data.applications.length === 0 && data.amount > 0) {
        redirect('/', RedirectType.replace);
    }

    return (
        <HydrationBoundary state={dehydrate(getQueryClient())}>
            <ApplicationsDataChecker>
                <Stack align="center" pt={0} pb={16}>
                    <ApplicationsTable />
                    <TablePagination />
                </Stack>
            </ApplicationsDataChecker>
        </HydrationBoundary>
    );
}
