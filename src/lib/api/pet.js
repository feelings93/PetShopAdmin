import { axios, bearerHeader } from '../config';

export const getPets = async () => {
  try {
    const response = await axios.get('/pets', {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPet = async (id) => {
  try {
    const response = await axios.get(`/pets/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createPet = async (Pet) => {
  const formData = new FormData();
  console.log(Pet);

  formData.append('name', Pet.name);
  formData.append('age', Pet.age);
  formData.append('gender', Pet.gender);
  formData.append('price', Pet.price);
  formData.append('describe', Pet.describe);
  formData.append('breedId', Pet.breed?.id);
  formData.append('typeId', Pet.type?.id);

  for (let i = 0; i < Pet.files.length; i++) {
    formData.append('files', Pet.files[i]);
  }
  try {
    const response = await axios.post(`/pets`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editPet = async (Pet) => {
  const formData = new FormData();
  console.log(Pet);

  if (Pet.name) formData.append('name', Pet.name);
  if (Pet.price) formData.append('price', Pet.price);
  if (Pet.age) formData.append('age', Pet.age);
  if (Pet.gender) formData.append('gender', Pet.gender);
  if (Pet.breed) formData.append('breedId', Pet.breed?.id);
  if (Pet.type) formData.append('typeId', Pet.type?.id);

  if (Pet.describe) formData.append('describe', Pet.describe);
  for (let i = 0; i < Pet.photoUrls.length; i++) {
    formData.append('photoUrls', JSON.stringify(Pet.photoUrls[i]));
  }
  for (let i = 0; i < Pet.files.length; i++) {
    if (Pet.files[i]) formData.append('files', Pet.files[i]);
  }
  try {
    const response = await axios.patch(`/pets/${Pet.id}`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const delPet = async (Pet) => {
  try {
    const response = await axios.delete(`/pets/${Pet.id}`, Pet, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
