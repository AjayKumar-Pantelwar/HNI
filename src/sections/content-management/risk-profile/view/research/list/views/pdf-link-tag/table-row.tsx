import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Box, Chip, IconButton, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import LinkIcon from 'src/assets/icons/link-icon';
import { useBoolean } from 'src/hooks/use-boolean';
import { ResearchCard, ResearchRecord } from 'src/types/content-management/research.types';
import DeleteCardModal from '../delete-card-modal';
import AddPDFLinkModal from './add-pdf-link-modal';
// import AddReportModal from './add-report-modal';

interface Props {
  card: ResearchCard;
  page: ResearchRecord;
}

export const PDFLinkTagTableRow = (props: Props) => {
  const { card, page } = props;
  const popover = usePopover();

  const quickEdit = useBoolean();
  const deleteEntry = useBoolean();

  return (
    <TableRow>
      <TableCell>
        <img src={card?.image} alt={card?.title} width={40} height={40} />
      </TableCell>
      <TableCell>{card?.title}</TableCell>
      <TableCell>
        <Chip color="primary" variant="soft" label={card?.sub_text1 || '--'} />
      </TableCell>
      <TableCell>
        <Chip
          color="info"
          variant="soft"
          sx={{ cursor: 'pointer' }}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LinkIcon />
              <Typography variant="body1" color="info.dark">
                Link
              </Typography>
            </Box>
          }
        />
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
          <EditIcon />
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
      <AddPDFLinkModal page={page} card={card} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <DeleteCardModal
        open={deleteEntry.value}
        onClose={deleteEntry.onFalse}
        cardId={card?.card_id}
      />
    </TableRow>
  );
};
