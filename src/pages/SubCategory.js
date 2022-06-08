import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import AddSubCategoryForm from '../components/sub-category/AddSubCategoryForm';
import useHttp from '../hooks/use-http';
import SubCategoryGrid from '../components/sub-category/SubCategoryGrid';
import EditSubCategoryForm from '../components/sub-category/EditSubCategoryForm';
import { getSubCategories } from '../lib/api/sub-category';
import { SubCategoryContext } from '../store/sub-category';

const SubCategory = () => {
  const { data, error, status, sendRequest } = useHttp(getSubCategories, true);
  const subCategoryCtx = useContext(SubCategoryContext);
  const { setSubCategories, openAdd, openEdit, handleOpenAdd, query, setQuery } =
    subCategoryCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setSubCategories(data);
    }
  }, [data, status, setSubCategories]);

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
      <SubCategoryGrid />

      {openAdd && <AddSubCategoryForm />}
      {openEdit && <EditSubCategoryForm />}
    </>
  );
};

export default SubCategory;
