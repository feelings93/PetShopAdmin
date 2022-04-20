import { axios, bearerHeader } from '../config';

export const getBreeds = async () => {
  try {
    const response = await axios.get('/breeds');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getBreed = async (id) => {
  try {
    const response = await axios.get(`/breeds/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createBreed = async (breed) => {
  try {
    const response = await axios.post(`/breeds`, breed, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editBreed = async (breed) => {
  try {
    const response = await axios.patch(`/breeds/${breed.id}`, breed, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
