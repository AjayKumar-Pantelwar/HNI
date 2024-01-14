'use client';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
// import { usePerm } from 'src/hooks/use-perm';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { adminApi } from 'src/redux/api/admin.api';
import { Admin, AdminRequest } from 'src/types/admin.types';
import AdminFilters from '../admin-filters';
import AdminTableRow from '../admin-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username', width: 220 },
  { id: 'role', label: 'Role', width: 220 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'password', label: 'Password', width: 80 },
  { id: 'totp', label: 'TOTP', width: 80 },
  { id: '', label: 'Actions', width: 80 },
];

const defaultFilters: AdminRequest = {
  name: '',
  email: '',
  is_blocked: '',
  aid: '',
  username: '',
};

export default function AdminListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const openFilters = useBoolean();

  // const { adminManagementPerm } = usePerm();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const { data, isLoading } = adminApi.useAdminQuery(filters);

  const dataFiltered = applyFilter({
    inputData: (data?.data?.admins !== null && data?.data?.admins) || [],
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound =
    (!dataFiltered.length && canReset) || !dataFiltered.length || data?.data?.admins === null;

  const handleFilters = useCallback((appliedFilters: AdminRequest) => {
    setFilters(appliedFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Admin Users"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.admin.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Admin
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        {false && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 5 }}>
            <AdminFilters
              open={openFilters.value}
              onOpen={openFilters.onTrue}
              onClose={openFilters.onFalse}
              filters={filters}
              defaultFilters={defaultFilters}
              onFilters={handleFilters}
              canReset={canReset}
              onResetFilters={handleResetFilters}
            />
          </Box>
        )}
        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={data?.data?.admins?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(checked, data?.data?.admins?.map((row) => row.aid) || [])
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
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data?.data?.admins?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <AdminTableRow key={row.aid} row={row as Admin} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      data?.data?.admins?.length || 0
                    )}
                  />
                  {isLoading ? (
                    <>
                      <TableSkeleton />
                      <TableSkeleton />
                      <TableSkeleton />
                      <TableSkeleton />
                    </>
                  ) : (
                    <TableNoData notFound={notFound} />
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: Admin[];
  comparator: (a: any, b: any) => number;
  filters: AdminRequest;
}) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
