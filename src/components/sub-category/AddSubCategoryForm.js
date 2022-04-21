import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';

import { SubCategoryContext } from '../../store/sub-category';
import { createSubCategory } from '../../lib/api/sub-category';
import { getCategories } from '../../lib/api/category';

const AddSubCategoryForm = () => {
  const subCategoryCtx = useContext(SubCategoryContext);
  const { handleAddSubCategory, handleCloseAdd, openAdd } = subCategoryCtx;
  const { data, error, sendRequest, status } = useHttp(createSubCategory);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const {
    data: dataCategories,
    error: errorCategories,
    sendRequest: sendCategories,
    status: statusCategories,
  } = useHttp(getCategories, true);
  const [name, setName] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ name, categoryId: category.id });
  };

  React.useEffect(() => {
    sendCategories();
  }, [sendCategories]);

  React.useEffect(() => {
    if (statusCategories === 'completed' && dataCategories) {
      setCategories(dataCategories);
    } else if (statusCategories === 'error' && errorCategories) {
      swal('Lỗi', 'Đã có lỗi xảy ra', 'error');
      handleCloseAdd();
    }
  }, [
    dataCategories,
    statusCategories,
    setCategories,
    errorCategories,
    handleCloseAdd,
  ]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm danh mục phụ mới thành công',
          'success'
        );
        handleAddSubCategory(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddSubCategory, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      {statusCategories === 'pending' ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle>Thêm danh mục phụ</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                required
                id='name'
                label='Tên danh mục phụ'
                value={name}
                onChange={handleChangeName}
              />
              <Autocomplete
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                id='pet-type'
                options={categories}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField required {...params} label='Thuộc danh mục' />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button disabled={status === 'pending'} variant='contained' type='submit'>
            {status === 'pending' ? "Đang thêm..." : "Thêm"}
            </Button>
            <Button variant='text' onClick={handleCloseAdd}>
              Hủy bỏ
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default AddSubCategoryForm;
