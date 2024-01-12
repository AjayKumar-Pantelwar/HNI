import React from 'react';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// _mock
// types
// assets
// components
import { Typography } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { adminApi } from 'src/redux/api/admin.api';
import { Admin } from 'src/types/admin.types';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentAdmin?: Admin;
};

export default function AdminBlockForm({ currentAdmin, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [blockAdmin] = adminApi.useBlockAdminMutation();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!currentAdmin) return;
      await blockAdmin({
        aid: currentAdmin?.aid,
        to_block: !currentAdmin?.is_blocked,
      }).unwrap();
      onClose();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <DialogTitle>{currentAdmin?.is_blocked ? 'Unblock' : 'Block'} Admin</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to {currentAdmin?.is_blocked ? 'unblock' : 'block'} this admin?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton type="submit" onClick={onSubmit} variant="contained" loading={isSubmitting}>
          {currentAdmin?.is_blocked ? 'Unblock' : 'Block'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
