import { Box, Card, ListItemText, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import { Investor, InvestorStage } from 'src/types/investor.types';
import { titleCase } from 'src/utils/change-case';

const StyledLIT = styled(ListItemText)(({ theme }) => ({
  flexBasis: '45%',
}));

interface StageViewProps {
  label: string;
  status: 'done' | 'current' | 'not_done';
}
const StageView = (props: StageViewProps) => {
  const { label, status } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2">{label}</Typography>

      {status === 'done' || status === 'current' ? (
        <Iconify icon="charm:circle-tick" color="success.main" />
      ) : (
        <Iconify icon="mingcute:time-line" color="warning.main" />
      )}
    </Box>
  );
};

type Props = { investor: Investor };

const BasicDetails = (props: Props) => {
  const { investor } = props;
  const currentStageIndex = Object.values(InvestorStage).indexOf(investor.stage);
  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="h4">Basic Details</Typography>
        {/* <Label
          sx={{ height: '32px', px: 1, display: 'flex', gap: 0.5 }}
          variant="soft"
          color="default"
        >
          Stage:
          <Typography sx={{ fontSize: 12, fontWeight: 800 }} component="span" color="text.primary">
            {titleCase(investor.stage)}
          </Typography>
        </Label> */}
      </Stack>
      <Box
        sx={{ display: 'flex', mt: 3, gap: 4, flexDirection: { xs: 'column-reverse', md: 'row' } }}
      >
        <Card sx={{ flex: 1, p: 4, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <StyledLIT primary="Preferred Name" secondary={investor.preferred_name || '--'} />
          <StyledLIT primary="PAN" secondary={investor.pan_details.pan || '--'} />
          <StyledLIT primary="Name As per PAN" secondary={investor.pan_details.name || '--'} />
          <StyledLIT primary="Date of Birth" secondary={investor.pan_details.dob || '--'} />
          <StyledLIT primary="Mobile Number" secondary={investor.mobile_number || '--'} />
          <StyledLIT primary="Email ID" secondary={investor.email_info.email || '--'} />
          <StyledLIT primary="City" secondary={investor.location_info.city || '--'} />
          <StyledLIT primary="State" secondary={investor.location_info.state || '--'} />
          <StyledLIT primary="Country" secondary={investor.location_info.country_code || '--'} />
          <StyledLIT
            primary="Consent Terms and Conditions"
            secondary={investor.t_and_c_consent ? 'YES' : 'NO' || '--'}
            secondaryTypographyProps={{
              sx: {
                color: investor.t_and_c_consent ? 'success.main' : 'error.main',
              },
            }}
          />
          <StyledLIT
            primary="Receive Updates Other Products"
            secondary={investor.receive_updates_other_prods ? 'YES' : 'NO' || '--'}
            secondaryTypographyProps={{
              sx: {
                color: investor.t_and_c_consent ? 'success.main' : 'error.main',
              },
            }}
          />
        </Card>
        <Card sx={{ flex: 1 / 2, p: 4 }}>
          <Label
            sx={{ height: '32px', px: 1, display: 'flex', gap: 0.5 }}
            variant="soft"
            color="default"
          >
            Stage:
            <Typography
              sx={{ fontSize: 12, fontWeight: 800 }}
              component="span"
              color="text.primary"
            >
              {titleCase(investor.stage)}
            </Typography>
          </Label>
          <Stack gap={3} sx={{ mt: 3 }}>
            <Typography variant="h6">Timeline</Typography>
            {Object.values(InvestorStage).map((stage, i) => (
              <StageView
                key={stage}
                label={titleCase(stage)}
                status={
                  investor.stage === stage ? 'current' : i > currentStageIndex ? 'not_done' : 'done'
                }
              />
            ))}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default BasicDetails;
