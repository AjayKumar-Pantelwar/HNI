import { Button, Stack, Typography } from '@mui/material';
import DownloadIcon from 'src/assets/icons/download-icon';

import MutualFundsIcon from 'src/assets/icons/mutual-funds';
import { secondaryFont } from 'src/theme/typography';
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
      <Typography variant="h6" sx={{ fontFamily: secondaryFont.style.fontFamily }}>
        {content}
      </Typography>
      <Button startIcon={<DownloadIcon />} variant="contained" onClick={handleDownload}>
        Download Now
      </Button>
    </Stack>
  );
};

export default DownloadFile;
