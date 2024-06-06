import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from 'src/assets/icons/edit-icon';
import { useBoolean } from 'src/hooks/use-boolean';
import { List } from 'src/types/unverise/landing-page';
import EditListModal from './edit-list-modal';

interface Props {
  list: List[];
}

const LandingPageList = (props: Props) => {
  const { list } = props;

  return (
    <Card sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="subtitle1">Lists</Typography>
        <Grid container spacing={3}>
          {list?.map((l) => (
            <ListCard key={l.product_category} list={l} />
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};

export default LandingPageList;

interface ListProps {
  list: List;
}

const ListCard = (props: ListProps) => {
  const { list: l } = props;
  const edit = useBoolean();

  return (
    <Grid key={l.product_category} item xs={12} md={6} sx={{ minHeight: '65px' }}>
      <Box sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <img
            style={{ objectFit: 'cover' }}
            src={l?.product_img}
            height={65}
            width={58}
            alt={l.product_category}
          />
          <Typography variant="subtitle2" sx={{ flex: 1 }}>
            {l?.product_category}
          </Typography>
          <IconButton onClick={edit.onTrue}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <EditListModal open={edit.value} onClose={edit.onFalse} listItem={l} />
    </Grid>
  );
};
