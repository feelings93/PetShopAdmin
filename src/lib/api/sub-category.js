import { axios, bearerHeader } from '../config';

export const getSubCategories = async () => {
  try {
    const response = await axios.get('/sub-categories');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSubCategory = async (id) => {
  try {
    const response = await axios.get(`/sub-categories/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createSubCategory = async (subCategory) => {
  try {
    const response = await axios.post(`/sub-categories`, subCategory, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editSubCategory = async (subCategory) => {
  try {
    const response = await axios.patch(`/sub-categories/${subCategory.id}`, subCategory, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
