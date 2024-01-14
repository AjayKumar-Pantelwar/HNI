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
import { MLD } from 'src/types/mlds.types';
import { fDate } from 'src/utils/format-time';

type Props = {
  selected?: boolean;
  row: MLD;
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

      <TableCell>{row?.mld_name}</TableCell>
      <TableCell>{row?.min_investment}</TableCell>
      <TableCell>{row?.yield}</TableCell>
      <TableCell>{row?.description}</TableCell>
      <TableCell>{fDate(row?.maturity_date)}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton component={Link} href={paths.dashboard.mlds.edit(row.id)} sx={{ py: 0 }}>
            <ModeEditOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
