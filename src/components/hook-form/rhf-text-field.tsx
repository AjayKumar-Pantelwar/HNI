import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  maxLimitCharacters?: number;
};

export default function RHFTextField({
  name,
  helperText,
  type,
  label,
  maxLimitCharacters,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight={500} color="text.secondary">
              {label}
            </Typography>
            {maxLimitCharacters && (
              <Typography variant="caption" color="text.secondary">
                {`Max Limit: ${maxLimitCharacters} Characters`}
              </Typography>
            )}
          </Box>
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText || ''}
            {...other}
          />
        </Stack>
      )}
    />
  );
}
