'use client';

import { format } from 'date-fns';

import {
  Button,
  Dialog,
  DialogActions,
  ListItemText,
  Stack,
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
              p: 3,
            },
          }}
        >
          <Stack gap={4}>
            <Stack gap={3}>
              <Typography variant="h4">Request JSON</Typography>
              <ReactJson src={JSON.parse(action?.request) as any} />
            </Stack>
            <Stack gap={3}>
              <Typography variant="h4">Response JSON</Typography>
              <ReactJson src={JSON.parse(action?.response) as any} />
            </Stack>
          </Stack>

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
