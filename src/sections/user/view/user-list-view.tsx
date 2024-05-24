import { Box, Card, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useTable,
} from 'src/components/table';
import { GetUserResponse } from 'src/types/user.types';
import UserTableRow from './user-table-row';

interface Props {
  data: GetUserResponse;
}

const TABLE_HEAD = [
  { id: 'client_name', label: 'Client Name' },
  { id: 'mobile_no', label: 'Mobile No' },
  { id: 'pan', label: 'PAN Number' },
  { id: 'kyc_missmatch', label: 'KYC Mismatch' },
  { id: 'aml', label: 'AML' },
  { id: 'calibre', label: 'Calibre' },
  { id: 'edit', label: 'Actions', width: 80 },
];

const UserListView = (props: Props) => {
  const { data } = props;
  const table = useTable();

  const denseHeight = table.dense ? 52 : 72;

  return (
    <Box>
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data?.data?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(checked, data?.data?.map((row) => row.id.toString()) || [])
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
                  .map((row, i) => (
                    <UserTableRow
                      key={i}
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
    </Box>
  );
};

export default UserListView;
