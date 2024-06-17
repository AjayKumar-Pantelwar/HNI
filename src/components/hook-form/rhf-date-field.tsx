import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import { DateFieldProps, DatePicker } from '@mui/x-date-pickers';
import { fDate, pDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props<TDate> = DateFieldProps<TDate> & {
  name: string;
};

export default function RHFDateField<TDate extends Date>({
  name,
  helperText,
  label,
  ...other
}: Props<TDate>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(field.value, pDate(field.value), fDate(field.value));
        return (
          <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" fontWeight={500} color="text.secondary">
                {label}
              </Typography>
            </Box>
            <DatePicker
              {...field}
              format="dd/MM/yyyy"
              // @ts-ignore
              value={pDate(field.value)}
              onChange={(value) => field.onChange(fDate(value))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error ? error?.message : helperText,
                },
              }}
              {...other}
            />
          </Stack>
        );
      }}
    />
  );
}
