import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href={paths.auth.login} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
