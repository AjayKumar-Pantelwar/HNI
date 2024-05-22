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
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import { VASData, VASItem } from 'src/types/unverise/vas.types';
import EditItemsModal from './edit-items-modal';

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

const VASTab1 = (props: Props) => {
  const { data } = props;

  const addItem = useBoolean();

  const addSpecifications = useBoolean();

  console.log(data);

  return (
    <Stack sx={{ p: 3, gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="h5">{data?.product_label}</Typography>
        <IconButton onClick={() => addSpecifications.onTrue()}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <img src="/logo/360logo.png" alt="360One" width={40} height={40} />
        </Box>
        <List
          component={Stack}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, flex: 1 }}
        >
          {data?.nbfc_specializations?.items?.map((c, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ fontSize: 20 }}>*</ListItemIcon>
              <Typography>{c}</Typography>
            </ListItem>
          ))}
        </List>
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
    </Stack>
  );
};

export default VASTab1;

interface ItemProps {
  item: VASItem;
}

const VASItemCard = (props: ItemProps) => {
  const { item } = props;
  const addNew = useBoolean();

  return (
    <Grid item xs={12} lg={6}>
      <Card sx={{ p: 2, display: 'flex', alignItems: 'end' }}>
        <Stack sx={{ gap: 2 }}>
          <img src={item?.logo} height={30} width={30} alt={item?.title} />
          <Typography variant="subtitle1">{item?.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {item?.sub_title}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <EditIcon onClick={() => addNew.onTrue()} />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
      <EditItemsModal card={item} open={addNew.value} onClose={addNew.onFalse} />
    </Grid>
  );
};
