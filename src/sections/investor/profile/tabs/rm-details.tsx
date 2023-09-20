import {
  Box,
  Button,
  Card,
  CircularProgress,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useRoleAdmin } from 'src/hooks/admin/use-role-admin';
import { useBoolean } from 'src/hooks/use-boolean';
import { Investor } from 'src/types/investor.types';
import { fDateTime } from 'src/utils/format-time';
import { AssignRMDialog } from '../../assign-rm-dialog';

const StyledLIT = styled(ListItemText)(({ theme }) => ({
  flexBasis: '45%',
}));

type Props = { investor: Investor };

const RMDetails = (props: Props) => {
  const { investor } = props;
  const assignRm = useBoolean();
  const { data: adminData, isLoading } = useRoleAdmin('rm');

  const rm = adminData?.data?.admins?.find((admin) => admin.aid === investor.irm_id);

  return (
    <Box>
      <Typography variant="h4">Relationship Manager Details</Typography>
      <Card
        sx={{
          mt: 3,
          p: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '250px',
          width: '100%',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : rm ? (
          <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            <StyledLIT secondary={rm.name || '--'} primary="Name" />
            <StyledLIT secondary={rm.email || '--'} primary="Email" />
            <StyledLIT secondary={rm.mobile_number || '--'} primary="Mobile Number" />
            <StyledLIT secondary={fDateTime(rm.created_at) || '--'} primary="Created At" />
          </Box>
        ) : (
          <Stack sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" color="text.secondary">
              No Relationship Manager details found
            </Typography>
            <Button variant="contained" onClick={assignRm.onTrue}>
              Add
            </Button>
            <AssignRMDialog
              open={assignRm.value}
              onClose={assignRm.onFalse}
              rm={investor.irm_id}
              id={investor.cid}
            />
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default RMDetails;
