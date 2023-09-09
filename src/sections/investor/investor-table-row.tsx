import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { Admin } from 'src/types/admin.types';
import { Investor } from 'src/types/investor.types';
import { titleCase } from 'src/utils/change-case';
import { AssignRMDialog } from './assign-rm-dialog';

type Props = {
  selected?: boolean;
  row: Investor;
  rms?: Admin[];
};

export default function DealTableRow({ row, rms, selected }: Props) {
  const assignRm = useBoolean();

  const rm = rms?.find((admin) => admin.aid === row.irm_id);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.preferred_name} sx={{ mr: 2 }} />

            <ListItemText
              primary={row.preferred_name}
              secondary={row.mobile_number}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
            />
          </Box>
          {row.is_subscribed && (
            <Label
              sx={{ mt: 1 }}
              variant="soft"
              startIcon={<Iconify icon="tdesign:member" />}
              color="info"
            >
              Subscribed
            </Label>
          )}
        </TableCell>

        <TableCell>{titleCase(row.stage)}</TableCell>

        <TableCell>
          {rm ? (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2">{rm.name}</Typography>
              <IconButton sx={{ p: 0 }} onClick={assignRm.onTrue}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Box>
          ) : (
            <Button sx={{ p: 0 }} onClick={assignRm.onTrue}>
              + Add
            </Button>
          )}
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
      </TableRow>

      <AssignRMDialog
        open={assignRm.value}
        onClose={assignRm.onFalse}
        rm={row.irm_id}
        id={row.cid}
      />
    </>
  );
}
