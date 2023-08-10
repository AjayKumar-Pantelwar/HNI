import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export const handleError = (error: any) => {
  let errorMessage = 'Something went wrong!';
  console.error(error);

  if (axios.isAxiosError(error)) {
    console.error(error.response || error.message);
    errorMessage = error.response?.data?.error || error.message;
  } else {
    console.error(error.data?.error);
    errorMessage = error.data?.error || errorMessage;
  }

  enqueueSnackbar(errorMessage, { variant: 'error' });
};
