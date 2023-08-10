'use client';

import React from 'react';
// @mui

import Box from '@mui/material/Box';
// routes
// hooks
// _mock
// components
// types
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import { Deal, Team } from 'src/types/deals.types';
import TeamDeleteForm from './teams/team-delete-form';
import TeamNewEditForm from './teams/team-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  currentDeal?: Deal;
};

export default function DealTeamForm({ currentDeal }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
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
        <Typography variant="h4">Meet the Team</Typography>
        <Button onClick={() => setOpen(true)} variant="outlined" color="success">
          Add Team
        </Button>
      </Box>
      <TeamNewEditForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTeam(undefined);
        }}
        dealId={currentDeal?.deal_id || ''}
        team={
          selectedTeam
            ? {
                ...selectedTeam,
                social: selectedTeam?.profile_links?.[0]?.social,
                link: selectedTeam?.profile_links?.[0]?.link,
                file: null,
              }
            : undefined
        }
      />
      <TeamDeleteForm
        dealId={currentDeal?.deal_id || ''}
        onClose={() => setDeleteOpen(false)}
        open={deleteOpen}
        teamIds={selectedIds}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {!currentDeal?.company_info?.team || currentDeal?.company_info?.team?.length === 0 ? (
          <EmptyContent filled title="No Team Members Added" sx={{ py: 10 }} />
        ) : (
          currentDeal?.company_info?.team?.map((team) => (
            <Paper key={team.id} sx={{ p: 2 }}>
              <Stack>
                <img
                  src={team.image_link}
                  width={150}
                  height={150}
                  style={{ borderRadius: '100%' }}
                  alt={team.name}
                />
                <Typography>{team.name}</Typography>
                <Typography color="text.secondary">{team.designation}</Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-around' }}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteOpen(true);
                      setSelectedIds([team.id]);
                    }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => {
                      setOpen(true);
                      setSelectedTeam(team);
                    }}
                  >
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
}
