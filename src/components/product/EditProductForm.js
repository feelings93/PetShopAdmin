import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../../hooks/use-http';
import { ProductContext } from '../../store/product-context';
import { editProduct } from '../../lib/api/product';
import { getCategories } from '../../lib/api/category';

const EditProductForm = () => {
  const productCtx = useContext(ProductContext);
  const { editProductObj, handleEditProduct, handleCloseEdit } = productCtx;
  const { data, error, sendRequest, status } = useHttp(editProduct);
  const {
    data: dataCategories,
    error: errorCategories,
    sendRequest: sendCategories,
    status: statusCategories,
  } = useHttp(getCategories, true);
  const [name, setName] = React.useState(editProductObj.name);
  const [categories, setCategories] = React.useState([]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ id: editProductObj.id, name });
  };

  React.useEffect(() => {
    sendCategories();
  }, [sendCategories]);

  React.useEffect(() => {
    if (statusCategories === 'completed' && dataCategories) {
      setCategories(dataCategories);
    } else if (statusCategories === 'error' && errorCategories) {
      swal('Lỗi', 'Đã có lỗi xảy ra', 'error');
      handleCloseEdit();
    }
  }, [
    dataCategories,
    statusCategories,
    setCategories,
    errorCategories,
    handleCloseEdit,
  ]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã chỉnh sửa sản phẩm  thành công', 'success');
        handleEditProduct(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditProduct, handleCloseEdit]);
  return (
    <Dialog open={true}>
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
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                id='id'
                label='Id'
                disabled
                value={editProductObj.id}
              />
              <TextField
                id='name'
                label='Tên sản phẩm'
                value={name}
                onChange={handleChangeName}
              />
              <Autocomplete
                multiple
                id='tags-outlined'
                options={categories}
                getOptionLabel={(option) => option.name}
                defaultValue={editProductObj.categories}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Chọn danh mục'
                    placeholder='Danh mục'
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant='contained'
              type='submit'
            >
              {status === 'pending' ? "Đang lưu..." : "Cập nhật"}
            </Button>
            <Button variant='text' onClick={handleCloseEdit}>
              Hủy bỏ
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default EditProductForm;
