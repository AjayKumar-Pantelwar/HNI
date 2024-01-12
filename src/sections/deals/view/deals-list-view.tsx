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
import { GetDealRequest } from 'src/types/deals.types';
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

enum Status {
  All = 'all',
  Published = 'published',
  Unpublished = 'unpublished',
}

const defaultFilters: GetDealRequest = {
  name: '',
  deal_id: '',
};

export function DealListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const { data } = dealApi.useDealQuery(defaultFilters);

  const { data: adminData } = useRoleAdmin('deal_manager');

  const [filters] = useState(defaultFilters);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilters = (event: React.SyntheticEvent, newValue: string) => {
    if (data) {
      setSelectedFilter(newValue);
    }
  };

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!data?.data.deals.length && canReset) || !data?.data.deals.length;

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.admin.edit(id));
    },
    [router]
  );

  const dealData = data?.data?.deals
    .filter((f) =>
      selectedFilter === 'published'
        ? f.is_active
        : selectedFilter === 'unpublished'
        ? !f.is_active
        : true
    )
    .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage);

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
              {Object.entries(Status).map(([label, item]) => (
                // Calculate the count for each tab
                <Tab
                  key={item}
                  iconPosition="end"
                  sx={{
                    pl: 1,
                  }}
                  icon={
                    <Label
                      variant={
                        ((item === Status.All || item === selectedFilter) && 'filled') || 'soft'
                      }
                      color={
                        (item === Status.Published && 'success') ||
                        (item === Status.Unpublished && 'error') ||
                        (item === Status.All && 'default') ||
                        'default'
                      }
                    >
                      {item === Status.Published &&
                        data?.data?.deals?.filter((d) => d.is_active === true).length}
                      {item === Status.Unpublished &&
                        data?.data?.deals?.filter((d) => !d.is_active).length}
                      {item === Status.All && data?.data?.deals?.length}
                    </Label>
                  }
                  value={item}
                  label={label}
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
                  {dealData?.map((row) => (
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
            count={data ? data.data.deals.length : 0}
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
