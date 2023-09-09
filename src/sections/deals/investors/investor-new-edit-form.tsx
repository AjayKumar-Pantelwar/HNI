'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { dealApi } from 'src/redux/api/deal.api';
import { AddInvestorRequest } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  investor?: AddInvestorRequest & { id: string; image_link: string };
  dealId: string;
};

export default function InvestorNewEditForm({ open, onClose, investor, dealId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [addInvestor] = dealApi.useAddInvestorMutation();
  const [editInvestor] = dealApi.useEditInvestorMutation();

  const NewInvestorSchema = Yup.object().shape({
    designation: Yup.string().required('Designation is required'),
    file: Yup.mixed().required('File is required').nullable(),
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo<AddInvestorRequest>(
    () => ({
      designation: investor?.designation || '',
      file: null,
      name: investor?.name || '',
    }),
    [investor]
  );

  const methods = useForm({
    resolver: yupResolver(NewInvestorSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (investor) {
      reset(defaultValues);
      convertUrlToFile(investor.image_link)
        .then((file) => {
          setValue(`file`, file);
        })
        .catch(handleError);
    }
  }, [investor, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        formData.append(key, data[key]);
      });

      if (investor && investor.id) {
        await editInvestor({ id: dealId, mem_id: investor.id, body: formData }).unwrap();
      } else {
        await addInvestor({ id: dealId, body: formData }).unwrap();
      }
      reset();
      onClose();
      enqueueSnackbar(investor ? 'Update success' : 'Create success', { variant: 'success' });
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
            {investor ? 'Edit Investor' : 'Add Investor'}
          </Typography>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="designation" label="Designation" />
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
            {!investor ? 'Add Investor' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}
