import { useCallback, useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard.root);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
