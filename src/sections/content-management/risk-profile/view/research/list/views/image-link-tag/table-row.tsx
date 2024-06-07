import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Button, Chip, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ResearchCard } from 'src/types/content-management/research.types';

import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import AddNewsModal from './add-news';

export const ImageLinkTagTableRow = (card: ResearchCard) => {
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
      <TableCell>
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {card?.tags?.map((c) => (
            <Chip color="info" variant="soft" label={c.value} />
          ))}
        </Stack>
      </TableCell>
      <TableCell>
        <Button startIcon={<LinkIcon />} variant="text" color="info">
          Link
        </Button>
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
      <AddNewsModal card={card} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </TableRow>
  );
};
