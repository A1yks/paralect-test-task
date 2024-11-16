'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import ConfirmationModal from './ConfirmationModal';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeRecord } from '@/api/jobApplications/requests';
import usePageNumber from '@/hooks/usePageNumber';
import { notifications } from '@mantine/notifications';

export type DeleteRecordButtonProps = {
    recordId: string;
};

export default function DeleteRecordButton({ recordId }: DeleteRecordButtonProps) {
    const [opened, handlers] = useDisclosure();
    const queryClient = useQueryClient();
    const { page } = usePageNumber();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => removeRecord(recordId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['job-applications', { page }] });
            notifications.show({ message: 'Запись успешно удалена', color: 'green' });
        },
    });

    return (
        <>
            <Tooltip label="Удалить">
                <ActionIcon variant="subtle" color="red" onClick={handlers.open}>
                    <IconTrash />
                </ActionIcon>
            </Tooltip>
            <ConfirmationModal opened={opened} title="Подтвердите действие" onConfirm={mutateAsync} onClose={handlers.close} isLoading={isPending}>
                Вы уверены, что хотите удалить информацию о данной вакансии?
            </ConfirmationModal>
        </>
    );
}
