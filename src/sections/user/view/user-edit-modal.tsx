import CloseIcon from '@mui/icons-material/Close';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { userApi } from 'src/redux/api/user.api';
import { User, UserActions } from 'src/types/user.types';
import { handleError } from 'src/utils/handle-error';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
}

const UserEditModal = (props: Props) => {
  const { onClose, open, user } = props;

  const [updateUser] = userApi.useEditUserMutation();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [isChecked, setIsChecked] = useState(false);
  const [reason, setReason] = useState('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setIsChecked(false);
    setReason('');
  };

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      await updateUser({
        action:
          expanded === 'kyc'
            ? UserActions.CKYC_MISMATCH
            : expanded === 'aml'
            ? UserActions.AML_BYPASS
            : UserActions.CALIBER_BYPASS,
        mobile_number: user.mobile,
        reason,
        status: isChecked,
      }).unwrap();
      enqueueSnackbar('Update success!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  const details = [
    {
      title: 'KYC Mismatch',
      value: user?.is_kyc_mismatched ? 'Yes' : 'No',
      id: 'kyc',
    },
    {
      title: 'AML',
      value: user?.is_aml_present ? 'Yes' : 'No',
      id: 'aml',
    },
    {
      title: 'Caliber',
      value: user?.is_caliber_user ? 'Yes' : 'No',
      id: 'caliber',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '600px',
          p: 3,
        },
      }}
    >
      <Stack gap={5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Edit User</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {details.map((detail) => (
          <Accordion
            sx={{
              '&.MuiPaper-root ': {
                boxShadow: 'unset',
                backgroundColor: 'unset',
                margin: 'unset',
              },
            }}
            onChange={handleChange(detail.id)}
            expanded={expanded === detail.id}
          >
            <AccordionSummary sx={{ px: 'unset' }} expandIcon={null} id={detail.id}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1">{detail.title}</Typography>
                <Typography variant="subtitle1">{detail.value}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 'unset' }}>
              <Stack gap={3}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1">Do you want to Whitelist?</Typography>
                  <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                </Box>
                <TextField
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  label="Comment"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}

        <Stack gap={3}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button disabled={isLoading || !reason} variant="contained" onClick={handleUpdateUser}>
              {isLoading ? <CircularProgress /> : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default UserEditModal;
