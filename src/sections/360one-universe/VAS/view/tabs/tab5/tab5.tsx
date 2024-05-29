'use client';

import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';

import EditIcon from 'src/assets/icons/edit-icon';

import { useBoolean } from 'src/hooks/use-boolean';
import { VASData } from 'src/types/unverise/vas.types';
import AddBenefitsModal from './add-benefits';
import EditSpecificationsModal from './edit-specifications-modal';

// import { Tab1TableRow } from './table-row';

interface Props {
  data: VASData;
}

const VASTab5 = (props: Props) => {
  const { data } = props;

  const concept = data?.estate_planning;
  const reasons = data?.reasons_why;

  const whyUs = data?.why_use;

  const addSpecifications = useBoolean();
  const addBenefits = useBoolean();

  return (
    <Stack sx={{ m: 3, gap: 3, minHeight: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack gap={2}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="h5">{concept?.label}</Typography>
              <IconButton onClick={() => null}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                p: 2,
                borderRadius: 1,
                flex: 1,
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <Typography variant="body1" sx={{ flex: 1 }}>
                {concept?.description}
              </Typography>
              <IconButton onClick={() => null}>
                <EditIcon />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack gap={2}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="h5">{reasons?.label}</Typography>
              <IconButton onClick={() => null}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                p: 2,
                borderRadius: 1,
                flex: 1,
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <List component={Stack} sx={{ flex: 1 }}>
                {reasons?.items?.map((c, i) => (
                  <ListItem key={i}>
                    <ListItemIcon sx={{ fontSize: 20 }}>*</ListItemIcon>
                    <Typography>{c}</Typography>
                  </ListItem>
                ))}
              </List>
              <IconButton onClick={() => addBenefits.onTrue()}>
                <EditIcon />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Stack sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="h5">{whyUs?.label}</Typography>
          <IconButton onClick={() => null}>
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
              p: 2,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'end',
            }}
          >
            <List component={Stack} sx={{ flex: 1 }}>
              {whyUs?.items?.map((c, i) => (
                <ListItem key={i}>
                  <ListItemIcon sx={{ fontSize: 20 }}>*</ListItemIcon>
                  <Typography>{c}</Typography>
                </ListItem>
              ))}
            </List>
            <IconButton onClick={() => addSpecifications.onTrue()}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Stack>
      <EditSpecificationsModal
        onClose={addSpecifications.onFalse}
        open={addSpecifications.value}
        card={whyUs?.items}
      />
      <AddBenefitsModal onClose={addBenefits.onFalse} open={addBenefits.value} card={reasons} />
    </Stack>
  );
};

export default VASTab5;
