import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { Intro } from 'src/types/unverise/landing-page';
import * as Yup from 'yup';

interface Props {
  intro: Intro;
  open: boolean;
  onClose: () => void;
}

const EditIntroductionModal = (props: Props) => {
  const { intro, onClose, open } = props;
  const introSchema = Yup.object().shape({
    video_url: Yup.mixed().nonNullable().required('Required'),
    video_thumbnail: Yup.mixed().nonNullable().required('Required'),
    topic: Yup.string().required('Required'),
    speaker_name: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    company_name: Yup.string().required('Required'),
    company_logo: Yup.mixed().nonNullable().required('Required'),
  });
  const defaultValues = {
    video_url: intro?.video_url || '',
    video_thumbnail: intro?.video_thumbnail || '',
    topic: intro?.topic || '',
    speaker_name: intro?.speaker_name || '',
    designation: intro?.designation || '',
    company_name: intro?.company_name || '',
    company_logo: intro?.company_logo || '',
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(introSchema),
  });

  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // try {
    //   await createAdmin(data).unwrap();
    //   reset();
    //   enqueueSnackbar(currentAdmin ? 'Update success!' : 'Create success!');
    //   router.push(paths.dashboard.admin.list);
    // } catch (error) {
    //   handleError(error);
    // }
  });

  const video = watch('video_url');

  const handleVideoChangePerm = (file: File | null) => {
    setValue('video_url', file as any);
  };

  const thumbnail = watch('video_thumbnail');

  const handleThumbnailChangePerm = (file: File | null) => {
    setValue('video_thumbnail', file as any);
  };

  const logo = watch('company_logo');

  const handleLogoChangePerm = (file: File | null) => {
    setValue('company_logo', file as any);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '700px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Edit Introduction</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <RHFTextField name="topic" label="Topic Name" />
                  <RHFTextField name="speaker_name" label="Speaker Name" />
                  <RHFTextField name="designation" label="Designation" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Box>
                    {!video ? (
                      <UploadFile
                        uploadAs="JPG"
                        maxFileSize={2}
                        label="Upload Image"
                        handleFileChange={handleVideoChangePerm}
                      />
                    ) : (
                      <PreviewFile
                        label="Product Image"
                        selectedFile={video as any}
                        handleFileChange={handleVideoChangePerm}
                      />
                    )}
                  </Box>
                  <Box>
                    {!thumbnail ? (
                      <UploadFile
                        uploadAs="JPG"
                        maxFileSize={2}
                        label="Upload Image"
                        handleFileChange={handleThumbnailChangePerm}
                      />
                    ) : (
                      <PreviewFile
                        label="Product Image"
                        selectedFile={thumbnail as any}
                        handleFileChange={handleThumbnailChangePerm}
                      />
                    )}
                  </Box>
                  <Box>
                    {!logo ? (
                      <UploadFile
                        uploadAs="JPG"
                        maxFileSize={2}
                        label="Upload Image"
                        handleFileChange={handleLogoChangePerm}
                      />
                    ) : (
                      <PreviewFile
                        label="Product Image"
                        selectedFile={logo as any}
                        handleFileChange={handleLogoChangePerm}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'end', p: 3 }}>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditIntroductionModal;
