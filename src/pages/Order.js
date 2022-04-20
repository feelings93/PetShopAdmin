import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { getOrders } from '../lib/api/order';
import { getProducts } from '../lib/api/product';

import { OrderContext } from '../store/order-context';
import OrderGrid from '../components/order/OrderGrid';
import AddOrderForm from '../components/order/AddOrderForm';

const Order = () => {
  const { data, status, sendRequest, error } = useHttp(getOrders);
  const {
    data: dataProducts,
    error: errorProducts,
    sendRequest: sendRequestProducts,
    status: statusProducts,
  } = useHttp(getProducts, true);
  const orderCtx = useContext(OrderContext);
  const { query, setQuery, handleOpenAdd, setOrders, openAdd, setProducts } =
    orderCtx;

  React.useEffect(() => {
    sendRequest();
    sendRequestProducts();
  }, [sendRequest, sendRequestProducts]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setOrders(data);
    }
  }, [data, status, setOrders]);

  React.useEffect(() => {
    if (statusProducts === 'completed' && dataProducts) {
      setProducts(dataProducts);
    }
  }, [dataProducts, statusProducts, setProducts]);

  if (status === 'pending' || statusProducts === 'pending')
    return <h1>Loading...</h1>;
  if (error || errorProducts) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <Typography>Đơn hàng</Typography>
        <Stack spacing={1} alignItems='center' direction='row'>
          <TextField
            size='small'
            id='search'
            label='Tìm kiếm'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOpenAdd}
            sx={{ color: '#fff' }}
            variant='contained'
            color='success'
          >
            Thêm
          </Button>
        </Stack>
      </Stack>
      <OrderGrid />
      {openAdd && <AddOrderForm />}
    </>
  );
};

export default Order;
