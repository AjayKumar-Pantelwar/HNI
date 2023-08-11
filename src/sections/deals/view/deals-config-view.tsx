'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
// types
//
import { dealApi } from 'src/redux/api/deal.api';

export function DealsConfigView() {
  const settings = useSettingsContext();
  const router = useRouter();

  const confirm = useBoolean();

  const { data } = dealApi.useDealQuery({});

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Configuration"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Deals', href: paths.dashboard.deals.list },
            { name: 'Configuration' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={<>Are you sure want to set these items as deal of the week?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse();
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
