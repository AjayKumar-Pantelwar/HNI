import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { MotionContainer, varBounce } from 'src/components/animate';
import { useSelector } from 'src/redux/store';

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  const { user } = useSelector((state) => state.auth);

  const currentRole = user?.username;

  if (currentRole && typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
