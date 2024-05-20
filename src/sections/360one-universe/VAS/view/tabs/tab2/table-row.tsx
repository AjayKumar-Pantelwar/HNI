import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Chip, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import DeleteIcon from '@mui/icons-material/Delete';
import { useBoolean } from 'src/hooks/use-boolean';
import { ResearchCard } from 'src/types/content-management/research.types';
import { identifyFilename } from 'src/utils/identify-file';
// import AddReportModal from './add-report-modal';

export const Tab1TableRow = (card: ResearchCard) => {
  const popover = usePopover();

  const quickEdit = useBoolean();

  const deleteEntry = useBoolean();

  return (
    <TableRow>
      <TableCell>
        <img src={card?.image} alt={card?.title} width={40} height={40} />
      </TableCell>
      <TableCell>{card?.title}</TableCell>
      <TableCell>{identifyFilename(card?.video)}</TableCell>
      <TableCell>
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {card?.tags?.map((c) => (
            <Chip color="info" variant="soft" label={c.value} />
          ))}
        </Stack>
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton sx={{ py: 0 }} onClick={popover.onOpen}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <ModeEditOutlineRoundedIcon />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            deleteEntry.onTrue();
            popover.onClose();
          }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </CustomPopover>
      {/* <AddReportModal card={card} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}
    </TableRow>
  );
};
