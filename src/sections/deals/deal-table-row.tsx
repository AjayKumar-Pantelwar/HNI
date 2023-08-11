// @mui
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// types
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
//
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Deal } from 'src/types/deals.types';
import { titleCase } from 'src/utils/change-case';
import { fDateTime } from 'src/utils/format-time';
import { DotwDialog } from './dotw-dialog';
import { TrendingDialog } from './trending-dialog';

// ----------------------------------------------------------------------

type Props = {
  selected?: boolean;
  onEditRow: VoidFunction;
  row: Deal;
  onSelectRow?: VoidFunction;
};

export default function DealTableRow({ row, selected, onEditRow, onSelectRow }: Props) {
  const router = useRouter();
  const editPopover = usePopover();
  const actionPopover = usePopover();

  const trending = useBoolean();
  const dotw = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        {selected && onSelectRow && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        )}

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row.deal_name} src={row.logo_link} sx={{ mr: 2 }} />

          <ListItemText
            primary={row.deal_name}
            secondary={row.company_name}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell>{titleCase(row.stage)}</TableCell>

        <TableCell>
          {!row.is_active ? (
            <Iconify icon="humbleicons:times-circle" width={20} height={20} color="error.main" />
          ) : (
            <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
          )}
        </TableCell>
        <TableCell>
          {!row.is_deal_of_the_week ? (
            <Iconify icon="humbleicons:times-circle" width={20} height={20} color="error.main" />
          ) : (
            <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
          )}
        </TableCell>
        <TableCell>
          {!row.is_deal_trending ? (
            <Iconify icon="humbleicons:times-circle" width={20} height={20} color="error.main" />
          ) : (
            <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
          )}
        </TableCell>

        <TableCell>
          <Box>Start Date: {fDateTime(row.start_date)}</Box>
          <Box>End Date: {fDateTime(row.end_date)}</Box>
        </TableCell>

        <TableCell>{fDateTime(row.created_at)}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={editPopover.open ? 'inherit' : 'default'} onClick={editPopover.onOpen}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton
            color={actionPopover.open ? 'inherit' : 'default'}
            onClick={actionPopover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={editPopover.open}
        onClose={editPopover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.edit(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.pitch(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Pitch
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.media(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Media
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.dataroom(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Dataroom
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.accountInfo(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Company Info
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.deals.terms(row.deal_id));
            editPopover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Deal Terms
        </MenuItem>
      </CustomPopover>

      <CustomPopover
        open={actionPopover.open}
        onClose={actionPopover.onClose}
        arrow="right-top"
        sx={{ width: 180 }}
      >
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            trending.onTrue();
          }}
        >
          <Iconify icon="gg:trending" />
          {row.is_deal_trending ? 'Remove Trending' : 'Add Trending'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            dotw.onTrue();
          }}
        >
          <Iconify icon="formkit:week" />
          Set Deal of the Week
        </MenuItem>
      </CustomPopover>

      <TrendingDialog
        open={trending.value}
        onClose={trending.onFalse}
        id={row.deal_id}
        status={!row.is_deal_trending}
      />

      <DotwDialog open={dotw.value} onClose={dotw.onFalse} id={row.deal_id} />
    </>
  );
}
