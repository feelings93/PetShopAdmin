import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import ProductTable from '../order/ProductTable';
import PropTypes from 'prop-types';

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
        <ProductTable
          products={order?.orderItems.map((x) => {
            x.name = x.product.name;
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
