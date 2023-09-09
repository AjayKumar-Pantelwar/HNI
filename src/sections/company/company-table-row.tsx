'use client';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { Company } from 'src/types/company.types';
import { capitalize } from 'src/utils/change-case';
import { fDate } from 'src/utils/format-time';

interface Props {
  selected?: boolean;
  row: Company;
  onSelectRow?: VoidFunction;
}

export default function CompanyTableRow(props: Props) {
  const { row, selected, onSelectRow } = props;

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {selected && onSelectRow && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        )}

        <TableCell>
          <ListItemText
            primary={row.legal_name}
            secondary={row.description}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.branch_name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(row.form)}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(row.incorporated_date)}</TableCell>

        <TableCell>
          <ListItemText
            primary={row.location.city}
            secondary={`${row.location.state}, ${row.location.country}`}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem component={Link} href={paths.dashboard.company.edit(row.company_id)}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
    </>
  );
}
