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
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import MLDsTableRow from '../mlds-table-row';

const TABLE_HEAD = [
  { id: 'mld_name', label: 'MLD Name' },
  { id: 'min_investment', label: 'Min Investment' },
  { id: 'yield', label: 'Yield' },
  // { id: 'description', label: 'Description' },
  { id: 'maturity_date', label: 'Maturity Date' },
  { id: 'edit', label: 'Actions', width: 80 },
];

export default function MLDsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // const { adminManagementPerm } = usePerm();

  const confirm = useBoolean();

  // const { data } = mldsApi.useMldsQuery();s

  const data = {
    data: {
      mlds: [
        {
          amc: {
            created_at: '2024-01-17T09:17:28.81973Z',
            updated_at: '2024-01-17T10:55:54.23354Z',
            amc_id: '52f3afaf-8abb-49a8-99e8-a5b3a940d718',
            amc_name: 'L&T FINANCE LIMITED',
            amc_description: 'eiusmod',
            amc_logo: 'eiusmod',
            amc_type: 'minim sunt Lorem',
            amc_home_page: 'sunt',
          },
          mld: {
            maturity_date: '2024-08-27T00:00:00Z',
            issuer_date: '2022-07-27T00:00:00Z',
            updated_at: '2024-01-22T06:42:03.566852Z',
            created_at: '2024-01-17T09:17:28.81973Z',
            offer_close_date: '2023-12-31T00:00:00Z',
            underlying: '',
            mld_id: 'INE027E07BZ9',
            description:
              'This investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
            amc_id: '52f3afaf-8abb-49a8-99e8-a5b3a940d718',
            name: 'L&T Finance Limited',
            rating: 'AAA',
            yield: 'NA',
            min_investment: 2500000,
            principal_protected: true,
            is_certified: true,
            is_activated: true,
          },
        },
      ],
    },
  };

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
                table.onSelectAllRows(checked, data?.data?.mlds?.map((row) => row.mld.amc_id) || [])
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
                        key={row.mld.mld_id}
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
