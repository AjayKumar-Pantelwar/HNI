import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectProps } from '@mui/material/Select';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';
import { useState } from 'react';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  label,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <Typography variant="caption" fontWeight={500} color="text.secondary">
            {label}
          </Typography>
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    }),
                    ...PaperPropsSx,
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          >
            {children}
          </TextField>
        </Stack>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  onlyOne?: boolean;
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  onlyOne,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const [open, setOpen] = useState(false);

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx} fullWidth={other.fullWidth}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            onChange={(e, child) => {
              if (onlyOne) {
                if (e.target.value.length) e.target.value = [e.target.value.pop()];
                setOpen(false);
                field.onChange(e, child);
              } else {
                field.onChange(e, child);
              }
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem disabled value="">
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem key={option.value} value={option.value}>
                  {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText className="ajay" error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
