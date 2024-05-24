// src/HorizontalTimeline.tsx
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Box } from '@mui/material';
import InfoIcon from './icons/info.icon';
import TickIcon from './icons/tick.icon';

interface Props {
  activeStep: number;
  steps: string[];
}

const HorizontalTimeline = (props: Props) => {
  const { activeStep = 1, steps } = props;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Timeline
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          p: 0,
          m: 0,
          width: '100%',
          '& .MuiTimelineOppositeContent-root': {
            flex: 0,
            padding: 0,
            margin: 'auto 0',
          },
          '& .MuiTimelineItem-root::before': {
            padding: 'unset',
          },
          '& .MuiTimelineItem-root': {
            display: 'inline-block',

            minWidth: '150px',
            textAlign: 'center',
          },
          '& .MuiTimelineSeparator-root': {
            flexDirection: 'row',
          },
        }}
      >
        {steps.map((label, index) => (
          <TimelineItem key={label}>
            <TimelineSeparator sx={{ width: '100%' }}>
              <TimelineDot color={index < activeStep ? 'success' : 'warning'}>
                {index < activeStep ? <TickIcon /> : <InfoIcon />}
              </TimelineDot>
              {index < steps.length - 1 && (
                <TimelineConnector
                  sx={{
                    flex: 1,
                    width: '100%',
                    height: '2px',
                    backgroundColor: index < activeStep ? 'success.main' : 'warning.main',
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ p: 'unset', fontWeight: index <= activeStep ? 600 : 500 }}>
              {label}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default HorizontalTimeline;
