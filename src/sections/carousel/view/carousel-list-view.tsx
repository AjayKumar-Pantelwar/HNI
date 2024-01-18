'use client';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import { ConfirmDialog } from 'src/components/custom-dialog';
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
import { useBoolean } from 'src/hooks/use-boolean';
// import { usePerm } from 'src/hooks/use-perm';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from 'react';
import { Carousel, GetCarouselResponse } from 'src/types/carousel.types';
import CarouselTableRow from '../carousel-table-row';

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'subtitle', label: 'Subtitle' },
  { id: 'edit', label: 'Actions', width: 80 },
];
interface Props {
  data: GetCarouselResponse;
  isGlobalEdit: boolean;
}

export default function CarouselListView({ data, isGlobalEdit }: Props) {
  const table = useTable();

  const settings = useSettingsContext();

  // const { adminManagementPerm } = usePerm();
  const [rows, setRows] = useState<Carousel[]>([]);

  const confirm = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  useEffect(() => {
    if (data) {
      setRows(data?.data);
    }
  }, [data]);

  const [isOrderChanged, setIsOrderChanged] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    if (!isGlobalEdit) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    if (!isGlobalEdit) {
      e.preventDefault();
      return;
    }

    const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
    const draggedRow = rows[draggedIndex];

    // Update the row order
    const updatedRows = [...rows];
    updatedRows.splice(draggedIndex, 1);
    updatedRows.splice(index, 0, draggedRow);

    setRows(updatedRows);
    setIsOrderChanged(true);
  };

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
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(checked, data?.data?.roles?.map((row) => row.rid) || [])
                // }
              />

              <TableBody>
                {rows?.map((row, index) => (
                  <CarouselTableRow
                    key={index}
                    row={row}
                    index={index}
                    isEditing={isGlobalEdit}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
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
