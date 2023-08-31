'use client';

import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { roleApi } from 'src/redux/api/role.api';
import { Admin } from 'src/types/admin.types';
import AdminBlockForm from './admin-block-form';
import AdminQuickEditForm from './admin-quick-edit-form';

interface Props {
  selected?: boolean;
  row: Admin;
  onSelectRow?: VoidFunction;
}

export default function AdminTableRow(props: Props) {
  const { row, selected, onSelectRow } = props;

  const { data: rolesData } = roleApi.useRolesQuery();

  const quickEdit = useBoolean();

  const block = useBoolean();

  const popover = usePopover();

  function getRole(id: string) {
    return rolesData?.data?.roles.find((r) => r.rid === id)?.name.toLocaleUpperCase() || 'Admin';
  }

  return (
    <>
      <TableRow hover selected={selected}>
        {selected && onSelectRow && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        )}

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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{getRole(row.rid)}</TableCell>

        <TableCell>
          <Label variant="soft">{row.is_blocked ? ' blocked' : 'active'}</Label>
        </TableCell>
        <TableCell>
          {row.is_pwd_change_required ? (
            <Iconify icon="humbleicons:times-circle" width={20} height={20} color="error.main" />
          ) : (
            <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
          )}
        </TableCell>
        <TableCell>
          {!row.is_totp_activated ? (
            <Iconify icon="humbleicons:times-circle" width={20} height={20} color="error.main" />
          ) : (
            <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
          )}
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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
          disabled
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
