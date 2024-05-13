import { Box } from '@mui/material';
import { ResearchData } from 'src/types/content-management/research.types';

interface Props {
  data: ResearchData;
}

const ResearchTab2 = (props: Props) => {
  const { data } = props;

  return <Box sx={{ p: 3 }}>Hello tab 2</Box>;
};

export default ResearchTab2;
