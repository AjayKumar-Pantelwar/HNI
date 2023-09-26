'use client';

import { Box } from '@mui/material';

import Label from 'src/components/label';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useState } from 'react';
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
  useTable,
} from 'src/components/table';
import { useRoleAdmin } from 'src/hooks/admin/use-role-admin';
import { useBoolean } from 'src/hooks/use-boolean';
import { dealApi } from 'src/redux/api/deal.api';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Deal, GetDealRequest } from 'src/types/deals.types';
import DealTableRow from '../deal-table-row';

const TABLE_HEAD = [
  { id: 'deal', label: 'Deal', width: 80 },
  { id: 'stage', label: 'Stage', width: 80 },
  { id: 'published', label: 'Published', width: 80 },
  { id: 'dm_id', label: 'Deal Manager', width: 80 },
  { id: 'dates', label: 'Dates', width: 160 },
  { id: 'created_at', label: 'Created At', width: 140 },
  { id: '', label: 'Actions', width: 80 },
];
const status = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Draft' },
];

const defaultFilters: GetDealRequest = {
  name: '',
  deal_id: '',
};

export function DealListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [dealData, setDealData] = React.useState<Deal[]>([]);

  const { data } = dealApi.useDealQuery(defaultFilters);

  const { data: adminData } = useRoleAdmin('deal_manager');

  const [filters] = useState(defaultFilters);
  const [selectedFilter, setSelectedFilter] = useState('all');

  console.log(data?.data?.deals);

  // const handleFilters = useCallback(
  //   (name: string, value: GetDealRequest) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   },
  //   [table]
  // );

  React.useEffect(() => {
    if (data) setDealData(data?.data?.deals);
  }, [data]);

  const handleFilters = (event: React.SyntheticEvent, newValue: string) => {
    if (data) {
      setSelectedFilter(newValue);
      let filteredData = data?.data?.deals;
      if (newValue === 'published') {
        filteredData = filteredData.filter((d) => d.is_active === true);
      } else if (newValue === 'unpublished') {
        filteredData = filteredData.filter((d) => !d.is_active);
      }
      setDealData(filteredData);
    }
  };

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dealData.length && canReset) || !dealData.length;

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.admin.edit(id));
    },
    [router]
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Deals', href: paths.dashboard.deals.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.deals.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Deal
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
          />
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
          /> */}
        </Box>
        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Tabs
              value={selectedFilter}
              onChange={handleFilters}
              sx={{
                pl: 2.5,
              }}
            >
              {status.map((item) => (
                // Calculate the count for each tab
                <Tab
                  key={item.value}
                  iconPosition="end"
                  sx={{
                    pl: 1,
                  }}
                  icon={
                    <Label
                      variant={
                        ((item.value === 'all' || item.value === selectedFilter) && 'filled') ||
                        'soft'
                      }
                      color={
                        (item.value === 'published' && 'success') ||
                        (item.value === 'unpublished' && 'error') ||
                        (item.value === 'all' && 'default') ||
                        'default'
                      }
                    >
                      {item.value === 'published' &&
                        data?.data?.deals?.filter((d) => d.is_active === true).length}
                      {item.value === 'unpublished' &&
                        data?.data?.deals?.filter((d) => !d.is_active).length}
                      {item.value === 'all' && data?.data?.deals?.length}
                    </Label>
                  }
                  value={item.value}
                  label={item.label}
                />
              ))}
            </Tabs>

            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={data?.data?.deals?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(checked, data?.data?.deals?.map((row) => row.deal_id) || [])
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
                  rowCount={data?.data?.deals?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     data?.data?.deals?.map((row) => row.deal_id) || []
                  //   )
                  // }
                />

                <TableBody>
                  {dealData
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <DealTableRow
                        key={row.deal_id}
                        row={row}
                        dealManagers={adminData?.data?.admins}
                        onEditRow={() => handleEditRow(row.deal_id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      data?.data?.deals?.length || 0
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dealData.length}
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
