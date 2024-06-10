import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ResearchCard } from 'src/types/content-management/research.types';
import AddSpeakerModal from './add-speaker';

interface Props {
  card: ResearchCard;
  type: string;
}

export const VideoDesignListTableRow = (props: Props) => {
  const { card, type } = props;
  const popover = usePopover();

  const quickEdit = useBoolean();

  const deleteEntry = useBoolean();

  return (
    <TableRow>
      <TableCell>
        <img src={card?.image} alt={card?.title} width={40} height={40} />
      </TableCell>
      <TableCell>{card?.title}</TableCell>
      <TableCell>{card?.subtitle}</TableCell>
      <TableCell>{card?.text}</TableCell>
      <TableCell>
        <img src={card?.logo} alt={card?.title} width={40} height={40} />
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
      <AddSpeakerModal
        pageType={type}
        card={card}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
    </TableRow>
  );
};
