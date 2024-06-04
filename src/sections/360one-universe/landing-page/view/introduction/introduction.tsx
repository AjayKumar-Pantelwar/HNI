import {
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from 'src/assets/icons/edit-icon';
import Scrollbar from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  emptyRows,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { Intro } from 'src/types/unverise/landing-page';
import EditIntroductionModal from './edit-introduction-modal';

interface Props {
  data: Intro[];
}

const TABLE_HEAD = [
  { id: 'video_thumbnai', label: 'Video Thumbnai', width: 500 },
  { id: 'topic', label: 'Topic', width: 500 },
  { id: 'speaker_name', label: 'Speaker Name', width: 500 },
  { id: 'designation', label: 'Designation', width: 500 },
  { id: 'logo', label: 'Logo', width: 500 },
  { id: 'actions', label: 'Actions', width: 50 },
];

const Introduction = (props: Props) => {
  const { data } = props;
  const table = useTable();
  const denseHeight = table.dense ? 52 : 72;

  const notFound = !data?.length || data === null;

  return (
    <Card>
      <Typography variant="subtitle1" sx={{ p: 2 }}>
        Introduction
      </Typography>
      <Divider />
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={data?.length || 0}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(checked, data?.map((row) => row.speaker_name) || [])
          }
        />

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 0 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data?.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {data !== null &&
                data?.map((row) => <IntroductionRow key={row.company_name} row={row} />)}
              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, data?.length || 0)}
              />
              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
};

export default Introduction;

interface RowProps {
  row: Intro;
}

const IntroductionRow = (props: RowProps) => {
  const { row } = props;
  const edit = useBoolean();

  return (
    <TableRow>
      <TableCell>
        {' '}
        <video src={row.video_thumbnail} width="100" height="100" />{' '}
      </TableCell>
      <TableCell>{row.topic}</TableCell>
      <TableCell>{row.speaker_name}</TableCell>
      <TableCell>{row.designation}</TableCell>
      <TableCell>
        <img src={row.company_logo} height={40} width={40} alt={row.company_name} />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => edit.onTrue()}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <EditIntroductionModal open={edit.value} onClose={edit.onFalse} intro={row} />
    </TableRow>
  );
};
