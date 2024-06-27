'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ResearchCard, ResearchRecord } from 'src/types/content-management/research.types';
import DeleteCardModal from '../delete-card-modal';
import AddSpeakerModal from './add-speaker';

interface Props {
  card: ResearchCard;
  page: ResearchRecord;
}

export const VideoDesignListTableRow = (props: Props) => {
  const { card, page } = props;
  const popover = usePopover();

  const quickEdit = useBoolean();

  const deleteEntry = useBoolean();

  // const [imageUrl, setImageUrl] = useState('');
  // const [logo, setLogo] = useState('');

  // const mounted = useMounted();

  // useEffect(() => {
  //   if (!mounted) return;
  //   async function handleImageLink() {
  //     if (card?.image_link) {
  //       convertUrlToFile(card?.image_link).then((file) => {
  //         const url = file ? URL.createObjectURL(file) : '';
  //         setImageUrl(url);
  //       });
  //     }
  //     if (card?.logo) {
  //       convertUrlToFile(card?.image_link).then((file) => {
  //         const url = file ? URL.createObjectURL(file) : '';
  //         setLogo(url);
  //       });
  //     }
  //   }
  //   handleImageLink();
  // }, [card?.image_link, card?.logo, mounted]);

  return (
    <TableRow>
      <TableCell>
        <img src={card?.image_link} alt={card?.title} width={40} height={40} />
      </TableCell>
      <TableCell>{card?.title}</TableCell>
      <TableCell>{card?.text}</TableCell>
      <TableCell>{card?.sub_text1}</TableCell>
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
      <AddSpeakerModal page={page} card={card} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <DeleteCardModal
        open={deleteEntry.value}
        onClose={deleteEntry.onFalse}
        cardId={card?.card_id}
      />
    </TableRow>
  );
};
