import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from 'src/assets/icons/edit-icon';
import TickIcon from 'src/components/horizontal-timeline/icons/tick.icon';
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
import { PDFUploadData } from 'src/types/product-upload.types';
import EditProductModal from '../edit-product-modal';

interface Props {
  data: PDFUploadData[];
}

const TABLE_HEAD = [
  { id: 'product_id', label: 'Product ID' },
  { id: 'prodcut_name', label: 'Prodcut Name' },
  { id: 'pdf1', label: 'PDF1' },
  { id: 'pdf2', label: 'PDF2' },
  { id: 'pdf3', label: 'PDF3' },
  { id: 'pdf4', label: 'PDF4' },
  { id: 'edit', label: 'Actions', width: 80 },
];

const PMS = (props: Props) => {
  const { data } = props;

  const table = useTable();

  const denseHeight = table.dense ? 52 : 72;

  const [isUpload, setIsUpload] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };

  return (
    <Box>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={data?.length || 0}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(checked, data?.map((row) => row.product_id.toString()) || [])
          }
          // action={
          //   <Tooltip title="Delete">
          //     <IconButton color="primary" onClick={confirm.onTrue}>
          //       <AddRoundedIcon />
          //     </IconButton>
          //   </Tooltip>
          // }
        />

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data?.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              // onSelectAllRows={(checked) =>
              //   table.onSelectAllRows(checked, data?.roles?.map((row) => row.rid) || [])
              // }
            />

            <TableBody>
              {data.map((row) => (
                <MTableRow
                  key={row.product_id}
                  row={row}
                  // selected={table.selected.includes(row.rid)}
                  // onSelectRow={() => table.onSelectRow(row.rid)}
                />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, data?.length || 0)}
              />

              <TableNoData notFound={!data?.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={data?.length || 0}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Box>
  );
};

export default PMS;

interface RowProps {
  row: PDFUploadData;
}

const MTableRow = (props: RowProps) => {
  const { row } = props;
  const editPdf = useBoolean();
  return (
    <TableRow>
      <TableCell>{row?.product_id}</TableCell>
      <TableCell>{row?.product_name}</TableCell>
      <TableCell>{row?.PDF1 ? <TickIcon /> : '--'}</TableCell>
      <TableCell>{row?.PDF2 ? <TickIcon /> : '--'}</TableCell>
      <TableCell>{row?.PDF3 ? <TickIcon /> : '--'}</TableCell>
      <TableCell>{row?.PDF3 ? <TickIcon /> : '--'}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => editPdf.onTrue()}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <EditProductModal open={editPdf.value} handleClose={editPdf.onFalse} product={row} />
    </TableRow>
  );
};
