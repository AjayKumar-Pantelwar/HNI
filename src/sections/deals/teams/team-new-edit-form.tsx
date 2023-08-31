'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { dealApi } from 'src/redux/api/deal.api';
import { AddTeamRequest } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  team?: AddTeamRequest & { id: string; image_link: string };
  dealId: string;
};

export default function TeamNewEditForm({ open, onClose, team, dealId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [addTeam] = dealApi.useAddTeamMutation();
  const [editTeam] = dealApi.useEditTeamMutation();

  const NewTeamMember = Yup.object().shape({
    designation: Yup.string().required('Designation is required'),
    file: Yup.mixed().required('File is required').nullable(),
    link: Yup.string().required('Link is required'),
    name: Yup.string().required('Name is required'),
    social: Yup.string().required('Social is required'),
  });

  const defaultValues = useMemo<AddTeamRequest>(
    () => ({
      designation: team?.designation || '',
      file: null,
      link: team?.link || '',
      name: team?.name || '',
      social: team?.social || '',
    }),
    [team]
  );

  const methods = useForm({
    resolver: yupResolver(NewTeamMember),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (team) {
      reset(defaultValues);
      convertUrlToFile(team.image_link)
        .then((file) => {
          setValue(`file`, file);
        })
        .catch(handleError);
    }
  }, [team, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        formData.append(key, data[key]);
      });

      if (team && team.id) {
        await editTeam({ id: dealId, mem_id: team.id, body: formData }).unwrap();
      } else {
        await addTeam({ id: dealId, body: formData }).unwrap();
      }
      reset();
      onClose();
      enqueueSnackbar(team ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('file', newFiles[0], { shouldValidate: true });
    },
    [setValue]
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1} p={2}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {team ? 'Edit Team' : 'Add Team'}
          </Typography>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="designation" label="Designation" />
          <RHFSelect name="social" label="Social">
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="portfolio">Portfolio</MenuItem>
          </RHFSelect>
          <RHFTextField name="link" label="Link" />
          <RHFUploadAvatar
            name="file"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
              </Typography>
            }
          />
          <LoadingButton
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            {!team ? 'Add Team' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}
