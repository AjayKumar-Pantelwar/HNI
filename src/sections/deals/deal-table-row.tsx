import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { companyApi } from 'src/redux/api/company.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Admin } from 'src/types/admin.types';
import { Deal } from 'src/types/deals.types';
import { titleCase } from 'src/utils/change-case';
import { fDate } from 'src/utils/format-time';
import { AssignDMDialog } from './assign-dm-dialog';
import { DealStageDialog } from './deal-stage-dialog';
import { DotwDialog } from './dotw-dialog';
import { StatusDialog } from './status-dialog';
import { TrendingDialog } from './trending-dialog';

type Props = {
  selected?: boolean;
  onEditRow: VoidFunction;
  row: Deal;
  dealManagers?: Admin[];
  onSelectRow?: VoidFunction;
};

export default function DealTableRow({
  row,
  selected,
  dealManagers,
  onEditRow,
  onSelectRow,
}: Props) {
  const router = useRouter();
  const editPopover = usePopover();
  const actionPopover = usePopover();

  const trending = useBoolean();
  const status = useBoolean();
  const dotw = useBoolean();
  const assignDm = useBoolean();
  const stage = useBoolean();

  const { data } = companyApi.useCompanyQuery({ company_id: row.company_id });
  const company = data?.data?.company?.[0];

  return (
    <>
      <TableRow hover selected={selected}>
        {selected && onSelectRow && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        )}

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.deal_name} src={row.logo_link} sx={{ mr: 2 }} />
            <ListItemText
              primary={row.deal_name}
              secondary={company?.legal_name}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
            />
          </Box>
          {row.is_deal_of_the_week && (
            <Label
              sx={{ mt: 1 }}
              variant="soft"
              startIcon={<Iconify icon="formkit:week" />}
              color="info"
            >
              Deal of the week
            </Label>
          )}
          {row.is_deal_trending && (
            <Label
              sx={{ mt: 1 }}
              variant="soft"
              startIcon={<Iconify icon="gg:trending" />}
              color="warning"
            >
              Trending
            </Label>
          )}
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography noWrap variant="body2">
              {titleCase(row.stage)}
            </Typography>
            <IconButton sx={{ p: 0 }} onClick={stage.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Box>
        </TableCell>

        <TableCell>
          <Tooltip
            arrow
            placement="top"
            title={row.is_active ? 'Click to unpublish' : 'Click to publish'}
          >
            <IconButton onClick={status.onTrue}>
              {!row.is_active ? (
                <Iconify
                  icon="humbleicons:times-circle"
                  width={20}
                  height={20}
                  color="error.main"
                />
              ) : (
                <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
              )}
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell>
          {row.deal_manager ? (
            <Stack>
              {row.deal_manager.map((id) => {
                const dm = dealManagers?.find((manager) => manager.aid === id);
                return (
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {dm && <Typography variant="body2">{dm.name}</Typography>}
                    <IconButton sx={{ p: 0 }} onClick={assignDm.onTrue}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          ) : (
            <Button sx={{ p: 0 }} onClick={assignDm.onTrue}>
              + Add
            </Button>
          )}
        </TableCell>

        <TableCell>
          <Box>Start: {fDate(row.start_date)}</Box>
          <Box>End: {fDate(row.end_date)}</Box>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(row.created_at), 'dd MMM yyyy')}
            secondary={format(new Date(row.created_at), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

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
        sx={{ width: 190 }}
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

      <AssignDMDialog
        open={assignDm.value}
        onClose={assignDm.onFalse}
        dealManagers={row.deal_manager}
        id={row.deal_id}
      />

      <DealStageDialog
        open={stage.value}
        onClose={stage.onFalse}
        stage={row.stage}
        id={row.deal_id}
      />

      <StatusDialog
        open={status.value}
        onClose={status.onFalse}
        id={row.deal_id}
        status={row.is_active}
      />
    </>
  );
}
