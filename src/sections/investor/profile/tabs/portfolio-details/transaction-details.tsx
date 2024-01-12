import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { enqueueSnackbar } from 'notistack';

import { styled } from '@mui/material/styles';
import React from 'react';
import Iconify from 'src/components/iconify';
import { dealApi } from 'src/redux/api/deal.api';
import { portfolioApi } from 'src/redux/api/portfolio.api';
import { useDispatch } from 'src/redux/store';
import { GetTransactionsRequest, Txn } from 'src/types/portfolio.types';
import { fDate } from 'src/utils/format-time';
import { handleError } from 'src/utils/handle-error';
import { format } from 'src/utils/number-format';

export const StyledCard = styled(Card)(() => ({
  marginTop: 3,
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '250px',
  width: '100%',
}));

interface TProps {
  transaction: Txn;
}

const TransactionDetailsCard = (props: TProps) => {
  const { transaction } = props;
  const dispatch = useDispatch();
  const { data } = dealApi.useDealQuery({ deal_id: transaction.deal_id });
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = React.useState<number>();

  const [saveInvest] = dealApi.useSaveInvestMutation();

  return (
    <Card key={transaction.cid} sx={{ p: 3, flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={data?.data?.deals?.[0].deal_name}
            src={data?.data?.deals?.[0].logo_link}
            sx={{ mr: 2 }}
          />
          <Stack gap={1}>
            <Typography variant="subtitle1">{transaction.brand_name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {fDate(transaction.created_at)}
            </Typography>
          </Stack>
        </Box>
        <Stack sx={{ alignItems: 'end', gap: 1 }}>
          <Typography variant="subtitle1">{format(transaction.amount)}</Typography>
          <Typography
            variant="body1"
            color={transaction.type === 'commitment' ? 'primary.main' : 'secondary.main'}
          >
            {transaction.type}
          </Typography>
          {transaction.type === 'commitment' && (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Record
            </Button>
          )}
        </Stack>
      </Box>
      <Dialog
        PaperProps={{
          sx: {
            minWidth: '500px',
            p: 4,
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Convert to Invested</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Enter the Amount you want to convert
        </Typography>
        <Stack sx={{ gap: 2, mt: 3 }}>
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) return;
              setAmount(+e.target.value);
            }}
          />
          <LoadingButton
            variant="contained"
            disabled={!amount}
            loading={isLoading}
            onClick={async () => {
              if (amount) {
                try {
                  setIsLoading(true);
                  const res = await saveInvest({
                    deal_id: transaction.deal_id,
                    amount,
                    cid: transaction.cid,
                  }).unwrap();
                  dispatch(portfolioApi.util.invalidateTags(['Portfolio', 'Transactions']));
                  enqueueSnackbar('Updated your invested', { variant: 'success' });
                } catch (error) {
                  handleError(error);
                } finally {
                  setIsLoading(false);
                }
              }
            }}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Dialog>
    </Card>
  );
};

type Props = { cid: string };

const defaultFilters: GetTransactionsRequest = {
  page_no: 1,
  no_of_records: 10,
  cid: '',
};

const TransactionDetails = (props: Props) => {
  const { cid } = props;
  const [filters, setFilters] = React.useState(defaultFilters);

  const { data, isLoading } = portfolioApi.useTransactionsQuery(filters);

  const txns = data?.data.txns;

  React.useEffect(() => {
    if (cid) {
      setFilters((prev) => ({ ...prev, cid }));
    }
  }, [cid]);

  console.log(txns);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {isLoading ? (
        <CircularProgress />
      ) : txns === null ? (
        <StyledCard>
          {' '}
          <Typography variant="h6" color="text.secondary">
            No Transaction details found
          </Typography>
        </StyledCard>
      ) : (
        txns?.length !== 0 && (
          <Stack sx={{ width: '100%', gap: 2 }}>
            {txns?.map((t) => (
              <TransactionDetailsCard transaction={t} key={t.cid} />
            ))}
          </Stack>
        )
      )}
    </Box>
  );
};

export default TransactionDetails;
