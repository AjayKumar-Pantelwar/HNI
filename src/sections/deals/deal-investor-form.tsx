'use client';

import { Button, Card, IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import { Deal, Investor } from 'src/types/deals.types';
import InvestorDeleteForm from './investors/investor-delete-form';
import InvestorNewEditForm from './investors/investor-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  currentDeal?: Deal;
};

export default function DealInvestor({ currentDeal }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selectedTeam, setSelectedTeam] = React.useState<Investor>();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          mb: 2,
        }}
      >
        <Typography variant="h4">Current Investors</Typography>
        <Button onClick={() => setOpen(true)} variant="outlined" color="success">
          Add Investor
        </Button>
      </Box>
      <InvestorNewEditForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTeam(undefined);
        }}
        dealId={currentDeal?.deal_id || ''}
        investor={
          selectedTeam
            ? {
                ...selectedTeam,
                file: null,
              }
            : undefined
        }
      />
      <InvestorDeleteForm
        dealId={currentDeal?.deal_id || ''}
        onClose={() => setDeleteOpen(false)}
        open={deleteOpen}
        investorIds={selectedIds}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {!currentDeal?.investors || currentDeal?.investors?.length === 0 ? (
          <EmptyContent filled title="No Investors Added" sx={{ py: 10 }} />
        ) : (
          currentDeal?.investors?.map((investor) => (
            <Card key={investor.id} sx={{ p: 2 }}>
              <Stack>
                <img
                  src={investor.image_link}
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '100%' }}
                  alt={investor.name}
                />
                <Typography>{investor.name}</Typography>
                <Typography color="text.secondary">{investor.designation}</Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-around' }}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteOpen(true);
                      setSelectedIds([investor.id]);
                    }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => {
                      setOpen(true);
                      setSelectedTeam(investor);
                    }}
                  >
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                </Box>
              </Stack>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
