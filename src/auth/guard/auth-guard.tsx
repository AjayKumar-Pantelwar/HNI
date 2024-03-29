import { useEffect, useCallback, useState } from 'react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useSelector } from 'src/redux/store';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      const href = `${paths.auth.login}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
