import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import ProductTable from '../order/ProductTable';
import PropTypes from 'prop-types';
import PetTable from '../order/PetTable';
import ServiceTable from '../order/ServiceTable';

const ProductList = ({ order }) => {
  console.log(order.orderItems);
  return (
    <Card variant='outlined'>
      <CardHeader
        title={<Typography variant='h6'>Danh sách mặt hàng</Typography>}
        // action={<Button variant='text'>Chỉnh sửa</Button>}
      />
      <Divider />
      <CardContent>
        <PetTable
          pets={order?.petOrderItems.map((x) => {
            x.petId = x.pet.id;
            return x;
          })}
        />
        <ServiceTable
          services={order?.serviceOrderItems.map((x) => {
            x.serviceId = x.service.id;
            return x;
          })}
        />
        <ProductTable
          products={order?.productOrderItems.map((x) => {
            x.productId = x.product.id;
            return x;
          })}
        />
      </CardContent>
    </Card>
  );
};
ProductList.propTypes = {
  order: PropTypes.shape(),
};
export default ProductList;
