import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { ItemsProduct } from 'src/types/unverise/landing-page';
import * as Yup from 'yup';

interface Props {
  product: ItemsProduct;
  open: boolean;
  onClose: () => void;
}

const EditProductsModal = (props: Props) => {
  const { product, onClose, open } = props;
  const listSchema = Yup.object().shape({
    product_name: Yup.string().required('Required'),
    product_logo: Yup.string().required('Required'),
  });
  const defaultValues = {
    product_name: product?.product_name || '',
    product_logo: product?.product_logo || '',
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

  const image = watch('product_logo');

  const handleFileChangePerm = (file: File | null) => {
    setValue('product_logo', file as any);
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
          <Typography variant="h5">Edit Product</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack sx={{ gap: 2 }}>
              <RHFTextField name="product_name" label="Product Category" />
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

export default EditProductsModal;
