import { Box } from '@mui/material';
import { ResearchData } from 'src/types/content-management/research.types';

interface Props {
  data: ResearchData;
}

const ResearchTab4 = (props: Props) => {
  const { data } = props;
  return <Box sx={{ p: 3 }}>Hello tab 4</Box>;
};

export default ResearchTab4;
