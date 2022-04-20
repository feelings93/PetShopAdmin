import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailCard from '../components/product-detail/ProductDetailCard';
import useHttp from '../hooks/use-http';
import { getCategories } from '../lib/api/category';
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
  useEffect(() => {
    sendRequest(params.id);
    sendCategories();
  }, [params.id, sendCategories, sendRequest]);
  if (status === 'pending' || statusCategories === 'pending')
    return <h1>Loading</h1>;
  if (!data || error || !dataCategories || errorCategories)
    return <h1>Đã có lỗi xảy ra</h1>;
  return <ProductDetailCard product={data} categories={dataCategories} />;
};

export default ProductDetail;
