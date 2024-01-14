// @ts-nocheck

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
// @mui
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// routes
import { useRouter } from 'src/routes/hook';
// types
// components
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchNotFound from 'src/components/search-not-found';
import { Admin } from 'src/types/admin.types';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: Admin[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
};

export default function AdminSearch({ query, results, onSearch, hrefItem }: Props) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectProduct = results.filter((admin) => admin.name === query)[0];

        handleClick(selectProduct.aid);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.aid === value.aid}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, admin, { inputValue }) => {
        const matches = match(admin.name, inputValue);
        const parts = parse(admin.name, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(admin.aid)} key={admin.aid}>
            <Avatar
              key={admin.aid}
              alt={admin.name}
              variant="rounded"
              sx={{ width: 48, height: 48, flexShrink: 0, mr: 1.5, borderRadius: 1 }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}
