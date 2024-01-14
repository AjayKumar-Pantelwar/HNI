import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';
import { titleCase } from 'src/utils/change-case';

type Props<T> = StackProps & {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  canReset: boolean;
  onResetFilters: VoidFunction;
  results: number;
};

export default function FilterResult<T extends object>({
  filters,
  setFilters,
  canReset,
  onResetFilters,
  results,
  ...other
}: Props<T>) {
  const handleRemove = (key: string) => {
    // @ts-ignore
    setFilters((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, k === key ? undefined : v]))
    );
  };

  return (
    <Stack spacing={1.5} flex={1} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {Object.entries(filters)
          .filter(([key, value]) => key !== 'page_no' && key !== 'no_of_records' && value)
          .map(([key, value]) => (
            <Block label={titleCase(key)}>
              <Chip key={key} label={value} size="small" onDelete={() => handleRemove(key)} />
            </Block>
          ))}

        {canReset && (
          <Button color="error" onClick={onResetFilters} startIcon={<ClearIcon />}>
            Clear
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
