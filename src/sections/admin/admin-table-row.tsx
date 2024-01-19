'use client';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
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
// import { usePerm } from 'src/hooks/use-perm';
import { roleApi } from 'src/redux/api/role.api';
import { Admin } from 'src/types/admin.types';
import { titleCase } from 'src/utils/change-case';
import AdminBlockForm from './admin-block-form';
import AdminQuickEditForm from './admin-quick-edit-form';
import AdminRoleForm from './admin-role-form';

interface Props {
  selected?: boolean;
  row: Admin;
  onSelectRow?: VoidFunction;
}

export default function AdminTableRow(props: Props) {
  const { row, selected, onSelectRow } = props;

  const { data: rolesData } = roleApi.useRolesQuery();

  const quickEdit = useBoolean();

  // const { adminManagementPerm } = usePerm();

  const block = useBoolean();

  const popover = usePopover();

  const rolePopover = useBoolean();

  function getRole(id: string) {
    return rolesData?.data?.find((r) => r.rid === id)?.rname.toLocaleUpperCase() || 'Admin';
  }

  const role = getRole(row.rid);

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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.username}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography noWrap variant="body2">
              {titleCase(role)}
            </Typography>
            <IconButton sx={{ p: 0 }} onClick={rolePopover.onTrue}>
              <EditIcon />
            </IconButton>
          </Box>
        </TableCell>

        <TableCell>
          <Label variant="soft">{row.is_blocked ? ' blocked' : 'active'}</Label>
        </TableCell>
        <TableCell>
          {row.is_password_change_required ? (
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

      <AdminRoleForm
        currentAdmin={row}
        open={rolePopover.value}
        onClose={rolePopover.onFalse}
        roles={rolesData}
      />

      <AdminQuickEditForm
        currentAdmin={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        isRm={role === 'RM'}
      />
      <AdminBlockForm currentAdmin={row} open={block.value} onClose={block.onFalse} />

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
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        {/* )} */}
        <MenuItem
          onClick={() => {
            block.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="carbon:warning-filled" />
          {row?.is_blocked ? 'Unblock' : 'Block'}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
