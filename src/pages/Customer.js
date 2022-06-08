import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import AddCustomerForm from '../components/customer/AddCustomerForm';
import ActiveCustomerForm from '../components/customer/ActiveCustomerForm';
import useHttp from '../hooks/use-http';
import CustomerGrid from '../components/customer/CustomerGrid';
import EditCustomerForm from '../components/customer/EditCustomerForm';
import { CustomerContext } from '../store/customer-context';
import { getCustomers } from '../lib/api/customer';
import LoadingBox from '../components/UI/LoadingBox';

const Customer = () => {
  const { data, error, status, sendRequest } = useHttp(getCustomers, true);
  const customerCtx = useContext(CustomerContext);
  const {
    setCustomers,
    openAdd,
    openEdit,
    openActive,
    handleOpenAdd,
    query,
    setQuery,
  } = customerCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setCustomers(data);
    }
  }, [data, status, setCustomers]);

  if (status === 'pending') return <LoadingBox/>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <h3>Khách hàng</h3>
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
      <CustomerGrid />

      {openAdd && <AddCustomerForm />}
      {openEdit && <EditCustomerForm />}
      {openActive && <ActiveCustomerForm/>}
    </>
  );
};

export default Customer;
