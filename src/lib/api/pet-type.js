import { axios, bearerHeader } from '../config';

export const getPetTypes = async () => {
  try {
    const response = await axios.get('/pet-types');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPetType = async (id) => {
  try {
    const response = await axios.get(`/pet-types/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createPetType = async (petType) => {
  try {
    const response = await axios.post(`/pet-types`, petType, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editPetType = async (petType) => {
  try {
    const response = await axios.patch(`/pet-types/${petType.id}`, petType, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
