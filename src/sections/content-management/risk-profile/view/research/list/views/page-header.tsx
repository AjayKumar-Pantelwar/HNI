import Close from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import EditIcon from 'src/assets/icons/edit-icon';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { researchApi } from 'src/redux/api/research.api';
import { ResearchRecord, UpdatePageRequest } from 'src/types/content-management/research.types';
import { handleError } from 'src/utils/handle-error';

interface Props {
  page: ResearchRecord;
}

const PageHeader = (props: Props) => {
  const { page } = props;
  const defaultValues = {
    heading: page?.heading || '',
    subheading: page?.subheading || '',
    is_downloadable: page?.is_downloadable,
    is_shareable: page?.is_shareable,
    type: page?.type,
  };

  const { enqueueSnackbar } = useSnackbar();

  const editHeading = useBoolean();

  const [updatePage] = researchApi.useUpdatePageMutation();

  const [filters, setFilters] = useState(defaultValues);

  async function handleSubmit() {
    try {
      if (page?.tab_id) await updatePage({ body: filters, tab_id: page?.tab_id }).unwrap();
      enqueueSnackbar('Update success!');
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    if (
      JSON.stringify(defaultValues) !== JSON.stringify(filters) &&
      defaultValues.heading === filters.heading
    )
      handleSubmit();
  }, [filters]);

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {page?.heading && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1">{page?.heading}</Typography>
            <IconButton onClick={editHeading.onTrue}>
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
        <Checkbox
          checked={filters?.is_downloadable}
          onChange={(e) => {
            setFilters({ ...filters, is_downloadable: e.target.checked });
          }}
        />
      </Stack>
      <Divider sx={{ height: '100px' }} orientation="vertical" variant="fullWidth" />
      <Stack sx={{ alignItems: 'start' }}>
        <Typography variant="body1" color="text.secondary">
          Shareable
        </Typography>
        <Checkbox
          checked={filters?.is_shareable}
          onChange={(e) => {
            setFilters({ ...filters, is_shareable: e.target.checked });
          }}
        />
      </Stack>
      {editHeading.value && (
        <EditHeading
          open={editHeading.value}
          onClose={editHeading.onFalse}
          filters={filters}
          setFilters={setFilters}
          page={page}
        />
      )}
    </Box>
  );
};

export default PageHeader;

interface HeadingProps {
  filters: UpdatePageRequest;
  setFilters: Dispatch<SetStateAction<UpdatePageRequest>>;
  open: boolean;
  onClose: () => void;
  page: ResearchRecord;
}

const EditHeading = (props: HeadingProps) => {
  const { onClose, open, filters, setFilters, page } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [updatePage] = researchApi.useUpdatePageMutation();

  async function handleSubmit() {
    setIsLoading(true);
    try {
      if (page?.tab_id) await updatePage({ body: filters, tab_id: page?.tab_id }).unwrap();
      enqueueSnackbar('Update success!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '600px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Edit Heading</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Stack sx={{ minHeight: '150px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Heading
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Max Limit: 40 Characters
              </Typography>
            </Box>
            <TextField
              value={filters.heading}
              onChange={(e) => setFilters((prev) => ({ ...prev, heading: e.target.value }))}
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'end', p: 3 }}>
          <LoadingButton
            disabled={!filters?.heading || isLoading}
            loading={isLoading}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Stack>
    </Dialog>
  );
};
