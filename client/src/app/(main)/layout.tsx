import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';
import { Container, Stack } from '@mantine/core';
import NewRecordButton from '@/components/NewRecordButton';

export const metadata = {
    title: 'Job Applications Manager',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container h="100%" pt={16}>
            <Stack h="100%">
                <NewRecordButton />
                {children}
            </Stack>
        </Container>
    );
}
