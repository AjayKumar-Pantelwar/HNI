import { Box, Card, Grid, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from 'src/assets/icons/edit-icon';
import { useBoolean } from 'src/hooks/use-boolean';
import { ItemsProduct, Tab } from 'src/types/unverise/landing-page';
import EditProductsModal from './edit-products-modal';

interface Props {
  products: Tab[];
}

const Products = (props: Props) => {
  const { products } = props;
  const [value, setValue] = useState(products?.[0]?.label);

  const filteredProducts = products?.filter((f) => f.label === value)?.[0];
  return (
    <Card sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ minWidth: '200px' }}
          >
            {products?.map((p) => (
              <MenuItem key={p?.label} value={p?.label}>
                {p?.label}
              </MenuItem>
            ))}
          </Select>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          {filteredProducts?.items?.products?.map((p) => (
            <ProductCard key={p.product_name} product={p} />
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};

export default Products;

interface ProductProps {
  product: ItemsProduct;
}

const ProductCard = (props: ProductProps) => {
  const { product: p } = props;
  const edit = useBoolean();
  return (
    <Grid item xs={12} md={4} lg={6}>
      <Box
        key={p?.product_name}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <Stack sx={{ alignItems: 'start', flex: 1 }}>
            <img
              style={{ objectFit: 'cover' }}
              src={p?.product_logo}
              height={24}
              width={24}
              alt={p.product_name}
            />
            <Typography variant="subtitle2" sx={{ flex: 1 }}>
              {p?.product_name}
            </Typography>
          </Stack>
          <IconButton onClick={edit.onTrue} sx={{ display: 'flex', justifyContent: 'end' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <EditProductsModal open={edit.value} onClose={edit.onFalse} product={p} />
    </Grid>
  );
};
