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
import { roleApi } from 'src/redux/api/role.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import RolesTableRow from '../roles-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'edit', label: 'Actions', width: 80 },
];

export default function RolesListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // const { adminManagementPerm } = usePerm();

  const confirm = useBoolean();

  const { data } = roleApi.useRolesQuery();

  // const data = {
  //   data: [
  //     {
  //       id: 1,
  //       rname: 'super-admin-role',
  //       rid: '82b18161-7d53-4307-a932-094978fbfadd',
  //       created_at: '2023-12-18T14:48:51.736781Z',
  //       updated_at: '2023-12-18T14:48:51.736781Z',
  //     },
  //     {
  //       id: 2,
  //       rname: 'my-fav-role',
  //       rid: 'da182cea-a711-4311-b5af-fef8a2b99b09',
  //       created_at: '2023-12-19T14:04:19.14657Z',
  //       updated_at: '2023-12-19T14:04:19.14657Z',
  //     },
  //   ],
  // };

  const denseHeight = table.dense ? 52 : 72;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Roles', href: paths.dashboard.roles.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.roles.new}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              New Role
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
              rowCount={data?.data?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(checked, data?.data?.map((row) => row.rid) || [])
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
                  rowCount={data?.data?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(checked, data?.data?.roles?.map((row) => row.rid) || [])
                  // }
                />

                <TableBody>
                  {[...(data?.data || [])]
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <RolesTableRow
                        key={row.rid}
                        row={row}
                        // selected={table.selected.includes(row.rid)}
                        // onSelectRow={() => table.onSelectRow(row.rid)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, data?.data?.length || 0)}
                  />

                  <TableNoData notFound={!data?.data?.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={data?.data?.length || 0}
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
