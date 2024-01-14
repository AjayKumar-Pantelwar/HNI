'use client';

import { format } from 'date-fns';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { Action } from 'src/types/admin.types';
import { titleCase } from 'src/utils/change-case';

import ReactJson from 'react-json-view';

type Props = {
  action: Action;
};
export const ActionTableRow = ({ action }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleEyeButtonClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <TableRow key={action.action_id}>
      {/* <TableCell>{action.username || '--'}</TableCell> */}
      <TableCell>{titleCase(action.event_type)}</TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(action?.created_at), 'dd MMM yyyy') || '--'}
          secondary={format(new Date(action?.created_at), 'p') || '--'}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <pre>{JSON.stringify(action?.response || action?.response || [], null, 2)}</pre>
      </TableCell>

      <>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton component={Link} onClick={handleEyeButtonClick} href="">
            <Iconify icon="carbon:view-filled" />
          </IconButton>
        </TableCell>

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              width: 'min(100%,600px)',
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h4">Request JSON</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            {/* <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(transformRequest(action?.event_detail?.Request as any), null, 2)}
            </pre> */}
            <ReactJson src={action?.request as any} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="outlined" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </TableRow>
  );
};

export default ActionTableRow;
