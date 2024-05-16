'use client';

import { Button, Container, Input, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelDataViewer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setData(data);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const columns: GridColDef[] =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 150,
          editable: false,
        }))
      : [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Excel File Upload and Viewer
      </Typography>
      <label htmlFor="contained-button-file">
        <Input
          accept=".xlsx, .xls"
          id="contained-button-file"
          multiple={false}
          type="file"
          onChange={handleFile}
          style={{ display: 'none' }}
        />
        <Button variant="contained" component="span">
          Upload Excel
        </Button>
      </label>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        {data.length > 0 ? (
          <DataGrid
            rows={data.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        ) : (
          <Typography>Upload an Excel file to view data.</Typography>
        )}
      </div>
    </Container>
  );
};

export default ExcelDataViewer;
