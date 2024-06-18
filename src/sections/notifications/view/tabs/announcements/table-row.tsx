import { IconButton, TableCell, TableRow } from '@mui/material';
import { usePopover } from 'src/components/custom-popover';

import CrossIcon from 'src/assets/icons/cross-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import TickIcon from 'src/assets/icons/tick-icon';
import { useBoolean } from 'src/hooks/use-boolean';
import { Notifications } from 'src/types/notifications.types';
import { fDate } from 'src/utils/format-time';
import AddAnnouncementModal from './add-announcement-modal';

export const Tab1TableRow = (row: Notifications) => {
  const popover = usePopover();

  const quickEdit = useBoolean();

  const deleteEntry = useBoolean();

  return (
    <TableRow>
      <TableCell>{row?.title}</TableCell>
      <TableCell>{row?.subtitle}</TableCell>
      <TableCell>{fDate(row?.from_date)}</TableCell>
      <TableCell>{fDate(row?.to_date)}</TableCell>
      <TableCell>{row?.is_active ? <TickIcon /> : <CrossIcon />}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {/* <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}> */}
        <IconButton
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <EditIcon />
        </IconButton>
        {/* <IconButton
            onClick={() => {
              deleteEntry.onTrue();
              popover.onClose();
            }}
          >
            <DeleteIcon />
          </IconButton> */}
        {/* </Box> */}
      </TableCell>
      <AddAnnouncementModal notification={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </TableRow>
  );
};
