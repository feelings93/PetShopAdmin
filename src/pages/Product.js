import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { ProductContext } from '../store/product-context';
import { getProducts } from '../lib/api/product';
import AddProductForm from '../components/product/AddProductForm';
import useHttp from '../hooks/use-http';
import ProductGrid from '../components/product/ProductGrid';
import LoadingBox from '../components/UI/LoadingBox';

const Product = () => {
  const { data, error, status, sendRequest } = useHttp(getProducts, true);
  const productCtx = useContext(ProductContext);
  const {
    setProducts,
    openAdd,
    handleOpenAdd,
    query,
    setQuery,
  } = productCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setProducts(data);
    }
  }, [data, status, setProducts]);

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
        <Typography></Typography>
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
      <ProductGrid />
      {openAdd && <AddProductForm />}
    </>
  );
};

export default Product;
