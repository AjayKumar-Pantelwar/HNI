'use client';

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
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { AdminRequest, AdminRequestSchema } from 'src/types/admin.types';

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: AdminRequest;
  defaultFilters: AdminRequest;
  onFilters: (appliedFilters: AdminRequest) => void;
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
  const defaultValues = useMemo(
    () => ({
      ...defaultFilters,
    }),
    [defaultFilters]
  );

  const methods = useForm<AdminRequest>({
    defaultValues,
    resolver: yupResolver<AdminRequest>(AdminRequestSchema),
  });

  const handleSubmit = methods.handleSubmit((values) => {
    onFilters(values);
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
        <IconButton
          onClick={() => {
            onResetFilters();
            methods.reset();
          }}
        >
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
