import React, { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StatusCard from '../components/order-detail/StatusCard';
import { getOrder } from '../lib/api/order';
import CustomerProfile from '../components/order-detail/CustomerProfile';
import PaymentInfo from '../components/order-detail/PaymentInfo';
import ProductList from '../components/order-detail/ProductList';
import { ChevronLeft } from '@mui/icons-material';
import LoadingBox from '../components/UI/LoadingBox';

const OrderDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { sendRequest, status, data, error } = useHttp(getOrder, true);

  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);
  if (status === 'pending') return <LoadingBox/>;
  if (!data || error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <Stack spacing={4}>
      <Stack direction='row'>
        <IconButton
          onClick={() => {
            navigate('/admin/order');
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography
          fontWeight='700'
          fontSize='28px'
        >{`Đơn hàng #${data.id}`}</Typography>
      </Stack>

      <StatusCard order={data} />
      <ProductList order={data} />
      <Grid container>
        <Grid pr={2} item md={6} sm={12}>
          <CustomerProfile order={data} />
        </Grid>

        <Grid pl={2} item md={6} sm={12}>
          <PaymentInfo order={data} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default OrderDetail;
