// @mui
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//
import { Admin } from 'src/types/admin.type';
import AdminBlockForm from './admin-block-form';
import AdminQuickEditForm from './admin-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: Admin;
  onSelectRow: VoidFunction;
};

export default function AdminTableRow({ row, selected, onEditRow, onSelectRow }: Props) {
  const quickEdit = useBoolean();

  const block = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row.name} sx={{ mr: 2 }} />

          <ListItemText
            primary={row.name}
            secondary={row.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.mobile_number}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.username}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.type}</TableCell>

        <TableCell>
          <Label variant="soft">{row.is_blocked ? ' blocked' : 'active'}</Label>
        </TableCell>

        <TableCell>
          {!row.is_pwd_change_required && row.is_totp_activated
            ? 'All good'
            : !row.is_totp_activated && row.is_pwd_change_required
            ? 'Password and TOTP change required'
            : !row.is_totp_activated
            ? 'TOTP activation required'
            : 'Password change required'}
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {/* <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip> */}

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <AdminQuickEditForm currentAdmin={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <AdminBlockForm currentAdmin={row} open={block.value} onClose={block.onFalse} />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            block.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="carbon:warning-filled" />
          Block
        </MenuItem>
      </CustomPopover>
    </>
  );
}
