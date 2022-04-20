import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import AddCategoryForm from '../components/category/AddCategoryForm';
import useHttp from '../hooks/use-http';
import { getCategories } from '../lib/api/category';
import CategoryGrid from '../components/category/CategoryGrid';
import EditCategoryForm from '../components/category/EditCategoryForm';
import { CategoryContext } from '../store/category-context';

const Category = () => {
  const { data, error, status, sendRequest } = useHttp(getCategories, true);
  const categoryCtx = useContext(CategoryContext);
  const {
    setCategories,
    openAdd,
    openEdit,
    openDelete,
    handleOpenAdd,
    query,
    setQuery,
  } = categoryCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setCategories(data);
    }
  }, [data, status, setCategories]);

  if (status === 'pending') return <h1>Loading...</h1>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <Typography>Danh mục</Typography>
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
      <CategoryGrid />

      {openAdd && <AddCategoryForm />}
      {openEdit && <EditCategoryForm />}
      {openDelete && <EditCategoryForm />}
    </>
  );
};

export default Category;
