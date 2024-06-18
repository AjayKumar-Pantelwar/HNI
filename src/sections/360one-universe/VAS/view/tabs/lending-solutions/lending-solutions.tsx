'use client';

import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import Star from 'src/assets/icons/star';
import { useSnackbar } from 'src/components/snackbar';
import { VASApi } from 'src/redux/api/vas.api';
import { LendingSolutions, NbfcSpecializations } from 'src/types/unverise/vas.types';
import { handleError } from 'src/utils/handle-error';
import EditTitle from '../../edit-title';
import EditItemsModal from './edit-items-modal';
import EditSpecificationsModal from './edit-specifications-modal';

// import { Tab1TableRow } from './table-row';

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'video_name', label: 'Video Name' },
  { id: 'edit', label: 'Actions', width: 80 },
];

interface Props {
  data: LendingSolutions | undefined;
}

const LendingSolutionsTab = (props: Props) => {
  const { data } = props;

  const { enqueueSnackbar } = useSnackbar();
  const addItem = useBoolean();
  const editTitle = useBoolean();

  const addSpecifications = useBoolean();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(data?.nbfc_specializations?.title || '');

  const [editHeading] = VASApi.useEditLendingSolutionsHeadingMutation();

  async function handleSubmit() {
    setLoading(true);
    try {
      if (data?.product_id && value) {
        await editHeading({ id: data?.nbfc_specializations?.id, title: value }).unwrap();

        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      editTitle.onFalse();
    }
  }
  if (!data) return <></>;
  return (
    <Stack sx={{ p: 3, gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="h5">{data?.nbfc_specializations?.title}</Typography>
        <IconButton onClick={() => editTitle.onTrue()}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Card
          sx={{
            width: 95,
            height: 95,
            borderRadius: 'unset',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <img src={data?.nbfc_specializations?.logo} alt="360One" width={40} height={40} />
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'end',
              gap: 1,
              flexBasis: '95%',
              justifyContent: 'end',
            }}
          >
            <List component={Stack} sx={{ flex: 1, pl: 6 }}>
              {data?.nbfc_specializations?.description?.map((c, i) => (
                <ListItem key={i}>
                  <ListItemIcon sx={{ fontSize: 40 }}>
                    <Star />
                  </ListItemIcon>
                  <Typography>{c}</Typography>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={() => addSpecifications.onTrue()}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {data?.items?.map((c, i) => (
          <VASItemCard item={c} key={i} />
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => addItem.onTrue()} startIcon={<AddIcon />}>
          Add New Item
        </Button>
      </Box>
      <EditItemsModal open={addItem.value} onClose={addItem.onFalse} />
      {data?.nbfc_specializations && (
        <EditSpecificationsModal
          onClose={addSpecifications.onFalse}
          open={addSpecifications.value}
          card={data?.nbfc_specializations}
        />
      )}
      <EditTitle
        open={editTitle.value}
        onClose={editTitle.onFalse}
        value={value}
        setValue={setValue}
        onSubmit={() => handleSubmit()}
        isSubmitting={loading}
      />
    </Stack>
  );
};

export default LendingSolutionsTab;

interface ItemProps {
  item: NbfcSpecializations;
}

const VASItemCard = (props: ItemProps) => {
  const { item } = props;
  const addNew = useBoolean();

  return (
    <Grid item xs={12} lg={6}>
      <Box
        sx={{
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'end',
          borderRadius: 1,
        }}
      >
        <Stack sx={{ gap: 2 }}>
          <img src={item?.logo} height={30} width={30} alt={item?.title} />
          <Typography variant="subtitle1">{item?.title}</Typography>
          {item?.description?.map((d) => (
            <Typography variant="subtitle2" color="text.secondary">
              {d}
            </Typography>
          ))}
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <EditIcon onClick={() => addNew.onTrue()} />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <EditItemsModal card={item} open={addNew.value} onClose={addNew.onFalse} />
    </Grid>
  );
};
