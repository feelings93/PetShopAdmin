import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { getServices } from '../lib/api/service';
import { ServiceContext } from '../store/service-context';
import ServiceGrid from '../components/service/ServiceGrid';
import AddServiceForm from '../components/service/AddServiceForm';
import LoadingBox from '../components/UI/LoadingBox';

const Service = () => {
  const { data, error, status, sendRequest } = useHttp(getServices, true);
  const serviceCtx = useContext(ServiceContext);
  const { setServices, openAdd, handleOpenAdd, query, setQuery } = serviceCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setServices(data);
    }
  }, [data, status, setServices]);

  if (status === 'pending') <LoadingBox />;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <h3>Dịch vụ</h3>
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
      <ServiceGrid />
      {openAdd && <AddServiceForm />}
    </>
  );
};

export default Service;
