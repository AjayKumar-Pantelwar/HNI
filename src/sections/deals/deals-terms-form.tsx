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
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hook';
// types
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, IconButton, MenuItem } from '@mui/material';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import { dealApi } from 'src/redux/api/deal.api';
import {
  CreateDealTerms,
  Deal,
  DealTermsScehma,
  RoundInstrument,
  RoundType,
  ValuationType,
} from 'src/types/deals.types';
import { titleCase } from 'src/utils/change-case';
import { handleError } from 'src/utils/handle-error';

type Props = {
  currentDeal: Deal;
};

export default function DealsTermsForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [updateDealTerms] = dealApi.useDealTermsMutation();

  const defaultValues = useMemo<CreateDealTerms>(
    () => ({
      ask_from_ma: currentDeal?.round?.ask_from_ma || '',
      is_active: currentDeal?.round?.is_active || true,
      raised_in_perc: currentDeal?.round?.raised_in_perc || '',
      min_investment: currentDeal?.round?.min_investment || 0,
      externally_raised: currentDeal?.round?.externally_raised || 0,
      valuation: currentDeal?.round?.valuation || '',
      round_size: currentDeal?.round?.round_size || '',
      round_type: currentDeal?.round?.round_type || '',
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
      await updateDealTerms({ id: currentDeal.deal_id, ...data }).unwrap();
      reset();
      enqueueSnackbar('Update success', { variant: 'success' });
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
            Enter basic details of deal terms
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Basic Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFTextField name="round_size" label="Round Size" />
              <RHFTextField name="min_investment" label="Minumum Investment" />
              <RHFTextField name="ask_from_ma" label="Ask from MA" />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFTextField name="subscription_in_perc" label="Subscription in Percentage" />
              <RHFTextField name="externally_raised" label="Externally Raised" />
              <RHFSelect name="round_instrument" label="Round Instrument">
                {Object.values(RoundInstrument).map((value) => (
                  <MenuItem key={value} value={value}>
                    {titleCase(value).toUpperCase()}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionTwo = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Round info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter valuation, floor, cap and discount matrix
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Round Info" />}

          <Stack spacing={2} sx={{ p: 3 }}>
            <RHFSelect name="round_type" label="Round Type">
              {Object.values(RoundType).map((value) => (
                <MenuItem key={value} value={value}>
                  {titleCase(value)}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="valuation_type" label="Valuation Type">
              {Object.values(ValuationType).map((value) => (
                <MenuItem key={value} value={value}>
                  {titleCase(value)}
                </MenuItem>
              ))}
            </RHFSelect>

            {!values.valuation_type ? null : values.valuation_type === ValuationType.FIXED ? (
              <RHFTextField name="valuation" label="Valuation" />
            ) : (
              <>
                <RHFTextField name="floor" label="Floor" />
                <RHFTextField name="cap" label="Cap" />
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5">Discount Matrix</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        const newMatrix = [...(values?.disc_matrix || [])];
                        newMatrix.push({
                          perc: '',
                          total_months: '',
                        });
                        methods.setValue('disc_matrix', newMatrix);
                      }}
                    >
                      + Add
                    </Button>
                  </Box>
                  {values.disc_matrix?.length === 0 ? (
                    <EmptyContent title="No discount matrix added" />
                  ) : (
                    values.disc_matrix?.map((round, index) => (
                      <Stack key={index} gap={0.5}>
                        <Typography>Disc Matrix {index + 1}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                          <RHFTextField name={`disc_matrix.${index}.perc`} label="Percentage" />
                          <RHFTextField
                            name={`disc_matrix.${index}.total_months`}
                            label="Total Months"
                          />
                          <IconButton
                            color="error"
                            onClick={() => {
                              const newMatrix = [...(values?.disc_matrix || [])];
                              newMatrix.splice(index, 1);
                              methods.setValue('disc_matrix', newMatrix);
                            }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Box>
                      </Stack>
                    ))
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionThree = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Additional Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter some additional details of deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Additional Details" />}

          <Stack spacing={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Cap Table</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newTable = [...(values?.cap_table || [])];
                  newTable.push({
                    name: '',
                    perc: '',
                  });
                  methods.setValue('cap_table', newTable);
                }}
              >
                + Add
              </Button>
            </Box>
            {values.cap_table?.length === 0 ? (
              <EmptyContent title="No cap table added" />
            ) : (
              values.cap_table?.map((round, index) => (
                <Stack key={index} gap={0.5}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <RHFTextField name={`cap_table.${index}.name`} label="Name" />
                    <RHFTextField name={`cap_table.${index}.perc`} label="Percentage" />
                    <IconButton
                      color="error"
                      onClick={() => {
                        const newTable = [...(values?.cap_table || [])];
                        newTable.splice(index, 1);
                        methods.setValue('cap_table', newTable);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Box>
                </Stack>
              ))
            )}
          </Stack>

          <Stack spacing={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Co investors</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newInvestors = [...(values?.co_investors || [])];
                  newInvestors.push('');
                  methods.setValue('co_investors', newInvestors);
                }}
              >
                + Add
              </Button>
            </Box>
            {values.co_investors?.length === 0 ? (
              <EmptyContent title="No co investors added" />
            ) : (
              values.co_investors?.map((_, index) => (
                <Stack key={index} gap={0.5}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <RHFTextField
                      name={`co_investors.${index}`}
                      label={`Co-investor ${index + 1}`}
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        const newInvestors = [...(values?.co_investors || [])];
                        newInvestors.splice(index, 1);
                        methods.setValue('co_investors', newInvestors);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Box>
                </Stack>
              ))
            )}
          </Stack>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="h5">Deal Price</Typography>
            {values.deal_price?.map((_, index) => (
              <Card sx={{ p: 2 }} key={index}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <RHFTextField name={`deal_price.${index}.title`} label="Title" />
                  <RHFTextField name={`deal_price.${index}.perc`} label="Percentage" />
                </Box>
                <RHFTextField name={`deal_price.${index}.info`} label="Info" />
              </Card>
            ))}
          </Stack>

          <Stack spacing={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Rules of Allocation</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newRules = [...(values?.rules_of_allocation || [])];
                  newRules.push('');
                  methods.setValue('rules_of_allocation', newRules);
                }}
              >
                + Add
              </Button>
            </Box>
            {values.rules_of_allocation?.length === 0 ? (
              <EmptyContent title="No rules added" />
            ) : (
              values.rules_of_allocation?.map((_, index) => (
                <Stack key={index} gap={0.5}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <RHFTextField
                      name={`rules_of_allocation.${index}`}
                      label={`Rule ${index + 1}`}
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        const newRules = [...(values?.rules_of_allocation || [])];
                        newRules.splice(index, 1);
                        methods.setValue('rules_of_allocation', newRules);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Box>
                </Stack>
              ))
            )}
          </Stack>
          <Divider />
          <Stack spacing={3} sx={{ mt: 1, p: 3 }}>
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

  const lastSection = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid
        xs={12}
        md={8}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Update Deal
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {sectionOne}
        {sectionTwo}
        {sectionThree}
        {lastSection}
      </Grid>
    </FormProvider>
  );
}
