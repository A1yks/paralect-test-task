import { Box, Paper, Table, TableTbody, TableTh, TableThead, TableTr } from '@mantine/core';
import ApplicationsList from './ApplicationsList';

export default function ApplicationsTable() {
    return (
        <Box className="applications-table-wrapper">
            <Paper withBorder radius={12} flex={1}>
                <Table striped highlightOnHover withColumnBorders className="applications-table">
                    <TableThead>
                        <TableTr>
                            <TableTh>Компания</TableTh>
                            <TableTh>Вакансия</TableTh>
                            <TableTh>Зарплатная вилка</TableTh>
                            <TableTh>Статус отклика</TableTh>
                            <TableTh>Заметка</TableTh>
                            <TableTh>Действия</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        <ApplicationsList />
                    </TableTbody>
                </Table>
            </Paper>
        </Box>
    );
}
