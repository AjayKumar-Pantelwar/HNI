'use client';

// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
// types
// components
import Iconify from 'src/components/iconify';
import { AdminRequest } from 'src/types/admin.types';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: AdminRequest;
  defaultFilters: AdminRequest;
  onFilters: (name: keyof AdminRequest, value: string) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
};

export default function AdminFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  defaultFilters,
  onFilters,
  //
  canReset,
  onResetFilters,
}: Props) {
  const AdminRequestSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string(),
    mobile_number: Yup.string(),
    is_blocked: Yup.string(),
    name: Yup.string(),
    rid: Yup.string(),
  });

  const methods = useForm({
    defaultValues: {
      ...defaultFilters,
      is_blocked: 'all',
    },
    resolver: yupResolver(AdminRequestSchema),
  });

  const handleSubmit = methods.handleSubmit((values) => {
    if (values.username) onFilters('username', values.username);
    if (values.email) onFilters('email', values.email);
    if (values.mobile_number) onFilters('mobile_number', values.mobile_number);
    if (values.is_blocked)
      onFilters('is_blocked', values.is_blocked === 'all' ? '' : values.is_blocked);
    if (values.rid) onFilters('rid', values.rid);
    if (JSON.stringify(values) === JSON.stringify(defaultFilters)) {
      onResetFilters();
    }
    onClose();
  });

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderBody = (
    <Stack sx={{ gap: 2 }}>
      <RHFTextField name="username" label="Username" />
      <RHFTextField name="email" label="Email" />
      <RHFTextField name="mobile_number" label="Mobile Number" />
      <RHFTextField name="rid" label="Role" />
      <RHFSelect name="is_blocked" label="Status">
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="true">Blocked</MenuItem>
        <MenuItem value="false">Not Blocked</MenuItem>
      </RHFSelect>
      <Button type="submit" variant="outlined">
        Apply
      </Button>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280, px: 2, pb: 3 },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          {renderHead}

          <Divider />

          {renderBody}
        </FormProvider>
      </Drawer>
    </>
  );
}
