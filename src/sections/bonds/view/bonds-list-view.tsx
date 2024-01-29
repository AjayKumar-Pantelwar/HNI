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
import BondsTableRow from '../bonds-table-row';

const TABLE_HEAD = [
  { id: 'bond_name', label: 'Bond Name' },
  { id: 'min_investment', label: 'Min Investment' },
  { id: 'yield', label: 'Yield' },
  // { id: 'description', label: 'Description' },
  { id: 'maturity_date', label: 'Maturity Date' },
  { id: 'edit', label: 'Actions', width: 80 },
];

export default function BondsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  // const { adminManagementPerm } = usePerm();

  const confirm = useBoolean();

  // const { data } = bondsApi.useBondsQuery();

  const data = {
    data: {
      bonds: [
        {
          bond: {
            bond_name: 'Axis Finance Limited',
            min_investment: 2500000,
            yield: 8.5,
            security: 'Secured',
            description:
              'The investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
            rating: 'AAA',
            bond_id: 'INE891K07689',
            maturity_date: '2024-09-09T00:00:00Z',
            issue_date: '2021-09-09T00:00:00Z',
            next_interest_date: '0001-01-01T00:00:00Z',
            coupon_payout: 'Not Available',
            amc_id: 'fe316c49-add1-4abf-8dd7-f177b2b92fac',
            face_value: 1000000,
            type: 'Zero Coupon Bonds',
            is_certified: true,
            is_activated: true,
            offer_close_date: '2023-12-31T00:00:00Z',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-22T06:37:20.314141Z',
          },
          amc: {
            amc_id: 'fe316c49-add1-4abf-8dd7-f177b2b92fac',
            amc_name: 'AXIS FINANCE LIMITED',
            amc_description: '',
            amc_logo: '',
            amc_type: '',
            amc_home_page: '',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-12T09:16:47.580748Z',
          },
        },
        {
          bond: {
            bond_name: 'State Bank of India',
            min_investment: 2500000,
            yield: 8.100000381469727,
            security: 'Secured',
            description:
              'The investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
            rating: 'AA+',
            bond_id: 'INE062A08223',
            maturity_date: '2024-11-22T00:00:00Z',
            issue_date: '2019-11-22T00:00:00Z',
            next_interest_date: '0001-01-01T00:00:00Z',
            coupon_payout: 'ANNUAL',
            amc_id: '7b569c13-ad2c-464e-9081-4e8f99f8633e',
            face_value: 1000000,
            type: 'Perpetual Bonds',
            is_certified: true,
            is_activated: true,
            offer_close_date: '2023-12-31T00:00:00Z',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-22T06:37:20.314141Z',
          },
          amc: {
            amc_id: '7b569c13-ad2c-464e-9081-4e8f99f8633e',
            amc_name: 'STATE BANK OF INDIA',
            amc_description: 'ea',
            amc_logo: 'dolor',
            amc_type: 'qui ullamco Ut ut',
            amc_home_page: 'id veniam ex',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-12T09:40:37.163132Z',
          },
        },
        {
          bond: {
            bond_name: 'Tata Capital Housing Finance Limited',
            min_investment: 2500000,
            yield: 8.100000381469727,
            security: 'Secured',
            description:
              'The investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
            rating: 'AAA',
            bond_id: 'INE033L07HG9',
            maturity_date: '2024-09-23T00:00:00Z',
            issue_date: '2021-06-23T00:00:00Z',
            next_interest_date: '0001-01-01T00:00:00Z',
            coupon_payout: 'Not Available',
            amc_id: '64eb2115-9a18-4efc-a8aa-7b35a678079f',
            face_value: 1000000,
            type: 'Zero Coupon Bonds',
            is_certified: true,
            is_activated: true,
            offer_close_date: '2023-12-31T00:00:00Z',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-22T06:37:20.314141Z',
          },
          amc: {
            amc_id: '64eb2115-9a18-4efc-a8aa-7b35a678079f',
            amc_name: 'TATA CAPITAL HOUSING FINANCE LIMITED',
            amc_description: '',
            amc_logo: '',
            amc_type: '',
            amc_home_page: '',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-12T09:16:47.580748Z',
          },
        },
        {
          bond: {
            bond_name: 'Bank Of Baroda',
            min_investment: 2500000,
            yield: 8.699999809265137,
            security: 'Secured',
            description:
              'The investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
            rating: 'AA+',
            bond_id: 'INE028A08174',
            maturity_date: '2024-11-28T00:00:00Z',
            issue_date: '2019-11-28T00:00:00Z',
            next_interest_date: '0001-01-01T00:00:00Z',
            coupon_payout: 'ANNUAL',
            amc_id: '07f769f0-549d-4b49-afc0-3305363ecf70',
            face_value: 1000000,
            type: 'Perpetual Bonds',
            is_certified: true,
            is_activated: true,
            offer_close_date: '2023-12-31T00:00:00Z',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-22T06:37:20.314141Z',
          },
          amc: {
            amc_id: '07f769f0-549d-4b49-afc0-3305363ecf70',
            amc_name: 'BANK OF BARODA',
            amc_description: '',
            amc_logo: '',
            amc_type: '',
            amc_home_page: '',
            created_at: '2024-01-12T09:16:47.580748Z',
            updated_at: '2024-01-12T09:16:47.580748Z',
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
            { name: 'Bonds', href: paths.dashboard.bonds.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.mlds.new}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              New Bond
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
              rowCount={data?.data?.bonds?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  data?.data?.bonds?.map((row) => row?.bond?.bond_id) || []
                )
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
                  rowCount={data?.data?.bonds?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(checked, data?.data?.bonds?.roles?.map((row) => row.rid) || [])
                  // }
                />

                <TableBody>
                  {[...(data?.data?.bonds || [])]
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <BondsTableRow
                        key={row.bond.bond_id}
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
                      data?.data?.bonds?.length || 0
                    )}
                  />

                  <TableNoData notFound={!data?.data?.bonds?.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={data?.data?.bonds?.length || 0}
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
