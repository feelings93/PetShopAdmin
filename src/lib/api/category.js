import { axios, bearerHeader } from '../config';

export const getCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getCategory = async (id) => {
  try {
    const response = await axios.get(`/categories/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`/categories`, category, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editCategory = async (category) => {
  try {
    const response = await axios.patch(`/categories/${category.id}`, category, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
