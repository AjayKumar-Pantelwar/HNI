import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export const handleError = (error: any, silent = false) => {
  let errorMessage = 'Something went wrong!';
  console.error(error);

  if (axios.isAxiosError(error)) {
    console.error(error.response || error.message);
    errorMessage = error.response?.data?.error || error.message;
  } else if (error.hasOwnProperty('data')) {
    console.error(error.data?.error);
    errorMessage = error.data?.error || errorMessage;
  } else {
    errorMessage = error.message;
  }

  if (!silent && typeof window !== 'undefined')
    enqueueSnackbar(errorMessage || 'Something went wrong', { variant: 'error' });
};
