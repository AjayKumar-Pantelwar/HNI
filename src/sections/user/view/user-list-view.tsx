'use client';

import {
  Box,
  Button,
  Card,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';
import Filters from 'src/assets/icons/filters';
import SearchIcon from 'src/assets/icons/search-icon';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
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
import { userApi } from 'src/redux/api/user.api';
import { GetUserRequest } from 'src/types/user.types';
import UserFilterDrawer from './user-filter-drawer';
import UserTableRow from './user-table-row';

const TABLE_HEAD = [
  { id: 'client_name', label: 'Client Name' },
  { id: 'mobile_no', label: 'Mobile No' },
  { id: 'pan', label: 'PAN Number' },
  { id: 'blocked', label: 'Status' },
  { id: 'caliber', label: 'Caliber' },
  { id: 'kyc_missmatch', label: 'KYC Mismatch' },
  { id: 'aml', label: 'AML' },
  { id: 'edit', label: 'Actions', width: 80 },
];

const defaultFilters: GetUserRequest = {
  name: '',
  mobile: '',
  pan: '',
  kyc_mismatch: '',
  is_aml: '',
  is_caliber: '',
  total_pages: 1,
  total_records: 10,
};

const UserListView = () => {
  const table = useTable();

  const [filters, setFilters] = useState<GetUserRequest>(defaultFilters);
  const { data, error, isError } = userApi.useUsersQuery(filters);

  const { enqueueSnackbar } = useSnackbar();

  const [input, setInput] = useState('');

  const filtersDrawer = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (/\d/.test(input)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          mobile: input,
        }));
      } else if (input.length === 10 && /^[A-Z]{5}\d{4}[A-Z]$/.test(input)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          pan: input,
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          name: input,
        }));
      }
      setInput('');
    }
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar((error as any).data.message, { variant: 'error' });
    }
  }, [isError]);

  return (
    <Box>
      <Card>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter name, phone, PAN"
            onKeyDown={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={() => filtersDrawer.onTrue()}
            variant="contained"
            color="secondary"
            startIcon={<Filters />}
          >
            Filters
          </Button>
        </Box>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data?.data?.users?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                data?.data?.users?.map((row) => row.id.toString()) || []
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data?.data?.users?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(checked, data?.data?.roles?.map((row) => row.rid) || [])
                // }
              />

              <TableBody>
                {[...(data?.data?.users || [])].map((row, i) => (
                  <UserTableRow
                    key={i}
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
                    data?.data?.users?.length || 0
                  )}
                />

                <TableNoData notFound={!data?.data?.users?.length} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={data?.data?.total_records || 0}
          page={(filters?.total_pages || 1) - 1 || 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={(e, newPage) =>
            setFilters((prev) => ({ ...prev, total_pages: newPage + 1 }))
          }
          onRowsPerPageChange={table.onChangeRowsPerPage}
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
      <UserFilterDrawer
        defaultFilters={defaultFilters}
        setFilters={setFilters}
        open={filtersDrawer.value}
        onClose={filtersDrawer.onFalse}
      />
    </Box>
  );
};

export default UserListView;
