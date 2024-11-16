'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
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
            <Tooltip label="Редактировать">
                <ActionIcon variant="subtle" onClick={handlers.open}>
                    <IconEdit />
                </ActionIcon>
            </Tooltip>
            <RecordModal opened={opened} record={record} onClose={handlers.close} action={(newData) => updateRecord(record._id, newData)} />
        </>
    );
}
