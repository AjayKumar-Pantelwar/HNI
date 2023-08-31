'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';

export function DealsConfigView() {
  const settings = useSettingsContext();
  const confirm = useBoolean();

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
