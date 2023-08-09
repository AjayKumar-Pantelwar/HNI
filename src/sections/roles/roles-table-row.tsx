// @mui
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
//
import { Role } from 'src/types/role.types';
import Link from 'next/link';
import { paths } from 'src/routes/paths';
import AdminQuickEditForm from './roles-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  selected?: boolean;
  row: Role;
  onSelectRow?: VoidFunction;
};

export default function RolesTableRow({ row, selected, onSelectRow }: Props) {
  return (
    <TableRow hover selected={selected}>
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Iconify icon="fluent-mdl2:permissions-solid" width={18} height={18} />

        <ListItemText
          primary={row.name}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton component={Link} href={paths.dashboard.roles.edit(row.rid)} sx={{ py: 0 }}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
