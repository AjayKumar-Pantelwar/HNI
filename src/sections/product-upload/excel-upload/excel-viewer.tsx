'use client';

import FileUpload from '@mui/icons-material/FileUpload';
import {
  Box,
  Button,
  Chip,
  Divider,
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
import React, { useState } from 'react';
import DownloadIcon from 'src/assets/icons/download-icon';
import Filters from 'src/assets/icons/filters';
import { useBoolean } from 'src/hooks/use-boolean';
import { UploadResponseData } from 'src/types/product-upload.types';
import FiltersDrawer from './filters-drawer';

interface ExcelData {
  [key: string]: any;
}

interface Props {
  file?: File | null;
  data: UploadResponseData | undefined;
  handleDownload: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const viewColumns = ['id', 'is_active'];
const ExcelViewer = (props: Props) => {
  const {
    file,
    data = {
      success: [
        {
          scheme_id: 'MMPMS3321',
          row_number: 2,
        },
        {
          scheme_id: 'MMPMS3327',
          row_number: 3,
        },
        {
          scheme_id: 'MMPMS3326',
          row_number: 4,
        },
        {
          scheme_id: 'MMPMS2679',
          row_number: 5,
        },
        {
          scheme_id: 'MMPMS587',
          row_number: 6,
        },
        {
          scheme_id: 'MMPMS2396',
          row_number: 7,
        },
        {
          scheme_id: 'MMPMS3081',
          row_number: 8,
        },
      ],
      error: [
        {
          error: {},
          scheme_id: '',
          row_number: 9,
        },
      ],
    },
    setOpen,
    handleDownload,
  } = props;

  const filtersOpen = useBoolean();
  // const [actualData, setActualData] = useState<ExcelData[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);
  // const [filter, setFilter] = useState<string>('');

  // useEffect(() => {
  //   if (file !== null) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = e.target?.result;
  //       const workbook = XLSX.read(data, { type: 'binary' });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
  //       const cols = Object.keys(jsonData[0]).map((key) => key);
  //       setColumns(cols);
  //       setActualData(jsonData);
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // }, [file]);

  // const filteredData = actualData.filter((row) =>
  //   Object.values(row).some((value) =>
  //     value.toString().toLowerCase().includes(filter.toLowerCase())
  //   )
  // );

  // const gridColumns: GridColDef[] =
  //   actualData.length > 0
  //     ? Object.keys(actualData[0]).map((key) => ({
  //         field: key,
  //         headerName: key,
  //         width: 150,
  //         editable: false,
  //       }))
  //     : [];

  // filteredData.map((f) => Object.keys(f).map((c) => console.log(c)));

  const [status, setStatus] = useState('');

  const filteredData = status
    ? data[status as keyof UploadResponseData]
    : [...data.success, ...data.error];

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
          <Stack sx={{ alignItems: 'end' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Total
              </Typography>
            </Box>
            <Typography variant="h6">{data.success.length + data.error.length}</Typography>
          </Stack>
          <Divider orientation="vertical" sx={{ height: '50px' }} />
          <Stack sx={{ alignItems: 'end' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{ height: '10px', width: '10px', borderRadius: '50%', bgcolor: 'success.main' }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Active
              </Typography>
            </Box>
            <Typography variant="h6">{data.success.length}</Typography>
          </Stack>
          <Divider orientation="vertical" sx={{ height: '50px' }} />
          <Stack sx={{ alignItems: 'end' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{ height: '10px', width: '10px', borderRadius: '50%', bgcolor: 'error.main' }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Failed
              </Typography>
            </Box>
            <Typography variant="h6">{data.error.length}</Typography>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
            Download
          </Button>
          <Button onClick={() => setOpen(true)} variant="contained" startIcon={<FileUpload />}>
            Upload Excel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Filters />}
            onClick={() => filtersOpen.onTrue()}
          >
            Filters
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => (
              <TableRow key={row.scheme_id}>
                <TableCell>{row.scheme_id}</TableCell>
                <TableCell>
                  <Chip
                    label={'error' in row ? 'Failed' : 'Success'}
                    variant="soft"
                    color={'error' in row ? 'error' : 'success'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FiltersDrawer open={filtersOpen.value} onClose={filtersOpen.onFalse} setStatus={setStatus} />

      {/* <DataGrid
        rows={filteredData.map((row, index) => ({ id: index, ...row }))}
        columns={gridColumns}
        slots={{
          toolbar: GridToolbar,
        }}
        rowCount={actualData.length}
        pageSizeOptions={[10, 25, 50, 100]}
      /> */}
    </Paper>
  );
};

export default ExcelViewer;
