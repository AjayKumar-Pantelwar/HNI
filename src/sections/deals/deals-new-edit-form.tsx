'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EditDialog } from 'src/components/edit-dialog';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
  RHFUploadBox,
} from 'src/components/hook-form';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { companyApi } from 'src/redux/api/company.api';
import { constantApi } from 'src/redux/api/constant.api';
import { dealApi } from 'src/redux/api/deal.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { CreateDealRequest, CreateDealSchema, Deal } from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { fDate } from 'src/utils/format-time';
import { handleError } from 'src/utils/handle-error';

type Props = {
  currentDeal?: Deal;
};

export default function DealsNewEditForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const { data: companiesData } = companyApi.useCompanyQuery({});

  const { data: constantsData } = constantApi.useConstantsQuery();

  const [createDeal] = dealApi.useCreateDealMutation();
  const [editDeal] = dealApi.useEditDealMutation();

  const [coverImageDetails, setCoverImageDetails] = React.useState<File>();
  const [logoLinkDetails, setLogoLinkDetails] = React.useState<File>();

  const defaultValues = useMemo<CreateDealRequest>(
    () => ({
      brand_name: currentDeal?.brand_name || '',
      releasing_soon_tag: currentDeal?.releasing_soon_tag || '',
      one_liner: currentDeal?.one_liner || '',
      description: currentDeal?.description || '',
      start_date: currentDeal?.start_date ? fDate(currentDeal.start_date) : '',
      end_date: currentDeal?.end_date ? fDate(currentDeal.end_date) : '',
      closing_soon_date: currentDeal?.closing_soon_date ? fDate(currentDeal.closing_soon_date) : '',
      primary: currentDeal?.sector?.primary?.at(0) || '',
      sector_2: currentDeal?.sector?.sector_2?.at(0) || '',
      sector_3: currentDeal?.sector?.sector_3?.at(0) || '',
      company_id: currentDeal?.company_id || '',
      model: currentDeal?.sector?.model?.at(0) || '',
      tech: currentDeal?.sector?.tech?.at(0) || '',
      deal_name: currentDeal?.deal_name || '',
      cover_image: null,
      logo_link: null,
      pitch_deck: null,
    }),
    [currentDeal]
  );

  console.log(currentDeal);
  const methods = useForm({
    resolver: yupResolver<CreateDealRequest>(CreateDealSchema),
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

  const description = watch('description');
  const coverImage = watch('cover_image');
  const logo = watch('logo_link');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
      convertUrlToFile(currentDeal.cover_image)
        .then((file) => {
          setValue('cover_image', file);
        })
        .catch((err) => handleError(err, true));
      convertUrlToFile(currentDeal.logo_link)
        .then((file) => {
          setValue('logo_link', file);
        })
        .catch((err) => handleError(err, true));

      convertUrlToFile(currentDeal.pitch_deck)
        .then((file) => {
          setValue('pitch_deck', file);
        })
        .catch((err) => handleError(err, true));
    }
  }, [currentDeal, defaultValues, reset, setValue]);

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

  const handleDrop = useCallback(
    (key: keyof CreateDealRequest) => (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // setValue(key, newFiles[0], { shouldValidate: true });
      if (key === 'cover_image') {
        setCoverImageDetails(newFiles[0]);
      } else if (key === 'logo_link') {
        setLogoLinkDetails(newFiles[0]);
      }
    },
    []
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      setValue('cover_image', null);
    },
    [setValue]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('cover_image', null);
  }, [setValue]);

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
            <RHFTextField name="brand_name" label="Brand Name" />
            <RHFTextField name="releasing_soon_tag" label="Releasing Soon Tag" />
            <RHFSelect name="company_id" label="Company">
              {!companiesData?.data?.company || companiesData?.data?.company?.length === 0 ? (
                <MenuItem LinkComponent={Link} href={paths.dashboard.company.new}>
                  No Company Found. Click to add
                </MenuItem>
              ) : (
                companiesData?.data?.company?.map((company) => (
                  <MenuItem key={company.company_id} value={company.company_id}>
                    {company.legal_name}
                  </MenuItem>
                ))
              )}
            </RHFSelect>
            <RHFTextField name="deal_name" label="Deal Name" />
            <RHFTextField name="one_liner" label="One Liner" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
              helperText={`${description.length} / 250`}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFDateField name="start_date" label="Start Date" />
              <RHFDateField name="closing_soon_date" label="Closing Soon Date" />
              <RHFDateField name="end_date" label="End Date" />
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
            Images
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload cover image and logo of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Images" />}

          <Stack spacing={1.5} p={3}>
            <RHFUpload
              thumbnail
              name="cover_image"
              maxSize={3145728}
              onDrop={handleDrop('cover_image')}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
            />

            {coverImageDetails && (
              <EditDialog
                open
                base64={URL.createObjectURL(coverImageDetails)}
                filename={coverImageDetails.name}
                onChange={(file) => {
                  if (file === null) return;
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  });
                  setValue('cover_image', file);
                }}
                onClose={() => setCoverImageDetails(undefined)}
                aspectRatio="4 / 3"
              />
            )}
            {logoLinkDetails && (
              <EditDialog
                open
                base64={URL.createObjectURL(logoLinkDetails)}
                filename={logoLinkDetails.name}
                onChange={(file) => {
                  if (file === null) return;
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  });
                  setValue('logo_link', file);
                }}
                onClose={() => setLogoLinkDetails(undefined)}
                aspectRatio="1 / 1"
              />
            )}

            <Box sx={{ pt: 10, pb: 10 }}>
              <RHFUploadAvatar
                name="logo_link"
                maxSize={3145728}
                onDrop={handleDrop('logo_link')}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>
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
            Secondary Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter sectors, tech and model of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Secondary Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="h5">Sectors</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {constantsData?.data?.sector?.primary && (
                <RHFSelect fullWidth name="primary" label="Primary Sector">
                  {Object.values(constantsData?.data?.sector?.primary).map((sector) => (
                    <MenuItem value={sector.value} key={sector.value}>
                      {sector.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}
              {constantsData?.data?.sector?.sector_2 && (
                <RHFSelect fullWidth name="sector_2" label="Sector 2">
                  {Object.values(constantsData?.data?.sector?.sector_2).map((sector) => (
                    <MenuItem value={sector.value} key={sector.value}>
                      {sector.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}
              {constantsData?.data?.sector?.sector_3 && (
                <RHFSelect fullWidth name="sector_3" label="Sector 3">
                  {Object.values(constantsData?.data?.sector?.sector_3).map((sector) => (
                    <MenuItem value={sector.value} key={sector.value}>
                      {sector.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}
            </Box>
            {constantsData?.data?.sector?.tech && (
              <RHFSelect fullWidth name="tech" label="Tech">
                {Object.values(constantsData?.data?.sector?.tech).map((sector) => (
                  <MenuItem value={sector.value} key={sector.value}>
                    {sector.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
            {constantsData?.data?.sector?.model && (
              <RHFSelect fullWidth name="model" label="Model">
                {Object.values(constantsData?.data?.sector?.model).map((sector) => (
                  <MenuItem value={sector.value} key={sector.value}>
                    {sector.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
          </Stack>
          {/* <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Rounds</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newRounds = [...(rounds || [])];
                  newRounds.push({});
                  setValue('round', newRounds);
                }}
              >
                + Add
              </Button>
            </Box>
            {rounds?.map((round, index) => (
              <Stack key={index} gap={2}>
                <Typography>Round {index + 1}</Typography>
                <RHFTextField name={`round.${index}.ask_from_ma`} label="Ask from MA" />
                <RHFTextField name={`round.${index}.raised_in_perc`} label="Raised in %" />
                <RHFTextField name={`round.${index}.min_investment`} label="Min Investment" />
                <RHFTextField name={`round.${index}.externally_raised`} label="Externally Raised" />
                <RHFTextField name={`round.${index}.round_size`} label="Round Size" />
                <RHFTextField name={`round.${index}.valuation`} label="Valuation" />
                <RHFSelect name={`round.${index}.round_type`} label="Round Type">
                  {Object.values(RoundType).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value.split('_').map(capitalize).join(' ')}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFSwitch name={`round.${index}.is_active`} label="Is Active" />
              </Stack>
            ))}
          </Stack> */}
        </Card>
      </Grid>
    </>
  );

  const sectionFour = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pitch Deck
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload the pitch deck pdf here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pitch Deck" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFUploadBox
              accept={{
                'application/*': ['.pdf'],
              }}
              name="pitch_deck"
              sx={{ width: '100%' }}
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
          {!currentDeal ? 'Create Deal' : 'Save Changes'}
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

        {sectionFour}

        {lastSection}
      </Grid>
    </FormProvider>
  );
}
