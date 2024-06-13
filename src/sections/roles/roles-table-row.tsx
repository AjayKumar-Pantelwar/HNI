'use client';

import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import EditIcon from 'src/assets/icons/edit-icon';
// import { usePerm } from 'src/hooks/use-perm';
import { paths } from 'src/routes/paths';
import { Role } from 'src/types/role.types';

type Props = {
  selected?: boolean;
  row: Role;
  onSelectRow?: VoidFunction;
};

export default function RolesTableRow({ row, selected, onSelectRow }: Props) {
  // const { adminManagementPerm } = usePerm();

  return (
    <TableRow hover selected={selected}>
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <KeyRoundedIcon width={18} height={18} />

        <ListItemText
          primary={row.rname}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton
            component={Link}
            href={paths.dashboard.admin.roles.edit(row.rid)}
            sx={{ py: 0 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
