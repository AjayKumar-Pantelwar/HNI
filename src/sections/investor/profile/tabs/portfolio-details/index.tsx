import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import AppWidget from 'src/components/app/app-widget';
import { portfolioApi } from 'src/redux/api/portfolio.api';
import { Investor } from 'src/types/investor.types';
import { GetPortfolioRequest } from 'src/types/portfolio.types';
import { format } from 'src/utils/number-format';
import TransactionDetails from './transaction-details';

export const StyledCard = styled(Card)(() => ({
  marginTop: 3,
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '250px',
  width: '100%',
}));

type Props = { investor: Investor };

const defaultFilters: GetPortfolioRequest = {
  page_no: 1,
  no_of_records: 10,
  cid: '',
};

const PortfolioDetails = (props: Props) => {
  const { investor } = props;
  const [filters, setFilters] = useState(defaultFilters);

  const { data, isLoading } = portfolioApi.usePortfolioQuery(filters);

  useEffect(() => {
    if (investor.cid) {
      setFilters((prev) => ({ ...prev, cid: investor.cid }));
    }
  }, [investor.cid]);

  const portfolio = data?.data.portfolio?.[0];

  const totalAmount = Number(portfolio?.total_invested) + Number(portfolio?.total_commited);

  const totalInvestedPercentage = (Number(portfolio?.total_invested) / Number(totalAmount)) * 100;

  const totalCommittedPercentage = (Number(portfolio?.total_commited) / Number(totalAmount)) * 100;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4">Portfolio Details</Typography>
      {isLoading ? (
        <StyledCard>
          <CircularProgress />
        </StyledCard>
      ) : portfolio ? (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <AppWidget
            title={`Total : ${format(totalAmount.toString())}`}
            total={`Total Committed : ${format(portfolio.total_commited)}`}
            icon="solar:user-rounded-bold"
            chart={{
              series: !Number.isNaN(totalCommittedPercentage) ? totalCommittedPercentage : 0,
            }}
            sx={{ flex: 1 }}
            color="info"
          />
          <AppWidget
            title={`Total : ${format(totalAmount.toString())}`}
            total={`Total Invested : ${format(portfolio.total_invested)}`}
            icon="solar:user-rounded-bold"
            chart={{
              series: !Number.isNaN(totalInvestedPercentage) ? totalInvestedPercentage : 0,
            }}
            sx={{ flex: 1 }}
          />
        </Box>
      ) : (
        <StyledCard>
          <Typography variant="h6" color="text.secondary">
            No Portfolio details found
          </Typography>
        </StyledCard>
      )}
      <Box>
        <Typography variant="h4">Transaction Details</Typography>
      </Box>
      <TransactionDetails cid={investor.cid} />
    </Box>
  );
};

export default PortfolioDetails;
