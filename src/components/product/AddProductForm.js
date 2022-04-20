import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { ProductContext } from '../../store/product-context';
import { createProduct } from '../../lib/api/product';
import { getCategories } from '../../lib/api/category';
import DropzoneImage from '../UI/Dropzone';
const AddProductForm = () => {
  const productCtx = useContext(ProductContext);
  const { handleAddProduct, handleCloseAdd } = productCtx;
  const { data, error, sendRequest, status } = useHttp(createProduct);
  const {
    data: dataCategories,
    error: errorCategories,
    sendRequest: sendCategories,
    status: statusCategories,
  } = useHttp(getCategories, true);

  const [name, setName] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [quantity, setQuantity] = React.useState(undefined);
  const [price, setPrice] = React.useState(undefined);
  const [files, setFiles] = React.useState([]);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleChangeFiles = (files) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ name, selectedCategories, files, price, quantity });
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
        swal('Thành công', 'Bạn đã thêm sản phẩm thành công', 'success');
        handleAddProduct(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddProduct, handleCloseAdd]);

  return (
    <Dialog maxWidth='md' open={true}>
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
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                required
                id='name'
                label='Tên sản phẩm'
                value={name}
                onChange={handleChangeName}
              />
              <TextField
                required
                type='number'
                id='price'
                label='Giá'
                value={price}
                onChange={handleChangePrice}
              />
              <TextField
                required
                type='number'
                id='quantity'
                label='Số lượng'
                value={quantity}
                onChange={handleChangeQuantity}
              />
              <Autocomplete
                multiple
                id='tags-outlined'
                options={categories}
                getOptionLabel={(option) => option.name}
                value={selectedCategories}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setSelectedCategories(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Chọn danh mục'
                    placeholder='Danh mục'
                  />
                )}
              />
              <Stack spacing={1}>
                <Typography variant='body2'>Chọn hình ảnh</Typography>
              </Stack>
              <DropzoneImage onChange={handleChangeFiles} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' type='submit'>
              Thêm
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

export default AddProductForm;
