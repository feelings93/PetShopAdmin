import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailCard from '../components/product-detail/ProductDetailCard';
import useHttp from '../hooks/use-http';
import { getCategories } from '../lib/api/category';
import { getSubCategories } from '../lib/api/sub-category';
import { getProduct } from '../lib/api/product';

const ProductDetail = () => {
  const params = useParams();
  const { sendRequest, status, data, error } = useHttp(getProduct, true);
  const {
    data: dataCategories,
    error: errorCategories,
    sendRequest: sendCategories,
    status: statusCategories,
  } = useHttp(getCategories, true);
  const {
    data: dataSubCategories,
    error: errorSubCategories,
    sendRequest: sendSubCategories,
    status: statusSubCategories,
  } = useHttp(getSubCategories, true);
  useEffect(() => {
    sendRequest(params.id);
    sendCategories();
    sendSubCategories();
  }, [params.id, sendCategories, sendRequest, sendSubCategories]);
  if (
    status === 'pending' ||
    statusCategories === 'pending' ||
    statusSubCategories === 'pending'
  )
    return <h1>Loading</h1>;
  if (
    !data ||
    error ||
    !dataCategories ||
    errorCategories ||
    !dataSubCategories ||
    errorSubCategories
  )
    return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <ProductDetailCard
      product={data}
      categories={dataCategories}
      allSubCategories={dataSubCategories}
    />
  );
};

export default ProductDetail;
