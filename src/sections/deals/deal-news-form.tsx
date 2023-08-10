'use client';

import { Button, Card, IconButton, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import { Deal, News } from 'src/types/deals.types';
import NewsDeleteForm from './news/news-delete-form';
import NewsNewEditForm from './news/news-new-edit-form';

type Props = {
  currentDeal?: Deal;
};

export default function DealNewsForm({ currentDeal }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selectedNews, setSelectedNews] = React.useState<News>();
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
        <Typography variant="h4">News</Typography>
        <Button onClick={() => setOpen(true)} variant="outlined" color="success">
          Add News
        </Button>
      </Box>
      <NewsNewEditForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedNews(undefined);
        }}
        dealId={currentDeal?.deal_id || ''}
        news={
          selectedNews
            ? {
                ...selectedNews,
                file: null,
              }
            : undefined
        }
      />
      <NewsDeleteForm
        dealId={currentDeal?.deal_id || ''}
        onClose={() => setDeleteOpen(false)}
        open={deleteOpen}
        newsIds={selectedIds}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {!currentDeal?.company_info?.news || currentDeal?.company_info?.news?.length === 0 ? (
          <EmptyContent filled title="No News Added" sx={{ py: 10 }} />
        ) : (
          currentDeal?.company_info?.news?.map((news) => (
            <Card key={news.id} sx={{ p: 2, width: 450 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <img
                  src={news.thumbnail_link}
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '100%' }}
                  alt={news.title}
                />
                <Box>
                  <Typography>{news.title}</Typography>
                  <Link
                    sx={{ display: 'flex', alignItems: 'center' }}
                    href={news.article_link}
                    target="_blank"
                  >
                    Link <Iconify icon="gg:external" />
                  </Link>
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-around' }}>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setDeleteOpen(true);
                        setSelectedIds([news.id]);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => {
                        setOpen(true);
                        setSelectedNews(news);
                      }}
                    >
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
