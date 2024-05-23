import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from 'src/assets/icons/edit-icon';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from 'src/assets/icons/delete-icon';
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

const VASTab3 = (props: Props) => {
  const { data } = props;

  const [product, setProduct] = useState(data?.insurances?.[0]?.product_id);

  console.log(data);

  return (
    <Stack sx={{ m: 3, gap: 3, minHeight: '100%' }}>
      <Stack sx={{ gap: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="h5">{data?.product_label}</Typography>
          <IconButton onClick={() => null}>
            <EditIcon />
          </IconButton>
        </Box>
        <Select value={product} onChange={(e) => setProduct(e.target.value)}>
          {data?.insurances?.map((t, i) => (
            <MenuItem key={i} value={t.product_id}>
              {t.product_label}
            </MenuItem>
          ))}
          <Box sx={{ width: '100%' }}>
            <Button fullWidth startIcon={<AddIcon />}>
              Add Plan
            </Button>
          </Box>
        </Select>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        {data?.insurances
          ?.filter((f) => f.product_id === product)?.[0]
          ?.items?.map((t, i) => (
            <Accordion sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <img src={t.insurance_icon} alt={t.insurance_name} height={30} width={30} />
                  <Typography variant="subtitle1">{t.insurance_name}</Typography>
                  <IconButton onClick={() => null}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">{t.insurance_section1_title}</Typography>
                    <IconButton onClick={() => null}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="body1">{t.insurance_description}</Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">{t.insurance_section2_title}</Typography>
                      <IconButton onClick={() => null}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                    <Button startIcon={<AddIcon />}>Add New Benefit</Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {t.plan_benefit.map((b, j) => (
                      <Box
                        key={j}
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          flexBasis: '300px',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'end' }}>
                          <Stack gap={1}>
                            <img
                              src={b.benefit_icon}
                              height={25}
                              width={25}
                              alt={b.benefit_description}
                            />
                            <Typography variant="body1">{b.benefit_description}</Typography>
                          </Stack>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => null}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => null}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Stack gap={2}>
                      <Typography variant="subtitle1">Benefits</Typography>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'end' }}>
                          <List>
                            {t.benefits.map((p) => (
                              <ListItem key={p.title}>
                                <ListItemIcon sx={{ fontSize: 20 }}>*</ListItemIcon>
                                <Typography>{p.title}</Typography>
                              </ListItem>
                            ))}
                          </List>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack gap={2}>
                      <Typography variant="subtitle1">Footer</Typography>
                      <Box
                        sx={{ p: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}
                      >
                        <Box sx={{ display: 'flex', height: '100%' }}>
                          <Typography variant="body1">{t.insurance_note}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'end' }}>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button startIcon={<AddIcon />}>Add New Insurance </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default VASTab3;
