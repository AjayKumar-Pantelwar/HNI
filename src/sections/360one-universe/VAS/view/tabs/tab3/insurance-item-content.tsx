import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from 'src/assets/icons/delete-icon';
import EditIcon from 'src/assets/icons/edit-icon';
import { InsuranceItem } from 'src/types/unverise/vas.types';

interface Props {
  item: InsuranceItem;
  edit?: boolean;
}
const InsuranceItemContent = (props: Props) => {
  const { item: t, edit = true } = props;
  return (
    <Stack sx={{ gap: 2 }}>
      {!edit && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={t.insurance_icon} alt={t.insurance_name} height={30} width={30} />
          <Typography variant="subtitle1">{t.insurance_name}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1">{t.insurance_section1_title}</Typography>
        {edit && (
          <IconButton onClick={() => null}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="body1">{t.insurance_description}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1">{t.insurance_section2_title}</Typography>
          {edit && (
            <IconButton onClick={() => null}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        {edit && <Button startIcon={<AddIcon />}>Add New Benefit</Button>}
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
                <img src={b.benefit_icon} height={25} width={25} alt={b.benefit_description} />
                <Typography variant="body1">{b.benefit_description}</Typography>
              </Stack>
              {edit && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => null}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => null}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
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
              {edit && (
                <IconButton>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Stack>
        <Stack gap={2}>
          <Typography variant="subtitle1">Footer</Typography>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%' }}>
              <Typography variant="body1">{t.insurance_note}</Typography>
              {edit && (
                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default InsuranceItemContent;
