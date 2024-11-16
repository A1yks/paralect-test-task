import { searchParamsSchema } from '@/app/(main)/validation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function usePageNumber() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: validatedSearchParams } = searchParamsSchema.safeParse(Object.fromEntries(searchParams));
    const page = validatedSearchParams?.page || 1;

    const setPage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set('page', page.toString());

            router.push(pathname + '?' + params.toString());
        },
        [pathname, router, searchParams],
    );

    return { page, setPage };
}
