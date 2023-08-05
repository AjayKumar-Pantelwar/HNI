'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
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
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
// types
//
import { adminApi } from 'src/redux/api/admin.api';
import { Admin, AdminRequest } from 'src/types/admin.types';
import { Box } from '@mui/material';
import AdminFilters from '../admin-filters';
import AdminSearch from '../admin-search';
import AdminTableRow from '../admin-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'mobile_number', label: 'Phone Number', width: 180 },
  { id: 'username', label: 'Username', width: 220 },
  { id: 'type', label: 'Type', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'security', label: 'Security', width: 200 },
  { id: '', label: 'Actions', width: 80 },
];

const defaultFilters: AdminRequest = {
  name: '',
  email: '',
  is_blocked: 'all',
  mobile_number: '',
  rid: '',
  username: '',
};

// ----------------------------------------------------------------------

export default function AdminListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const router = useRouter();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const [search, setSearch] = useState<{ query: string; results: Admin[] }>({
    query: '',
    results: [],
  });

  const { data } = adminApi.useAdminQuery(filters);

  const dataFiltered = applyFilter({
    inputData: data?.data?.admins || [],
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback((name: keyof AdminRequest, value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.admin.edit(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // const handleSearch = useCallback(
  //   (inputValue: string) => {
  //     setSearch((prevState) => ({
  //       ...prevState,
  //       query: inputValue,
  //     }));

  //     if (inputValue) {
  //       const results = data?.data?.admins?.filter(
  //         (admin) => admin.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
  //       );

  //       if (results) {
  //         setSearch((prevState) => ({
  //           ...prevState,
  //           results,
  //         }));
  //       }
  //     }
  //   },
  //   [search.query, data?.data?.admins]
  // );
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.root },
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 5 }}>
          {/* <AdminSearch
            query={search.query}
            results={search.results}
            onSearch={handleSearch}
            hrefItem={(id: string) => paths.dashboard.admin.profile(id)}
          /> */}
          <AdminFilters
            open={openFilters.value}
            onOpen={openFilters.onTrue}
            onClose={openFilters.onFalse}
            //
            filters={filters}
            defaultFilters={defaultFilters}
            onFilters={handleFilters}
            //
            canReset={canReset}
            onResetFilters={handleResetFilters}
          />
        </Box>
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
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(checked, data?.data?.admins?.map((row) => row.aid) || [])
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <AdminTableRow
                        key={row.aid}
                        row={row}
                        selected={table.selected.includes(row.aid)}
                        onSelectRow={() => table.onSelectRow(row.aid)}
                        onEditRow={() => handleEditRow(row.aid)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      data?.data?.admins?.length || 0
                    )}
                  />

                  <TableNoData notFound={notFound} />
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
