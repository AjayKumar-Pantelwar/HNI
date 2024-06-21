import {
  Avatar,
  Checkbox,
  Chip,
  IconButton,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import BlockIcon from 'src/assets/icons/block-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import { usePopover } from 'src/components/custom-popover';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { secondaryFont } from 'src/theme/typography';
import { User } from 'src/types/user.types';
import UserBlockForm from './user-block-modal';
import UserEditModal from './user-edit-modal';

interface Props {
  row: User;
  selected?: boolean;
  onSelectRow?: VoidFunction;
}

const UserTableRow = (props: Props) => {
  const { row, selected, onSelectRow } = props;
  const [open, setOpen] = useState(false);

  const popover = usePopover();

  const quickEdit = useBoolean();

  // const { adminManagementPerm } = usePerm();

  const block = useBoolean();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const caliber = row?.is_caliber_user ? 'Yes' : 'No';

  const kyc = row?.is_caliber_user ? '---' : row?.is_kyc_mismatched ? 'Yes' : 'No';

  const aml = row?.is_caliber_user ? '---' : row?.is_aml_present ? 'Yes' : 'No';

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        ...(row?.is_blocked && {
          borderLeft: '2px solid',
          borderColor: 'error.main',
          borderRadius: 1,
        }),
      }}
    >
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={row.name.toLocaleUpperCase()} alt={row.name} sx={{ mr: 2 }} />
        <ListItemText
          primary={row.name}
          secondary={row.email}
          primaryTypographyProps={{
            typography: 'subtitle1',
            fontFamily: secondaryFont.style.fontFamily,
          }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell>{row?.mobile}</TableCell>
      <TableCell>{row?.pan}</TableCell>
      <TableCell>
        <Chip
          variant="soft"
          label={row.is_blocked ? ' blocked' : 'active'}
          color={row.is_blocked ? 'error' : 'success'}
        />
      </TableCell>
      <TableCell>{caliber}</TableCell>
      <TableCell>{kyc}</TableCell>
      <TableCell>{aml}</TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton sx={{ py: 0 }} onClick={popover.onOpen}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </TableCell>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {/* {adminManagementPerm?.edit && ( */}
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <EditIcon />
          Edit
        </MenuItem>
        {/* )} */}
        <MenuItem
          onClick={() => {
            block.onTrue();
            popover.onClose();
          }}
        >
          <BlockIcon />
          {row?.is_blocked ? 'Unblock' : 'Block'}
        </MenuItem>
      </CustomPopover>
      <UserEditModal user={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <UserBlockForm currentUser={row} open={block.value} onClose={block.onFalse} />
    </TableRow>
  );
};

export default UserTableRow;
