import { MenuItem, TextField, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useRoleAdmin } from 'src/hooks/admin/use-role-admin';
import { GetInvestorsRequest } from 'src/types/investor.types';

type Props<T> = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  filters: T;
  defaultFilters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  canReset: boolean;
};

export default function InvestorFilters({
  open,
  onOpen,
  onClose,
  filters,
  defaultFilters,
  setFilters,
  canReset,
}: Props<GetInvestorsRequest>) {
  const { data } = useRoleAdmin('rm');

  const [currentFilters, setCurrentFilters] = React.useState<GetInvestorsRequest>(filters);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(currentFilters);
  };

  const getFilterProps = (key: keyof typeof currentFilters) => ({
    value: currentFilters[key] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    },
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
            setCurrentFilters(defaultFilters);
            setFilters(defaultFilters);
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
          sx: { width: 280 },
        }}
      >
        {renderHead}
        <Divider />
        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3} component="form" onSubmit={onSubmit}>
            <TextField name="cid" label="ID" {...getFilterProps('cid')} />
            <TextField name="email" label="Email" {...getFilterProps('email')} />
            <TextField
              name="mobile_number"
              label="Mobile Number"
              {...getFilterProps('mobile_number')}
            />
            <TextField name="pan_number" label="PAN Number" {...getFilterProps('pan_number')} />
            {data?.data?.admins && (
              <TextField select name="irm_id" label="RM" {...getFilterProps('irm_id')}>
                {data.data.admins.map((admin) => (
                  <MenuItem key={admin.aid} value={admin.aid}>
                    {admin.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              select
              name="is_subscribed"
              label="Subscription"
              {...getFilterProps('is_subscribed')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Subscribed</MenuItem>
              <MenuItem value="false">Not Subscribed</MenuItem>
            </TextField>
            <Button type="submit">Apply Filters</Button>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
