import { Box, Stack, Typography } from '@mui/material';

import { useState } from 'react';
import { useTable } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';

import { VASData } from 'src/types/unverise/vas.types';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'video_name', label: 'Video Name' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: VASData;
}

const VASTab4 = (props: Props) => {
  const { data } = props;

  const [tab, setTab] = useState(1);

  const table = useTable();

  const addNew = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Stack>
        <Typography variant="body1" color="initial">
          Hello Tab 1
        </Typography>
      </Stack>
    </Box>
  );
};

export default VASTab4;
