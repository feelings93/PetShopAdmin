import { axios, bearerHeader } from '../config';

export const getServices = async () => {
  try {
    const response = await axios.get('/services', {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getService = async (id) => {
  try {
    const response = await axios.get(`/services/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createService = async (Service) => {
  const formData = new FormData();
  console.log(Service);

  formData.append('name', Service.name);
  formData.append('price', Service.price);
  formData.append('describe', Service.describe);

  for (let i = 0; i < Service.employees.length; i++) {
    formData.append('employeeIds', Service.employees[i]?.id);
  }
  for (let i = 0; i < Service.files.length; i++) {
    formData.append('files', Service.files[i]);
  }
  try {
    const response = await axios.post(`/services`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editService = async (Service) => {
  const formData = new FormData();
  console.log(Service);

  if (Service.name) formData.append('name', Service.name);
  if (Service.price) formData.append('price', Service.price);
  if (Service.describe) formData.append('describe', Service.describe);
  for (let i = 0; i < Service.photoUrls.length; i++) {
    formData.append('photoUrls', JSON.stringify(Service.photoUrls[i]));
  }
  for (let i = 0; i < Service.employees.length; i++) {
    formData.append('employeeIds', Service.employees[i]?.id);
  }
  for (let i = 0; i < Service.files.length; i++) {
    if (Service.files[i]) formData.append('files', Service.files[i]);
  }
  try {
    const response = await axios.patch(`/services/${Service.id}`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const delService = async (Service) => {
  try {
    const response = await axios.delete(`/services/${Service.id}`, Service, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
