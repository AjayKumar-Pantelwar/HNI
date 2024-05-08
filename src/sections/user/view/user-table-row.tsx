import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { Checkbox, IconButton, MenuItem, TableCell, TableRow, Tooltip } from '@mui/material';
import { useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePopover } from 'src/components/custom-popover';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
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
  console.log(open);

  return (
    <TableRow hover selected={selected}>
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}
      <TableCell>{row?.client_name}</TableCell>
      <TableCell>{row?.mobile_number}</TableCell>
      <TableCell>{row?.pan}</TableCell>
      <TableCell>{row?.kyc_mismatch ? 'Yes' : 'No'}</TableCell>
      <TableCell>{row?.aml ? 'Yes' : 'No'}</TableCell>
      <TableCell>{row?.calibre ? 'Yes' : 'No'}</TableCell>
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
          <ModeEditOutlineRoundedIcon />
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
