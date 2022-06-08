import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { getOrders } from '../lib/api/order';
import { getProducts } from '../lib/api/product';
import { getPets } from '../lib/api/pet';
import { getServices } from '../lib/api/service';
import { OrderContext } from '../store/order-context';
import OrderGrid from '../components/order/OrderGrid';
import AddOrderForm from '../components/order/AddOrderForm';
import { getCustomers } from '../lib/api/customer';
import LoadingBox from '../components/UI/LoadingBox';

const Order = () => {
  const { data, status, sendRequest, error } = useHttp(getOrders);
  const {
    data: dataProducts,
    error: errorProducts,
    sendRequest: sendRequestProducts,
    status: statusProducts,
  } = useHttp(getProducts, true);
  const {
    data: dataPets,
    error: errorPets,
    sendRequest: sendRequestPets,
    status: statusPets,
  } = useHttp(getPets, true);
  const {
    data: dataServices,
    error: errorServices,
    sendRequest: sendRequestServices,
    status: statusServices,
  } = useHttp(getServices, true);
  const {
    data: dataCustomers,
    error: errorCustomers,
    sendRequest: sendRequestCustomers,
    status: statusCustomers,
  } = useHttp(getCustomers, true);
  const orderCtx = useContext(OrderContext);
  const { query, setQuery, handleOpenAdd, setOrders, openAdd, setProducts, setPets, setServices, setCustomers } =
    orderCtx;

  React.useEffect(() => {
    sendRequest();
    sendRequestProducts();
    sendRequestPets();
    sendRequestServices();
    sendRequestCustomers();
  }, [sendRequest, sendRequestCustomers, sendRequestPets, sendRequestProducts, sendRequestServices]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setOrders(data);
    }
  }, [data, status, setOrders]);

  React.useEffect(() => {
    if (
      statusProducts === 'completed' &&
      dataProducts &&
      statusPets === 'completed' &&
      dataPets &&
      statusServices === 'completed' &&
      dataServices && statusCustomers === 'completed' &&
      dataCustomers
    ) {
      setProducts(dataProducts);
      setPets(dataPets);
      setServices(dataServices);
      setCustomers(dataCustomers);
    }
  }, [dataProducts, statusProducts, setProducts, statusPets, dataPets, statusServices, dataServices, setPets, setServices, statusCustomers, dataCustomers, setCustomers]);

  if (
    status === 'pending' ||
    statusProducts === 'pending' ||
    statusPets === 'pending' ||
    statusServices === 'pending' || statusCustomers === 'pending'
  )
    return <LoadingBox/>;
  if (error || errorProducts || errorPets || errorServices || errorCustomers)
    return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <h3>Đơn hàng</h3>
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
