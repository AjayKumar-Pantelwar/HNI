'use client';

import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar, Box, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import Link from 'next/link';
// import { usePerm } from 'src/hooks/use-perm';
import { paths } from 'src/routes/paths';
import { MldElement } from 'src/types/mlds.types';
import { fDate } from 'src/utils/format-time';

type Props = {
  selected?: boolean;
  row: MldElement;
  onSelectRow?: VoidFunction;
};

export default function MLDsTableRow({ row, selected, onSelectRow }: Props) {
  // const { adminManagementPerm } = usePerm();

  return (
    <TableRow hover selected={selected}>
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={row.mld.name}
            src={row.amc.amc_logo || '/assets/profile-icon.png'}
            sx={{ mr: 2 }}
          />
          <ListItemText
            primary={row.mld.name}
            secondary={row.mld.mld_id}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </Box>
      </TableCell>
      <TableCell>{row?.mld?.min_investment}</TableCell>
      <TableCell>{row?.mld?.yield}</TableCell>
      {/* <TableCell>{row?.mld?.description}</TableCell> */}
      <TableCell>{fDate(row?.mld?.maturity_date)}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick View" placement="top" arrow>
          <IconButton
            component={Link}
            href={paths.dashboard.mlds.view(row?.mld?.mld_id)}
            sx={{ py: 0 }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton
            component={Link}
            href={paths.dashboard.mlds.view(row.mld.mld_id)}
            sx={{ py: 0 }}
          >
            <ModeEditOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
