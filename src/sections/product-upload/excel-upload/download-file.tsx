import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import DownloadIcon from 'src/assets/icons/download-icon';

import MutualFundsIcon from 'src/assets/icons/mutual-funds';
import { secondaryFont } from 'src/theme/typography';
import { ExcelUploadTabs } from 'src/types/product-upload.types';
import AIF from './icon/aif';
import PMS from './icon/pms';

interface Props {
  handleDownload: () => Promise<void>;
  tab: ExcelUploadTabs;
  downloading: boolean;
}

const DownloadFile = (props: Props) => {
  const { handleDownload, tab, downloading } = props;

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
      {tab === ExcelUploadTabs.AIF ? (
        <AIF />
      ) : tab === ExcelUploadTabs.PMS ? (
        <PMS />
      ) : (
        <MutualFundsIcon />
      )}
      <Typography variant="h6" sx={{ fontFamily: secondaryFont.style.fontFamily }}>
        {content}
      </Typography>
      <Button
        disabled={downloading}
        startIcon={!downloading && <DownloadIcon />}
        variant="contained"
        onClick={handleDownload}
      >
        {downloading ? <CircularProgress size={22} /> : 'Download Now'}
      </Button>
    </Stack>
  );
};

export default DownloadFile;
