'use client';

import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Image from 'src/components/image';

import { varTranHover } from 'src/components/animate';
import { useLightBox } from 'src/components/lightbox';
import Lightbox from 'src/components/lightbox/lightbox';
import { GetCarouselResponse } from 'src/types/carousel.types';

interface Props {
  data: GetCarouselResponse;
}

const CarouselGridView = ({ data }: Props) => {
  const slides = data?.data?.map((i) => ({
    src: i.media_url,
  }));

  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  return (
    <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
      {data?.data?.map((slide) => (
        <Card
          key={slide.media_url}
          sx={{ borderRadius: 'unset', maxWidth: '375px', minHeight: '650px' }}
        >
          <Box sx={{ position: 'relative' }}>
            <m.div
              whileHover="hover"
              variants={{
                hover: { opacity: 0.8 },
              }}
              transition={varTranHover()}
            >
              <Image
                alt={slide.media_url}
                src={slide.media_url}
                ratio="1/1"
                onClick={() => handleOpenLightbox(slide.media_url)}
                sx={{ cursor: 'pointer' }}
              />
            </m.div>
            <Box sx={{ bgcolor: 'common.black', width: '100%', height: '60px' }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  width: '60px',
                  p: 1,
                  bottom: 40,
                  left: '15%',
                  position: 'absolute',
                  zIndex: 300,
                }}
              >
                <Image
                  alt={slide.icon}
                  src={slide.icon}
                  ratio="1/1"
                  onClick={() => handleOpenLightbox(slide.icon)}
                  sx={{ cursor: 'pointer', objectFit: 'contain' }}
                />
              </Box>
              <Card
                sx={{
                  position: 'absolute',
                  zIndex: 200,
                  right: 0,
                  borderRadius: 'unset',
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80px',
                }}
              >
                <Box>
                  <Typography variant="h4" color="primary.main">
                    360 Cr +
                  </Typography>
                  <Typography variant="body2">Asset under Management</Typography>
                </Box>
              </Card>
            </Box>
          </Box>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5,
              p: 2,
              gap: 3,
            }}
          >
            <Typography variant="h4" textAlign="center">
              Your Gateway to Exclusive Wealth Offerings!
            </Typography>
            <Button variant="contained" fullWidth>
              Publish
            </Button>
          </Stack>
        </Card>
      ))}
      <Lightbox
        index={selectedImage}
        slides={slides}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </Box>
  );
};

export default CarouselGridView;
