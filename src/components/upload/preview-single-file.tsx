// @mui
import Box from '@mui/material/Box';
//
import Image from '../image';

// ----------------------------------------------------------------------

type Props = {
  imgUrl?: string;
  video?: boolean;
};

export default function SingleFilePreview({ imgUrl = '', video = false }: Props) {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      {video ? (
        <Box
          sx={{
            maxHeight: 330,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video src={imgUrl} style={{ height: '100%', maxHeight: '330px' }} controls loop />
        </Box>
      ) : (
        <Image
          alt="file preview"
          src={imgUrl}
          sx={{
            width: 1,
            height: 1,
            borderRadius: 1,
          }}
        />
      )}
    </Box>
  );
}
