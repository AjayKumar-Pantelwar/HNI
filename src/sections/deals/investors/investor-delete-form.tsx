'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'src/components/snackbar';
import { dealApi } from 'src/redux/api/deal.api';
import { handleError } from 'src/utils/handle-error';

type Props = {
  open: boolean;
  onClose: () => void;
  dealId: string;
  investorIds: string[];
};

export default function InvestorDeleteForm({ open, onClose, investorIds, dealId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteInvestor, { isLoading: isSubmitting }] = dealApi.useDeleteInvestorMutation();

  const handleSubmit = async () => {
    try {
      await deleteInvestor({ deal_id: dealId, ids: investorIds }).unwrap();
      onClose();
      enqueueSnackbar('Delete Success', { variant: 'success' });
    } catch (error) {
      handleError(error);
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
      <Stack gap={1} p={2}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Delete Investor
        </Typography>
        <Typography>Are you sure you want to delete the selected investor?</Typography>
        <LoadingButton
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          color="error"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
