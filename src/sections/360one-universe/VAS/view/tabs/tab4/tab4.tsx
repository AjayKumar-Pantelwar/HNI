'use client';

import { Box, IconButton, List, ListItemText, Stack, Typography } from '@mui/material';

import EditIcon from 'src/assets/icons/edit-icon';
import { useBoolean } from 'src/hooks/use-boolean';

import { CriteriaDatum, VASData } from 'src/types/unverise/vas.types';
import EditCriteriaDetails from './edit-criteria-details';
import EditDetails from './edit-details';

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

  const editDetails = useBoolean();

  return (
    <Stack sx={{ p: 3, gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="h5">{data?.product_label}</Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <img src="/logo/360logo.png" alt="360One" width={40} height={40} />
        </Box>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'end',
            gap: 1,
            flex: 1,
            p: 2,
          }}
        >
          <List component={Stack} sx={{ flex: 1, gap: 2 }}>
            <ListItemText
              primary={data?.concept_section?.concept_title}
              secondary={data?.concept_section?.concept_description}
            />
            <ListItemText
              primary={data?.advantage_section?.advantage_title}
              secondary={data?.advantage_section?.advantage_description}
            />
          </List>
          <IconButton onClick={() => editDetails.onTrue()}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Stack sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{data?.criteria?.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {data?.criteria?.sub_title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {data?.criteria?.data?.map((item, i) => (
            <CriteriaCard item={item} key={i} />
          ))}
        </Box>
      </Stack>
      <EditDetails
        open={editDetails.value}
        onClose={editDetails.onFalse}
        concept={data?.concept_section}
        advantage={data?.advantage_section}
      />
    </Stack>
  );
};

export default VASTab4;

interface CardProps {
  item: CriteriaDatum;
}

const CriteriaCard = (props: CardProps) => {
  const { item } = props;
  const editCriteria = useBoolean();
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'end',
        gap: 2,
        p: 2,
      }}
    >
      <Stack gap={1}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {item.card_data.map((c) => (
            <Stack>
              <Typography variant="subtitle2">{c.heading}</Typography>
              <Typography variant="h5">{c.data}</Typography>
            </Stack>
          ))}
        </Box>
        <Typography color="text.secondary" variant="subtitle2">
          {item.description}
        </Typography>
      </Stack>
      <IconButton onClick={() => editCriteria.onTrue()}>
        <EditIcon />
      </IconButton>
      <EditCriteriaDetails open={editCriteria.value} onClose={editCriteria.onFalse} card={item} />
    </Box>
  );
};
