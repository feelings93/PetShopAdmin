import { axios, bearerHeader } from '../config';

export const getProducts = async () => {
  try {
    const response = await axios.get('/products', {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createProduct = async (Product) => {
  const formData = new FormData();
  console.log(Product);

  formData.append('name', Product.name);
  formData.append('price', Product.price);
  formData.append('quantity', Product.quantity);
  formData.append('describe', Product.describe);
  formData.append('categoryId', Product.category?.id);
  formData.append('subCategoryId', Product.subCategory?.id);

  for (let i = 0; i < Product.files.length; i++) {
    formData.append('files', Product.files[i]);
  }
  formData.append('status', 'Còn hàng');
  try {
    const response = await axios.post(`/products`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editProduct = async (Product) => {
  const formData = new FormData();
  console.log(Product);

  if (Product.name) formData.append('name', Product.name);
  if (Product.price) formData.append('price', Product.price);
  if (Product.quantity) formData.append('quantity', Product.quantity);
  if (Product.category) formData.append('categoryId', Product.category?.id);
  if (Product.subCategory)
    formData.append('subCategoryId', Product.subCategory?.id);

  if (Product.describe) formData.append('describe', Product.describe);
  for (let i = 0; i < Product.photoUrls.length; i++) {
    formData.append('photoUrls', JSON.stringify(Product.photoUrls[i]));
  }
  for (let i = 0; i < Product.files.length; i++) {
    if (Product.files[i]) formData.append('files', Product.files[i]);
  }
  try {
    const response = await axios.patch(`/products/${Product.id}`, formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const delProduct = async (Product) => {
  try {
    const response = await axios.delete(`/products/${Product.id}`, Product, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
