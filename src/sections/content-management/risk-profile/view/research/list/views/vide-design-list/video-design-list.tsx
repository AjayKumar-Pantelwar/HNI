import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from 'src/assets/icons/edit-icon';
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
import { ResearchData, ResearchViews } from 'src/types/content-management/research.types';
import SubTabsInternal from '../../../sub-tabs';
import AddSpeakerModal from './add-speaker';
import { Tab4TableRow } from './table-row';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'speaker_name', label: 'Speaker Name' },
  { id: 'designation', label: 'Designation' },
  { id: 'logo', label: 'Logo' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: ResearchData;
  handleChange: (_event: React.SyntheticEvent, newValue: ResearchViews) => void;
  tab: string;
}

const VideoDesignList = (props: Props) => {
  const { data, handleChange, tab } = props;

  const table = useTable();

  const addNew = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const cards = data?.page?.filter((p) => p.type === tab)[0]?.cards;

  const page = data?.page?.filter((p) => p.type === tab)[0];

  return (
    <Box>
      <Stack>
        <Box sx={{ px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {page?.heading && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{page?.heading}</Typography>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
              </>
            )}

            <Stack sx={{ alignItems: 'start' }}>
              <Typography variant="body1" color="text.secondary">
                Downloadable
              </Typography>
              <Checkbox checked={page?.is_downloadable} />
            </Stack>
            <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
            <Stack sx={{ alignItems: 'start' }}>
              <Typography variant="body1" color="text.secondary">
                Shareable
              </Typography>
              <Checkbox checked={page?.is_shareable} />
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {data?.page?.length > 1 && (
              <SubTabsInternal tab={tab} handleChange={handleChange} page={data?.page} />
            )}
            <Button onClick={addNew.onTrue} startIcon={<AddCircleIcon />} variant="contained">
              Add new Speaker
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
                  <Tab4TableRow
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
      <AddSpeakerModal open={addNew.value} onClose={addNew.onFalse} />
    </Box>
  );
};

export default VideoDesignList;
