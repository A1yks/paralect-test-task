import { applicationStatusLabels } from '@/constants/jobApplications';
import { TableTr, TableTd, Group } from '@mantine/core';
import DeleteRecordButton from './DeleteRecordButton';
import EditRecordButton from './EditRecordButton';
import { CreatedJobApplicationType } from '@shared/jobApplications/types';
import { memo } from 'react';

export type ApplicationsTableRowProps = {
    record: CreatedJobApplicationType;
};

function ApplicationsTableRow({ record }: ApplicationsTableRowProps) {
    return (
        <TableTr>
            <TableTd>{record.company}</TableTd>
            <TableTd>{record.position}</TableTd>
            <TableTd>{`$${record.salaryFrom} - $${record.salaryTo}`}</TableTd>
            <TableTd>{applicationStatusLabels[record.status]}</TableTd>
            <TableTd>{record.note}</TableTd>
            <TableTd>
                <Group wrap="nowrap" gap={8} justify="center">
                    <EditRecordButton record={record} />
                    <DeleteRecordButton recordId={record._id} />
                </Group>
            </TableTd>
        </TableTr>
    );
}

export default memo(ApplicationsTableRow);
