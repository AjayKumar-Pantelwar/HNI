import { SelectChangeEvent, TextField, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
// import { constantApi } from 'src/redux/api/constant.api';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import React, { ChangeEvent, ReactNode } from 'react';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { AdminActionRequest } from 'src/types/admin.types';

type Props<T> = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  filters: T;
  defaultFilters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  canReset: boolean;
};

export default function ActionsFilters({
  open,
  onOpen,
  onClose,
  filters,
  defaultFilters,
  setFilters,
  canReset,
}: Props<AdminActionRequest>) {
  const [currentFilters, setCurrentFilters] = React.useState<AdminActionRequest>(filters);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(currentFilters);
  };

  // const { data: constantsData } = constantApi.useConstantsQuery();

  const getFilterProps = (key: keyof typeof currentFilters) => ({
    value: currentFilters[key] || '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    },
  });

  const getSelectProps = (key: keyof typeof currentFilters) => ({
    value: currentFilters[key] || '',
    onChange: (e: SelectChangeEvent<string | number>, child: ReactNode) => {
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
        sx={{ display: 'flex', justifyContent: 'end', width: { xs: '100%', sm: 'auto' } }}
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
            <TextField name="action_id" label="Action ID" {...getFilterProps('action_id')} />
            <TextField name="source_id" label="Source ID" {...getFilterProps('source_id')} />
            {/* {constantsData && (
              <TextField select name="event" label="Event Type" {...getFilterProps('event_type')}>
                {Object.entries(constantsData?.data?.event_type).map((key) => (
                  <MenuItem key={key[0]} value={key[0]}>
                    {key[1].Label}
                  </MenuItem>
                ))}
              </TextField>
            )} */}

            <Button type="submit" variant="contained">
              Apply Filters
            </Button>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
