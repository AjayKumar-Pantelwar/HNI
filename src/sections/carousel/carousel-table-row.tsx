'use client';

import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
// import { usePerm } from 'src/hooks/use-perm';
import { paths } from 'src/routes/paths';
import { Carousel } from 'src/types/carousel.types';

interface Props {
  selected?: boolean;
  row: Carousel;
  onSelectRow?: VoidFunction;
  index: number;
  isEditing: boolean;
  onDragStart: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLTableRowElement>) => void;
  onDrop: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
}

export default function CarouselTableRow(props: Props) {
  const { row, selected, onSelectRow, index, isEditing, onDragStart, onDragOver, onDrop } = props;

  return (
    <TableRow
      hover
      selected={selected}
      key={row.id}
      draggable={!isEditing} // Disable dragging when editing
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      {selected && onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell>{row.title.bold}</TableCell>
      <TableCell>{row.subtitle.data}</TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton
            component={Link}
            href={paths.dashboard.roles.edit(row.id.toString())}
            sx={{ py: 0 }}
          >
            <ModeEditOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
