'use client';

import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import isEqual from 'lodash/isEqual';
import React, { useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FilterResult from 'src/components/filter-result';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
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
import { investorApi } from 'src/redux/api/investor.api';
import { paths } from 'src/routes/paths';
import { GetInvestorsRequest, Investor } from 'src/types/investor.types';
import { getRawFilters } from 'src/utils/raw-filters';
import InvestorFilters from '../investor-list-filters';
import DealTableRow from '../investor-table-row';

const TABLE_HEAD = [
  { id: 'preferred_name', label: 'Name', width: 80 },
  { id: 'stage', label: 'Stage', width: 80 },
  { id: 'irm_id', label: 'RM', width: 80 },
  { id: 'created_at', label: 'Created At', width: 140 },
  { id: 'actions', label: 'Actions', width: 140, align: 'right' },
];
const status = [
  { value: 'all', label: 'All' },
  { value: 'is_subscribed', label: 'Subscribed' },
  { value: 'not_subscribed', label: 'Unsubscribed' },
];
const defaultFilters: GetInvestorsRequest = {
  page_no: 1,
  no_of_records: 10,
  cid: '',
  email: '',
  irm_id: '',
  is_subscribed: '',
  mobile_number: '',
  pan_number: '',
};

export function InvestorListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const { data } = investorApi.useInvestorsQuery(filters);

  const { data: adminData } = useRoleAdmin('rm');

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(getRawFilters(defaultFilters), getRawFilters(filters));

  const notFound = (!data?.data?.investors?.length && canReset) || !data?.data?.investors?.length;

  const [selectedFilter, setSelectedFilter] = useState('all');

  const [investorData, setInvestorData] = React.useState<Investor[]>([]);
  console.log(data);

  React.useEffect(() => {
    if (data) setInvestorData(data?.data?.investors);
  }, [data]);
  const handleFilters = (event: React.SyntheticEvent, newValue: string) => {
    if (data) {
      setSelectedFilter(newValue);
      let filteredData = data?.data?.investors;
      if (newValue === 'is_subscribed') {
        filteredData = filteredData.filter((d) => d.is_subscribed === true);
      } else if (newValue === 'not_subscribed') {
        filteredData = filteredData.filter((d) => !d.is_subscribed);
      }
      setInvestorData(filteredData);
    }
  };
  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Investor', href: paths.dashboard.investors.list },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box
        sx={{ py: 1, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'end' }}
      >
        <FilterResult
          filters={filters}
          setFilters={setFilters}
          canReset={canReset}
          onResetFilters={handleResetFilters}
          results={+(data?.data?.total_records || 0)}
        />
        <InvestorFilters
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
          <Tabs
            value={selectedFilter}
            onChange={handleFilters}
            sx={{
              pl: 2.5,
            }}
          >
            {status.map((item) => (
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
                      (item.value === 'is_subscribed' && 'success') ||
                      (item.value === 'not_subscribed' && 'error') ||
                      (item.value === 'all' && 'default') ||
                      'default'
                    }
                  >
                    {/* {item.value === 'all' && data?.data?.investors?.length} */}
                    {item.value === 'all' && data?.data?.total_records}
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
            rowCount={data?.data?.investors?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(checked, data?.data?.investors?.map((row) => row.cid) || [])
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
                rowCount={data?.data?.investors?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {investorData?.map((row) => (
                  <DealTableRow key={row.cid} row={row} rms={adminData?.data?.admins} />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    data?.data?.investors?.length || 0
                  )}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={+(data?.data?.total_records || 0)}
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
}
