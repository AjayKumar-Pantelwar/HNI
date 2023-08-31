'use client';

import Button from '@mui/material/Button';
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
import { companyApi } from 'src/redux/api/company.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Company, CompanyRequest } from 'src/types/company.types';
import CompanyTableRow from '../company-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 180 },
  { id: 'branch_name', label: 'Branch Name', width: 120 },
  { id: 'form', label: 'Form', width: 120 },
  { id: 'location.city', label: 'Location', width: 180 },
  { id: '', label: 'Actions', width: 80 },
];

const defaultFilters: CompanyRequest = {
  company_id: '',
  legal_name: '',
};

export default function CompanyListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [filters] = useState(defaultFilters);

  const { data, isLoading } = companyApi.useCompanyQuery(filters);

  const dataFiltered = applyFilter({
    inputData: data?.data?.company || [],
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Companies"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Companies', href: paths.dashboard.company.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.company.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Company
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={data?.data?.company?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  data?.data?.company?.map((row) => row.company_id) || []
                )
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
                  rowCount={data?.data?.company?.length}
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
                      <CompanyTableRow key={row.company_id} row={row as Company} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      data?.data?.company?.length || 0
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
  inputData: Company[];
  comparator: (a: any, b: any) => number;
  filters: CompanyRequest;
}) {
  const { legal_name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (legal_name) {
    inputData = inputData.filter(
      (user) => user.legal_name.toLowerCase().indexOf(legal_name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
