'use client';

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelData {
  [key: string]: any;
}

interface Props {
  file: File | null;
}
const viewColumns = ['id', 'is_active'];
const ExcelUploadAndView = (props: Props) => {
  const { file } = props;
  const [actualData, setActualData] = useState<ExcelData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
        const cols = Object.keys(jsonData[0]).map((key) => key);
        setColumns(cols);
        setActualData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

  const filteredData = actualData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const gridColumns: GridColDef[] =
    actualData.length > 0
      ? Object.keys(actualData[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 150,
          editable: false,
        }))
      : [];

  // filteredData.map((f) => Object.keys(f).map((c) => console.log(c)));

  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Total
            </Typography>
            <Typography variant="h6">{actualData.length}</Typography>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Active
            </Typography>
            <Typography variant="h6">14</Typography>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="contained">Download</Button>
          <Button variant="contained">Upload Excel</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {actualData.length > 0 &&
                columns
                  .filter((f) => viewColumns.includes(f))
                  .map((key) => <TableCell key={key}>{key}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]) => {
                  if (!viewColumns.includes(key)) return null;
                  return <TableCell key={key}>{value.toString()}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DataGrid
        rows={filteredData.map((row, index) => ({ id: index, ...row }))}
        columns={gridColumns}
        slots={{
          toolbar: GridToolbar,
        }}
        rowCount={actualData.length}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </Paper>
  );
};

export default ExcelUploadAndView;
