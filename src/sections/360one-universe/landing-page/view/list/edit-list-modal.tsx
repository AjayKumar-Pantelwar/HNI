import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { List } from 'src/types/unverise/landing-page';
import * as Yup from 'yup';

interface Props {
  listItem: List;
  open: boolean;
  onClose: () => void;
}

const EditListModal = (props: Props) => {
  const { listItem, onClose, open } = props;
  const listSchema = Yup.object().shape({
    product_category: Yup.string().required('Required'),
    product_img: Yup.string().required('Required'),
  });
  const defaultValues = {
    product_category: listItem?.product_category || '',
    product_img: listItem?.product_img || '',
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(listSchema),
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

  const image = watch('product_img');

  const handleFileChangePerm = (file: File | null) => {
    setValue('product_img', file as any);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '500px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Edit List</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack sx={{ gap: 2 }}>
              <RHFTextField name="product_category" label="Product Category" />
              {!image ? (
                <UploadFile
                  uploadAs="JPG"
                  maxFileSize={2}
                  label="Upload Image"
                  handleFileChange={handleFileChangePerm}
                />
              ) : (
                <PreviewFile
                  label="Product Image"
                  selectedFile={image as any}
                  handleFileChange={handleFileChangePerm}
                />
              )}
            </Stack>
          </FormProvider>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Button variant="contained" fullWidth type="submit">
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditListModal;
