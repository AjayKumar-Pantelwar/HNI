// @mui
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//
import { Admin } from 'src/types/admin.types';
import { Deal } from 'src/types/deals.types';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: Deal;
  onSelectRow: VoidFunction;
};

export default function DealTableRow({ row, selected, onEditRow, onSelectRow }: Props) {
  const router = useRouter();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.deal_name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.brand_name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company_name}</TableCell>

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
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.edit(row.deal_id));
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.pitch(row.deal_id));
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Pitch
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.media(row.deal_id));
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Media
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.highlights(row.deal_id));
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Highlights
        </MenuItem>
      </CustomPopover>
    </>
  );
}
