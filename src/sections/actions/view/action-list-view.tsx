'use client';

import { Box } from '@mui/material';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import isEqual from 'lodash/isEqual';
import { useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FilterResult from 'src/components/filter-result';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { adminApi } from 'src/redux/api/admin.api';
import { useSelector } from 'src/redux/store';
import { paths } from 'src/routes/paths';
import { Action, AdminActionRequest } from 'src/types/admin.types';
import { getRawFilters } from 'src/utils/raw-filters';
import ActionsFilters from '../action-list-filters';
import { ActionTableRow } from '../action-table-row';

const TABLE_HEAD = [
  // { id: 'username', label: 'Username', width: 500 },
  { id: 'event_type', label: 'Event Type', width: 500 },
  { id: 'created_at', label: 'Created at', width: 500 },

  { id: 'actions', label: 'Actions', width: 50 },
];
const defaultFilters: AdminActionRequest = {
  action_id: '',
  event_type: '',
  page_no: 1,
  no_of_records: 10,
  source_id: '',
  aid: '',
};

export const ActionListView: React.FC = () => {
  const table = useTable();

  const settings = useSettingsContext();

  const aid = useSelector((state) => state.auth.user?.aid);

  const confirm = useBoolean();

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const { data } = adminApi.useAdminActionsQuery(filters);

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(getRawFilters(defaultFilters), getRawFilters(filters));

  const notFound =
    (!data?.data?.actions?.length && canReset) ||
    !data?.data?.actions?.length ||
    data?.data?.actions === null;

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const dataFiltered = applyFilter({
    inputData: data?.data?.actions || [],
    comparator: getComparator(table.order, table.orderBy),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Actions"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Actions', href: paths.dashboard.admin.actions.list },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box
        sx={{
          py: 1,
          display: { xs: 'unset', sm: 'flex' },
          width: '100%',
          alignItems: 'center',
        }}
      >
        <FilterResult
          filters={filters}
          setFilters={setFilters}
          canReset={canReset}
          onResetFilters={handleResetFilters}
          results={+(data?.data?.count || 0)}
        />
        <ActionsFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          filters={filters}
          setFilters={setFilters}
          canReset={canReset}
          defaultFilters={defaultFilters}
        />
      </Box>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data?.data?.actions?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(checked, data?.data.actions?.map((row) => row.aid) || [])
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 0 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data?.data?.actions?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {data?.data?.actions !== null &&
                  data?.data?.actions?.map((action) => (
                    <ActionTableRow key={action.action_id} action={action} />
                  ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    data?.data?.actions?.length || 0
                  )}
                />
                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={+(data?.data?.count || 0)}
          page={+(filters.page_no || 1) - 1}
          rowsPerPage={+(filters.no_of_records || 10)}
          onPageChange={(_, page) => setFilters({ ...filters, page_no: page + 1 })}
          onRowsPerPageChange={(e) => setFilters({ ...filters, no_of_records: +e.target.value })}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
};

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: Action[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
