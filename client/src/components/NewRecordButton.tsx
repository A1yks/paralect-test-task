'use client';

import RecordModal from '@/components/RecordModal';
import { createRecord } from '@/api/jobApplications/requests';
import { Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

export default function NewRecordButton() {
    const [opened, handlers] = useDisclosure();

    return (
        <>
            <Button radius="xl" onClick={handlers.open} className="new-record-btn">
                <Group gap={6}>
                    <IconPlus />
                    <Text>Добавить запись</Text>
                </Group>
            </Button>
            <RecordModal opened={opened} onClose={handlers.close} action={createRecord} />
        </>
    );
}
