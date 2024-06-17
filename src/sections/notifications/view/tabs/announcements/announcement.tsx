import { Box, Table, TableBody, TableContainer } from '@mui/material';
import { useSnackbar } from 'notistack';
import Scrollbar from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  emptyRows,
  useTable,
} from 'src/components/table';
import { GetNotificationsResponse } from 'src/types/notifications.types';
import AnnouncementForm from './announcement-form';
import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'from_date', label: 'From Date' },
  { id: 'to_date', label: 'To Date' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: GetNotificationsResponse | undefined;
}

const Announcement = (props: Props) => {
  const { data } = props;
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();
  const denseHeight = table.dense ? 52 : 72;

  const notifications = data?.data || [
    {
      id: 'b993c9f0-a951-46ba-a40a-02d859f9bc4f',
      title: 'bse down',
      subtitle: 'kuchh nahi chalega',
      is_active: false,
      from_date: '2024-05-11 00:00:00 +0000 UTC',
      to_date: '2024-05-13 00:00:00 +0000 UTC',
    },
    {
      id: '7e4fdaaa-d72f-4116-8381-cf03b115dfcc',
      title: 'server down',
      subtitle: 'kuchh nahi chalega',
      is_active: false,
      from_date: '2024-05-13 00:00:00 +0000 UTC',
      to_date: '2024-05-13 00:00:00 +0000 UTC',
    },
  ];

  return (
    <Box>
      {notifications?.length === 0 ? (
        <AnnouncementForm />
      ) : (
        <Box>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={notifications?.length || 0}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(checked, notifications?.map((row, i) => row?.id) || [])
              }
            />
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={notifications?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(checked, data?.data?.bonds?.roles?.map((row) => row.rid) || [])
                  // }
                />

                <TableBody>
                  {notifications?.map((row, i) => (
                    <Tab1TableRow
                      key={i}
                      {...row}
                      // selected={table.selected.includes(row.rid)}
                      // onSelectRow={() => table.onSelectRow(row.rid)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, notifications?.length || 0)}
                  />

                  <TableNoData notFound={!notifications?.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Announcement;
