import React, { useState } from 'react';
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
import { TextField, Typography } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { userApi } from 'src/redux/api/user.api';
import { User, UserActions } from 'src/types/user.types';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: User;
};

export default function UserBlockForm({ currentUser, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [reason, setReason] = useState('');

  const [updateUser] = userApi.useEditUserMutation();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!currentUser) return;
      await updateUser({
        action: UserActions.BLOCK_USER,
        mobile_number: currentUser.mobile,
        reason,
        status: !currentUser?.is_blocked,
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
      <DialogTitle>{currentUser?.is_blocked ? 'Unblock' : 'Block'} Admin</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography>
          Are you sure you want to {currentUser?.is_blocked ? 'unblock' : 'block'} this user?
        </Typography>
        <TextField
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          multiline
          rows={3}
          label="Comment"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          disabled={isSubmitting || !reason}
          onClick={onSubmit}
          variant="contained"
          loading={isSubmitting}
        >
          {currentUser?.is_blocked ? 'Unblock' : 'Block'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
