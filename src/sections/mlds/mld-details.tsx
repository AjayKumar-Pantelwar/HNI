import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Chip,
  IconButton,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { MldElement } from 'src/types/mlds.types';
import { fNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import MLDAMCEditDailog from './mld-amc-edit-dailog';
import MLDEditDailog from './mld-edit-dailog';

interface Props {
  currentMLD: MldElement;
}

const StyledListItemText = (props: ListItemTextProps) => {
  const { sx, ...rest } = props;
  return <ListItemText {...rest} sx={{ ...sx, flex: 1, flexBasis: { xs: '40%', md: '20%' } }} />;
};

const MLDDetails = (props: Props) => {
  const { currentMLD } = props;

  const { amc, mld } = currentMLD;

  const actionPopover = usePopover();

  const editBond = useBoolean();
  const editAMC = useBoolean();

  return (
    <Stack gap={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack gap={2}>
          <Typography variant="h4">{mld?.name}</Typography>
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            <Chip
              label={mld?.is_activated ? 'Active' : 'Inactive'}
              color={mld?.is_activated ? 'success' : 'error'}
            />
            <Chip
              label={mld?.is_certified ? 'Certified' : 'Uncertified'}
              color={mld?.is_certified ? 'warning' : 'error'}
            />
          </Stack>
        </Stack>
        <IconButton
          color={actionPopover.open ? 'inherit' : 'default'}
          onClick={actionPopover.onOpen}
        >
          <MoreVertIcon />
        </IconButton>
        {actionPopover.open && (
          <CustomPopover
            open={actionPopover.open}
            onClose={actionPopover.onClose}
            arrow="right-top"
            sx={{ width: 190 }}
          >
            <MenuItem
              onClick={() => {
                editBond.onTrue();
              }}
            >
              Edit MLD
            </MenuItem>
            <MenuItem
              onClick={() => {
                editAMC.onTrue();
              }}
            >
              Edit AMC
            </MenuItem>
          </CustomPopover>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          p: 3,
          bgcolor: 'grey.200',
          borderRadius: 2,
          flexWrap: 'wrap',
          gap: { xs: 2, md: 'unset' },
        }}
      >
        <StyledListItemText primary="Credit Rating" secondary={mld?.rating} />
        <StyledListItemText primary="Yield" secondary={fNumber(mld?.yield)} />

        <StyledListItemText primary="Minimum Investmemt" secondary={fNumber(mld?.min_investment)} />
      </Box>
      <Stack sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 2, p: 3, gap: 2 }}>
        <Typography variant="h5">MLD Highlights</Typography>
        <Box
          sx={{
            display: 'flex',

            borderRadius: 2,
            flexWrap: 'wrap',
            gap: { xs: 2, md: 'unset' },
          }}
        >
          <StyledListItemText primary="Allotment Date" secondary={fDate(mld?.issuer_date)} />
          <StyledListItemText primary="Maturity Date" secondary={fDate(mld?.maturity_date)} />
          <StyledListItemText primary="Offer Close Date" secondary={mld?.offer_close_date} />
        </Box>
      </Stack>
      <MLDEditDailog open={editBond.value} currentMLD={mld} onClose={editBond.onFalse} />
      <MLDAMCEditDailog
        open={editAMC.value}
        currentAMC={amc}
        onClose={editAMC.onFalse}
        mld_id={mld.mld_id}
      />
    </Stack>
  );
};

export default MLDDetails;
