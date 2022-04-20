import { axios, bearerHeader } from '../config';

export const getUsers = async () => {
  try {
    const response = await axios.get('/users', {
        headers: {
            Authorization: bearerHeader,
          },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`/users`, user, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editUser = async (user) => {
  try {
    const response = await axios.patch(`/users/${user.id}`, user, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const delUser = async (user) => {
    try {
      const response = await axios.delete(`/users/${user.id}`, user, {
        headers: {
          Authorization: bearerHeader,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };
