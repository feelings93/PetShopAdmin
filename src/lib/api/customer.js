import { axios, bearerHeader } from '../config';

export const getCustomers = async () => {
  try {
    const response = await axios.get('/customers');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getCustomer = async (id) => {
  try {
    const response = await axios.get(`/customers/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createCustomer = async (customer) => {
  try {
    const response = await axios.post(`/customers`, customer, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editCustomer = async (customer) => {
  try {
    const response = await axios.patch(`/customers/${customer.id}`, customer, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
