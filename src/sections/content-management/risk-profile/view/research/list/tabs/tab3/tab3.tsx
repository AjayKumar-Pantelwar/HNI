import {
  Box,
  Button,
  Checkbox,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
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
import { ResearchData } from 'src/types/content-management/research.types';
import SubTabsInternal from '../../../sub-tabs';
import AddNewsModal from './add-news';
import { Tab3TableRow } from './table-row';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'tags', label: 'Tags' },
  { id: 'article_link', label: 'Article Link' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: ResearchData;
}

const ResearchTab3 = (props: Props) => {
  const { data } = props;

  const [tab, setTab] = useState(1);

  const table = useTable();

  const addNew = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const cards = data?.page[tab - 1]?.cards;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Stack>
        <Box sx={{ px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Stack sx={{ alignItems: 'start' }}>
              <Typography variant="body1" color="text.secondary">
                Downloadable
              </Typography>
              <Checkbox checked={data?.page[tab - 1]?.is_downloadable} />
            </Stack>
            <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
            <Stack sx={{ alignItems: 'start' }}>
              <Typography variant="body1" color="text.secondary">
                Shareable
              </Typography>
              <Checkbox checked={data?.page[tab - 1]?.is_shareable} />
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {data?.page?.length > 1 && <SubTabsInternal tab={tab} handleChange={handleChange} />}
            <Button onClick={addNew.onTrue} startIcon={<AddCircleIcon />} variant="contained">
              Add new News
            </Button>
          </Box>
        </Box>
        <Divider />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={cards?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(checked, cards?.map((row, i) => row?.image) || [])
            }
          />
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={cards?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(checked, data?.data?.bonds?.roles?.map((row) => row.rid) || [])
                // }
              />

              <TableBody>
                {cards?.map((row, i) => (
                  <Tab3TableRow
                    key={i}
                    {...row}
                    // selected={table.selected.includes(row.rid)}
                    // onSelectRow={() => table.onSelectRow(row.rid)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, cards?.length || 0)}
                />

                <TableNoData notFound={!cards?.length} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={cards?.length || 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Stack>
      <AddNewsModal open={addNew.value} onClose={addNew.onFalse} />
    </Box>
  );
};

export default ResearchTab3;
