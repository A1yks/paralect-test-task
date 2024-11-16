'use client';

import { ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import RecordModal from './RecordModal';
import { CreatedJobApplicationType } from '@shared/jobApplications/types';
import { useDisclosure } from '@mantine/hooks';
import { updateRecord } from '@/api/jobApplications/requests';

export type EditRecordButtonProps = {
    record: CreatedJobApplicationType;
};

export default function EditRecordButton({ record }: EditRecordButtonProps) {
    const [opened, handlers] = useDisclosure();

    return (
        <>
            <ActionIcon variant="subtle" onClick={handlers.open}>
                <IconEdit />
            </ActionIcon>
            <RecordModal opened={opened} record={record} onClose={handlers.close} action={(newData) => updateRecord(record._id, newData)} />
        </>
    );
}
