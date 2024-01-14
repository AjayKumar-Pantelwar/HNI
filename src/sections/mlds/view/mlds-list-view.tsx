'use client';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
// import { usePerm } from 'src/hooks/use-perm';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { mldsApi } from 'src/redux/api/mlds.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import MLDsTableRow from '../mlds-table-row';

const TABLE_HEAD = [
  { id: 'mld_name', label: 'MLD Name' },
  { id: 'min_investment', label: 'Min Investment' },
  { id: 'yield', label: 'Yield' },
  { id: 'description', label: 'Description' },
  { id: 'maturity_date', label: 'Maturity Date' },
  { id: 'edit', label: 'Actions', width: 80 },
];

export default function MLDsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // const { adminManagementPerm } = usePerm();

  const confirm = useBoolean();

  const { data } = mldsApi.useMldsQuery();

  // const data = {
  //   data: {
  //     mlds: [
  //       {
  //         id: 'INE027E07BZ9',
  //         mld_name: 'adipisicing minim',
  //         min_investment: 937,
  //         yield: 'Market Linked',
  //         rating: 'AAA',
  //         issue_date: '2022-07-27T00:00:00Z',
  //         description: 'amet eiusmod laboris ea',
  //         underlying: '',
  //         maturity_date: '2024-08-27T00:00:00Z',
  //         sec_identifier: 'something',
  //         principal_protected: true,
  //         issuer_name: 'L&T FINANCE LIMITED',
  //         is_activated: false,
  //         is_certified: false,
  //         offer_close_date: '2023-12-31T00:00:00Z',
  //         updated_at: '2024-01-08T13:01:27.682183Z',
  //         created_at: '2024-01-08T12:58:20.089001Z',
  //       },
  //     ],
  //   },
  // };

  const denseHeight = table.dense ? 52 : 72;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'MLDs', href: paths.dashboard.mlds.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.mlds.new}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              New MLD
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
              rowCount={data?.data?.mlds?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(checked, data?.data?.mlds?.map((row) => row.id) || [])
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <AddRoundedIcon />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data?.data?.mlds?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(checked, data?.data?.mlds?.roles?.map((row) => row.rid) || [])
                  // }
                />

                <TableBody>
                  {[...(data?.data?.mlds || [])]
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <MLDsTableRow
                        key={row.id}
                        row={row}
                        // selected={table.selected.includes(row.rid)}
                        // onSelectRow={() => table.onSelectRow(row.rid)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      data?.data?.mlds?.length || 0
                    )}
                  />

                  <TableNoData notFound={!data?.data?.mlds?.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={data?.data?.mlds?.length || 0}
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
