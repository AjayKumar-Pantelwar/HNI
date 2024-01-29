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
import { BondElement } from 'src/types/bonds.types';
import { fNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import BondAMCEditDailog from './bond-amc-edit-dailog';
import BondEditDailog from './bond-edit-dailog';

interface Props {
  currentBond: BondElement;
}

const StyledListItemText = (props: ListItemTextProps) => {
  const { sx, ...rest } = props;
  return <ListItemText {...rest} sx={{ ...sx, flex: 1, flexBasis: { xs: '40%', md: '20%' } }} />;
};

const BondDetails = (props: Props) => {
  const { currentBond } = props;

  const { amc, bond } = currentBond;

  const actionPopover = usePopover();

  const editBond = useBoolean();
  const editAMC = useBoolean();

  return (
    <Stack gap={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack gap={2}>
          <Typography variant="h4">{bond?.bond_name}</Typography>
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            <Chip
              label={bond?.is_activated ? 'Active' : 'Inactive'}
              color={bond?.is_activated ? 'success' : 'error'}
            />
            <Chip
              label={bond?.is_certified ? 'Certified' : 'Uncertified'}
              color={bond?.is_certified ? 'warning' : 'error'}
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
              Edit Bond
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
        <StyledListItemText primary="Credit Rating" secondary={bond?.rating} />
        <StyledListItemText primary="Face Value" secondary={fNumber(bond?.face_value)} />
        <StyledListItemText primary="Credit Rating" secondary={bond?.rating} />
        <StyledListItemText
          primary="Minimum Investmemt"
          secondary={fNumber(bond?.min_investment)}
        />
      </Box>
      <Stack sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 2, p: 3, gap: 2 }}>
        <Typography variant="h5">Bond Highlights</Typography>
        <Box
          sx={{
            display: 'flex',

            borderRadius: 2,
            flexWrap: 'wrap',
            gap: { xs: 2, md: 'unset' },
          }}
        >
          <StyledListItemText primary="Allotment Date" secondary={fDate(bond?.issue_date)} />
          <StyledListItemText primary="Maturity Date" secondary={fDate(bond?.maturity_date)} />
          <StyledListItemText primary="Type" secondary={bond?.type} />
          <StyledListItemText primary="Coupon Frequency" secondary={bond?.coupon_payout} />
        </Box>
      </Stack>
      <BondEditDailog open={editBond.value} currentBond={bond} onClose={editBond.onFalse} />
      <BondAMCEditDailog
        open={editAMC.value}
        currentAMC={amc}
        onClose={editAMC.onFalse}
        bond_id={bond.bond_id}
      />
    </Stack>
  );
};

export default BondDetails;
