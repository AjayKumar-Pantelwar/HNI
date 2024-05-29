import Close from '@mui/icons-material/Close';
import { Box, Divider, Grid, IconButton, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import { PDFUploadData } from 'src/types/product-upload.types';

interface Props {
  open: boolean;
  handleClose: () => void;
  product: PDFUploadData;
}

const EditProductModal = (props: Props) => {
  const { handleClose, open, product } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '600px',
          p: 2,
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h5">PDF Upload</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Product Name</Typography>
              <Typography>{product.product_name}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditProductModal;
