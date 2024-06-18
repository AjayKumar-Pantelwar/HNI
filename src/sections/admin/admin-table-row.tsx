'use client';

import { Box, Chip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
// import { usePerm } from 'src/hooks/use-perm';
import BlockIcon from 'src/assets/icons/block-icon';
import CrossIcon from 'src/assets/icons/cross-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import TickIcon from 'src/assets/icons/tick-icon';
import { roleApi } from 'src/redux/api/role.api';
import { secondaryFont } from 'src/theme/typography';
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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.username}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography noWrap variant="caption" sx={{ fontWeight: 500 }}>
              {titleCase(role)}
            </Typography>
            <IconButton sx={{ p: 0 }} onClick={rolePopover.onTrue}>
              <EditIcon />
            </IconButton>
          </Box>
        </TableCell>

        <TableCell>
          <Chip
            variant="soft"
            label={row.is_blocked ? ' blocked' : 'active'}
            color={row.is_blocked ? 'error' : 'success'}
          />
        </TableCell>
        <TableCell>{row.is_password_change_required ? <CrossIcon /> : <TickIcon />}</TableCell>
        <TableCell>{!row.is_totp_activated ? <CrossIcon /> : <TickIcon />}</TableCell>

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
    </>
  );
}
