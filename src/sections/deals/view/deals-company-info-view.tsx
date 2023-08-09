'use client';

import { Box, Button, Container, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

import { dealApi } from 'src/redux/api/deal.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { CompanyInfoRequest } from 'src/types/deals.types';
import { fDate, pDate } from 'src/utils/format-time';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertToFD } from 'src/utils/convert-fd';
import { enqueueSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import DealAccountInfoForm from '../deal-account-info-form';

const DealsCompanyInfoView = () => {
  const settings = useSettingsContext();

  const params = useParams();

  const { data: deals } = dealApi.useDealQuery({
    deal_id: params.id,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Company Info"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'List', href: paths.dashboard.deals.list },
          { name: 'Company Info' },
        ]}
        action={
          deals &&
          deals?.data?.deals?.length === 0 && (
            <Button
              component={RouterLink}
              href={paths.dashboard.deals.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Deal
            </Button>
          )
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {deals?.data.deals[0].company_info && (
        <DealAccountInfoForm companyInfo={deals.data.deals[0].company_info} id={params.id} />
      )}
    </Container>
  );
};

export default DealsCompanyInfoView;
