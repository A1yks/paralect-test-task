'use client';

import { Button, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ErrorBoundaryProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorBoundaryProps) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    function tryAgain() {
        router.refresh();
        reset();
    }

    return (
        <Stack align="center" justify="center" h="100%" p={16}>
            <Title order={2} ta="center">
                Произошла ошибка:
            </Title>
            <Text ta="center" fz={24}>
                {error.message}
            </Text>
            <Button onClick={tryAgain}>Попробовать снова</Button>
        </Stack>
    );
}
