import { axios, bearerHeader } from '../config';

export const getReservations = async () => {
    try {
      const response = await axios.get('/reservations', {
        headers: {
          Authorization: bearerHeader,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };