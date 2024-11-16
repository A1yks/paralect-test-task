import { applicationStatuses } from '@shared/jobApplications/schema';

export const pageSize = 10;

export const applicationStatusLabels: Record<(typeof applicationStatuses)[number], string> = {
    pending: 'Ожидает ответа',
    interview_scheduled: 'Интервью назначено',
    awaiting_interview: 'Ожидает интервью',
    offer: 'Предложение о работе',
    rejected: 'Отказ',
    decision_pending: 'Ожидает решения',
};
