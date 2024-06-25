import { Checkbox } from '@mui/material';
import React from 'react';
import { CheckedIcon } from './icons/checked.icon';
import { UncheckedIcon } from './icons/unchecked.icon';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Record<string, any>;
  id?: string;
  name?: string;
  label?: string;
}

export const CustomCheckbox = ({
  checked,
  onChange,
  inputProps,
  id,
  name,
  label,
}: CustomCheckboxProps) => (
  <Checkbox
    checked={checked}
    onChange={onChange}
    sx={{ p: 'unset' }}
    inputProps={{
      id,
      name,
      ...inputProps,
    }}
    checkedIcon={<CheckedIcon />}
    icon={<UncheckedIcon />}
    aria-label={label}
  />
);
