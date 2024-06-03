import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Button, Stack, Typography } from '@mui/material';

import MutualFundsIcon from 'src/assets/icons/mutual-funds';
import { ExcelUploadTabs } from 'src/types/product-upload.types';

interface Props {
  handleDownload: () => Promise<void>;
  tab: ExcelUploadTabs;
}

const DownloadFile = (props: Props) => {
  const { handleDownload, tab } = props;

  const content =
    tab === ExcelUploadTabs.AIF
      ? 'Download Whitelisted AIF Funds'
      : tab === ExcelUploadTabs.EXCLUSIVES
      ? 'Download Whitelisted Exclusives Funds'
      : tab === ExcelUploadTabs.GLOBAL_INVESTING
      ? 'Download Whitelisted Global Investing Funds'
      : tab === ExcelUploadTabs.PMS
      ? 'Download Whitelisted PMS Funds'
      : 'Download Whitelisted Mutual Funds';

  return (
    <Stack sx={{ gap: 2, alignItems: 'center', flex: 1, p: 3 }}>
      <MutualFundsIcon />
      <Typography variant="h6">{content}</Typography>
      <Button startIcon={<SystemUpdateAltIcon />} variant="contained" onClick={handleDownload}>
        Download Now
      </Button>
    </Stack>
  );
};

export default DownloadFile;
