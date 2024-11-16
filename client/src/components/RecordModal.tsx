'use client';

import { applicationStatusLabels } from '@/constants/jobApplications';
import { Button, Fieldset, Group, Modal, NumberInput, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { jobApplicationSchema } from '@shared/jobApplications/schema';
import { CreatedJobApplicationType, JobApplicationType } from '@shared/jobApplications/types';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { searchParamsSchema } from '@/app/(main)/validation';

export type NewEntryModalProps = {
    opened: boolean;
    record?: JobApplicationType;
    onClose: () => void;
    action: (data: JobApplicationType) => Promise<CreatedJobApplicationType>;
};

const statuses = Object.entries(applicationStatusLabels).map(([value, label]) => ({ value, label }));

export default function RecordModal({ opened, record, onClose, action }: NewEntryModalProps) {
    const isNewRecordModal = record === undefined;
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: action,
        onSuccess() {
            const page = new URLSearchParams(window.location.search).get('page') || '1';
            const { success, data } = searchParamsSchema.safeParse({ page });

            if (success) {
                queryClient.invalidateQueries({ queryKey: ['job-applications', { page: data.page }] });
            }

            showNotification();
        },
    });

    function showNotification(errorText?: string) {
        if (errorText) {
            notifications.show({ title: 'Не удалось сохранить запись', message: errorText, color: 'red' });
        } else if (isNewRecordModal) {
            notifications.show({ message: 'Новая запись успешно добавлена', color: 'green' });
        } else {
            notifications.show({ message: 'Запись успешно обновлена', color: 'green' });
        }
    }

    const form = useForm<JobApplicationType>({
        mode: 'uncontrolled',
        initialValues: record,
        validate: zodResolver(jobApplicationSchema),
    });

    useEffect(() => {
        if (record !== undefined) {
            form.setInitialValues(record);
        }
    }, [form, record]);

    async function formAction(data: JobApplicationType) {
        try {
            await mutateAsync(data);

            if (isNewRecordModal) {
                form.reset();
            }

            onClose();
        } catch (err) {
            if (err instanceof Error) {
                showNotification(err.message);
            } else {
                showNotification('Произошла непредвиденная ошибка');
            }
        }
    }

    function cancelHandler() {
        setTimeout(() => {
            form.reset();
            form.clearErrors();
        }, 300);

        onClose();
    }

    return (
        <Modal opened={opened} onClose={cancelHandler} title="Новая запись">
            <form onSubmit={form.onSubmit(formAction)}>
                <Stack gap={12}>
                    <TextInput label="Компания" placeholder="Paralect" name="company" {...form.getInputProps('company')} data-autofocus />
                    <TextInput label="Вакансия" placeholder="Junior Full Stack Developer" name="position" {...form.getInputProps('position')} />
                    <Select label="Статус отклика" placeholder={statuses[0].label} data={statuses} name="status" {...form.getInputProps('status')} />
                    <Fieldset legend="Зарплатная вилка">
                        <Stack gap={8}>
                            <NumberInput label="От" min={0} placeholder="$500" name="salaryFrom" {...form.getInputProps('salaryFrom')} flex={1} />
                            <NumberInput label="До" min={0} placeholder="$1000" name="salaryTo" {...form.getInputProps('salaryTo')} flex={1} />
                        </Stack>
                    </Fieldset>
                    <Textarea
                        label="Заметка"
                        placeholder="Текст..."
                        maxLength={500}
                        minLength={1}
                        rows={4}
                        name="note"
                        {...form.getInputProps('note')}
                    />
                    <Group justify="flex-end">
                        <Button type="button" color="red" onClick={cancelHandler}>
                            Отмена
                        </Button>
                        <Button type="submit" loading={isPending}>
                            Сохранить
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
