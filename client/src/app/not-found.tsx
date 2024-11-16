import { Anchor, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Stack align="center" justify="center" h="100%" w="100%">
            <Title order={3}>Страница не найдена</Title>
            <Anchor component={Link} href="/">
                Вернуться на главную
            </Anchor>
        </Stack>
    );
}
