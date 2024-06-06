'use client';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import { ConfirmDialog } from 'src/components/custom-dialog';
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
import { useBoolean } from 'src/hooks/use-boolean';
// import { usePerm } from 'src/hooks/use-perm';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Carousel, GetCarouselResponse } from 'src/types/carousel.types';
import CarouselTableRow from '../carousel-table-row';

const TABLE_HEAD = [
  { id: 'move', label: '' },
  { id: 'image', label: 'Image' },
  { id: 'icon', label: 'Icon' },
  { id: 'title', label: 'Title' },
  { id: 'subtitle', label: 'Subtitle' },
  { id: 'edit', label: 'Actions', width: 80 },
];
interface Props {
  data: GetCarouselResponse;
}

export default function CarouselListView({ data }: Props) {
  const table = useTable();

  // const { adminManagementPerm } = usePerm();
  const [rows, setRows] = useState<Carousel[]>([]);

  const confirm = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  useEffect(() => {
    if (data) {
      setRows(data?.data);
    }
  }, [data]);

  return (
    <>
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data?.data?.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(checked, data?.data?.map((row) => row.id.toString()) || [])
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <AddRoundedIcon />
                </IconButton>
              </Tooltip>
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
              />

              <ReactSortable
                list={rows}
                tag="tbody"
                setList={setRows}
                style={{
                  width: '100%',
                }}
              >
                {rows?.map((row, index) => (
                  <CarouselTableRow key={index} row={row} index={index} />
                ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, data?.data?.length || 0)}
                />
                <TableNoData notFound={!data?.data?.length} />
              </ReactSortable>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={data?.data?.length || 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

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
