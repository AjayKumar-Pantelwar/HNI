'use client';

import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { Avatar, Box, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
// import { usePerm } from 'src/hooks/use-perm';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { paths } from 'src/routes/paths';
import { BondElement } from 'src/types/bonds.types';
import { fDate } from 'src/utils/format-time';

type Props = {
  selected?: boolean;
  row: BondElement;
  onSelectRow?: VoidFunction;
};

export default function BondsTableRow({ row, selected, onSelectRow }: Props) {
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
            alt={row.bond.bond_name}
            src={row.amc.amc_logo || '/assets/profile-icon.png'}
            sx={{ mr: 2 }}
          />
          <ListItemText
            primary={row.bond.bond_name}
            secondary={row.bond.bond_id}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </Box>
      </TableCell>
      <TableCell>{row?.bond?.min_investment}</TableCell>
      <TableCell>{row?.bond?.yield.toFixed(2)}</TableCell>
      {/* <TableCell>{row?.bond?.description}</TableCell> */}
      <TableCell>{fDate(row?.bond?.maturity_date)}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Quick View" placement="top" arrow>
            <IconButton
              component={Link}
              href={paths.dashboard.bonds.view(row?.bond?.bond_id)}
              sx={{ py: 0 }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton
              component={Link}
              href={paths.dashboard.bonds.edit(row?.bond?.bond_id)}
              sx={{ py: 0 }}
            >
              <ModeEditOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
}
