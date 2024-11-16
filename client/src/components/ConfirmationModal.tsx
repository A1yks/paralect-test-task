'use client';

import { Button, Group, Modal } from '@mantine/core';

export type ConfirmationModalProps = {
    opened: boolean;
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

export default function ConfirmationModal({ opened, title, children, isLoading, onConfirm, onClose }: ConfirmationModalProps) {
    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <Modal opened={opened} onClose={onClose} title={title}>
            <form onSubmit={submitHandler}>
                <div>{children}</div>
                <Group justify="flex-end">
                    <Button type="button" color="red" onClick={onClose}>
                        Отменить
                    </Button>
                    <Button loading={isLoading} type="submit">
                        Подтвердить
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
