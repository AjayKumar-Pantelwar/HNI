import { Box, Button, Divider, Stack, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import PageHeader from '../page-header';
import AddPDFLinkModal from './add-pdf-link-modal';
import { PDFLinkTagTableRow } from './table-row';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'category', label: 'Category' },
  { id: 'article_link', label: 'Article Link' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: ResearchData;
  handleChange: (_event: React.SyntheticEvent, newValue: ResearchViews) => void;
  tab: string;
}

const PDFLinkTag = (props: Props) => {
  const { data, handleChange, tab } = props;

  const table = useTable();

  const addNew = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const cards = data?.pages?.filter((p) => p.type === tab)[0]?.cards;

  const page = data?.pages?.filter((p) => p.type === tab)[0];
  return (
    <Box>
      <Stack>
        <Box sx={{ px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PageHeader page={page} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {data?.pages?.length > 1 && (
              <SubTabsInternal tab={tab} handleChange={handleChange} page={data?.pages} />
            )}
            <Button onClick={addNew.onTrue} startIcon={<AddCircleIcon />} variant="contained">
              Add new Article
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
              table.onSelectAllRows(checked, cards?.map((row, i) => row?.image_link) || [])
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
                  <PDFLinkTagTableRow
                    key={i}
                    card={row}
                    page={page}
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
      <AddPDFLinkModal page={page} open={addNew.value} onClose={addNew.onFalse} />
    </Box>
  );
};

export default PDFLinkTag;
