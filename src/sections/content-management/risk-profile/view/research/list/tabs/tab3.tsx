import { Box } from '@mui/material';
import { ResearchData } from 'src/types/content-management/research.types';

interface Props {
  data: ResearchData;
}

const ResearchTab3 = (props: Props) => {
  const { data } = props;
  return <Box sx={{ p: 3 }}>Hello tab 3</Box>;
};

export default ResearchTab3;
