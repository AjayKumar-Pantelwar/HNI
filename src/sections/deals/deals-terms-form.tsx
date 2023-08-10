'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hook';
// types
import { dealApi } from 'src/redux/api/deal.api';
import { CreateDealTerms, Deal, DealTermsScehma, RoundType } from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  currentDeal?: Deal;
};

// "ask_from_ma": "30000000",
//     "is_active": false,
//     "raised_in_perc": "0",
//     "min_investment": 100000,
//     "externally_raised": 10000000,
//     "valuation": "300000000",
//     "round_size": "70000000",
//     "round_type": "seed",
//     "round_instrument": "ccps",
//     "valuation_type": "variable",
//     "subscription_in_perc": "40",
//     "floor": "1230000",
//     "cap": "2400000",

export default function DealsTermsForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [createDeal] = dealApi.useCreateDealMutation();
  const [editDeal] = dealApi.useEditDealMutation();

  const defaultValues = useMemo<CreateDealTerms>(
    () => ({
      ask_from_ma: currentDeal?.round?.ask_from_ma || '',
      is_active: currentDeal?.round?.is_active || true,
      raised_in_perc: currentDeal?.round?.raised_in_perc || '',
      min_investment: currentDeal?.round?.min_investment || 0,
      externally_raised: currentDeal?.round?.externally_raised || 0,
      valuation: currentDeal?.round?.valuation || '',
      round_size: currentDeal?.round?.round_size || '',
      round_type: currentDeal?.round?.round_type || RoundType.PRE_SEED,
      round_instrument: currentDeal?.round?.round_instrument || '',
      valuation_type: currentDeal?.round?.valuation_type || '',
      subscription_in_perc: currentDeal?.round?.subscription_in_perc || '',
      floor: currentDeal?.round?.floor || '',
      cap: currentDeal?.round?.cap || '',
      disc_matrix: currentDeal?.round?.disc_matrix || [],
      cap_table: currentDeal?.round?.cap_table || [],
      co_investors: currentDeal?.round?.co_investors || [],
      deal_price: currentDeal?.round?.deal_price || [
        {
          title: 'Management Fee',
          perc: '2',
          info: '',
        },
        {
          title: 'Carry',
          perc: '10',
          info: '',
        },
      ],
      rules_of_allocation: currentDeal?.round?.rules_of_allocation || [],
      note: currentDeal?.round?.note || '',
      read_qualification_criteria_link: currentDeal?.round?.read_qualification_criteria_link || '',
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver<CreateDealTerms>(DealTermsScehma),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
    }
  }, [currentDeal, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = convertToFD(data);
      if (currentDeal) {
        await editDeal({ id: currentDeal.deal_id, body: formData }).unwrap();
      } else {
        await createDeal(formData).unwrap();
      }
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
      router.push(paths.dashboard.deals.list);
    } catch (error) {
      handleError(error);
    }
  });

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Basic Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter basic details of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Basic Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="ask_from_ma" label="Ask from MA" />
            <RHFTextField name="raised_in_perc" label="Raised in Percentage" />
            <RHFTextField name="min_investment" label="Minumum Investment" />
            <RHFTextField name="externally_raised" label="Externally Raised" />

            <RHFTextField name="round_size" label="Round Size" />
            <RHFTextField name="valuation" label="Valuation" />
            <RHFTextField name="round_instrument" label="Round Instrument" />
            <RHFTextField name="externally_raised" label="Externally Raised" />

            {/* <RHFMultiSelect
              fullWidth
              name="valuation_type"
              label="Valuation Type"
              onlyOne
              options={Object.values(ValuationType).map((value) => ({
                value,
                label: value.split('_').map(capitalize).join(' '),
              }))}
              chip
              checkbox
            /> */}

            <RHFTextField name="subscription_in_perc" label="Subscription in percentage" />
            <RHFTextField name="floor" label="Floor" />
            <RHFTextField name="cap" label="Cap" />
            <RHFTextField name="deal_price" label="Deal Price" />
            <RHFTextField name="note" label="Note" />
            <RHFTextField
              name="read_qualification_criteria_link"
              label="Qualification Criteria Link"
            />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {sectionOne}
      </Grid>
    </FormProvider>
  );
}
