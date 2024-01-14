'use client';

import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
// import { usePerm } from 'src/hooks/use-perm';
import { paths } from 'src/routes/paths';
import { Bond } from 'src/types/bonds.types';
import { fDate } from 'src/utils/format-time';

type Props = {
  selected?: boolean;
  row: Bond;
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

      <TableCell>{row?.bond_name}</TableCell>
      <TableCell>{row?.min_investment}</TableCell>
      <TableCell>{row?.yield}</TableCell>
      <TableCell>{row?.description}</TableCell>
      <TableCell>{fDate(row?.maturity_date)}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton component={Link} href={paths.dashboard.mlds.edit(row.bond_id)} sx={{ py: 0 }}>
            <ModeEditOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
