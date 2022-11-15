
import { setNotification } from '../reducers/notification';

export const handleError = (error, dispatch) => {
  if (error.name === 'AxiosError') {
    dispatch(setNotification(error.response.data.error, 'error', 5));
  }
};