import { Box, Checkbox, Divider, IconButton, Stack, Typography } from '@mui/material';

import EditIcon from 'src/assets/icons/edit-icon';
import { ResearchRecord } from 'src/types/content-management/research.types';

interface Props {
  page: ResearchRecord;
}

const PageHeader = (props: Props) => {
  const { page } = props;
  return (
    <Box>
      {page?.heading && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">{page?.heading}</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
        </>
      )}
      <Stack sx={{ alignItems: 'start' }}>
        <Typography variant="body1" color="text.secondary">
          Downloadable
        </Typography>
        <Checkbox checked={page?.is_downloadable} />
      </Stack>
      <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
      <Stack sx={{ alignItems: 'start' }}>
        <Typography variant="body1" color="text.secondary">
          Shareable
        </Typography>
        <Checkbox checked={page?.is_shareable} />
      </Stack>
    </Box>
  );
};

export default PageHeader;
