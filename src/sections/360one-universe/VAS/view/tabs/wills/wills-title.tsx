import { Box, BoxProps, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from 'src/assets/icons/edit-icon';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { VASApi } from 'src/redux/api/vas.api';
import { handleError } from 'src/utils/handle-error';
import EditTitle from '../../edit-title';

interface Props extends BoxProps {
  title: string;

  tid: string;
}

const WillsTitle = (props: Props) => {
  const { title, sx, tid, ...rest } = props;

  const [editHeading] = VASApi.useEditWillsHeadingMutation();
  const editTitle = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(title);

  async function handleSubmit() {
    setLoading(true);
    try {
      if (tid && value) {
        await editHeading({ id: tid, title: value }).unwrap();
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      editTitle.onFalse();
    }
  }

  return (
    <Box sx={{ ...sx }} {...rest}>
      <Typography variant="h5">{title}</Typography>
      <IconButton onClick={() => editTitle.onTrue()}>
        <EditIcon />
      </IconButton>
      <EditTitle
        open={editTitle.value}
        onClose={editTitle.onFalse}
        value={value}
        setValue={setValue}
        onSubmit={() => handleSubmit()}
        isSubmitting={loading}
      />
    </Box>
  );
};

export default WillsTitle;
