'use client';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// import { usePerm } from 'src/hooks/use-perm';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from 'src/assets/icons/edit-icon';
import { useBoolean } from 'src/hooks/use-boolean';
import { Carousel } from 'src/types/carousel.types';
import CarouselEditModal from './carousel-edit-modal';

interface Props {
  selected?: boolean;
  row: Carousel;
  onSelectRow?: VoidFunction;
  index: number;
}

export default function CarouselTableRow(props: Props) {
  const { row, selected, onSelectRow, index } = props;

  const edit = useBoolean();

  return (
    <TableRow hover selected={selected} key={index}>
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}
      <TableCell>
        <DragIndicatorIcon />
      </TableCell>
      <TableCell>
        <img
          src={row.media_url}
          height={100}
          width={70}
          alt={row.title}
          style={{ objectFit: 'cover' }}
        />
      </TableCell>
      <TableCell>
        <img src={row.icon} height={50} width={50} alt={row.title} style={{ objectFit: 'cover' }} />
      </TableCell>

      <TableCell>{row.title}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton onClick={() => edit.onTrue()} sx={{ py: 0 }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <CarouselEditModal open={edit.value} onClose={edit.onFalse} currentCarousel={row} />
    </TableRow>
  );
}
