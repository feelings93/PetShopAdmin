import { axios, bearerHeader } from '../config';

export const getOrders = async () => {
  try {
    const response = await axios.get('/orders');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getOrder = async (id) => {
  try {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`/orders`, order, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editOrder = async (order) => {
  try {
    const response = await axios.patch(`/orders/${order.id}`, order, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
