'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from 'src/assets/icons/edit-icon';

import AddIcon from '@mui/icons-material/Add';
import { useBoolean } from 'src/hooks/use-boolean';
import { InsuranceItem, VASData } from 'src/types/unverise/vas.types';
import AddInsuranceModal from './add-insurance-modal';
import InsuranceItemContent from './insurance-item-content';

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

  const addInsurance = useBoolean();

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
            <InsuranceItemCard item={t} key={i} />
          ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => addInsurance.onTrue()} startIcon={<AddIcon />}>
            Add New Insurance{' '}
          </Button>
        </Box>
      </Stack>
      <AddInsuranceModal open={addInsurance.value} onClose={addInsurance.onFalse} />
    </Stack>
  );
};

export default VASTab3;

interface ItemProps {
  item: InsuranceItem;
}

const InsuranceItemCard = (props: ItemProps) => {
  const { item: t } = props;

  const editItem = useBoolean();

  return (
    <Accordion sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <img src={t.insurance_icon} alt={t.insurance_name} height={30} width={30} />
          <Typography variant="subtitle1">{t.insurance_name}</Typography>
          <IconButton onClick={() => editItem.onTrue()}>
            <EditIcon />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <InsuranceItemContent item={t} />
      </AccordionDetails>
      <AddInsuranceModal open={editItem.value} onClose={editItem.onFalse} insuranceItem={t} />
    </Accordion>
  );
};
