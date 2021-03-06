import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../../hooks/use-http';
import { ProductContext } from '../../store/product-context';
import { createProduct } from '../../lib/api/product';
import { getCategories } from '../../lib/api/category';
import DropzoneImage from '../UI/Dropzone';
import { getSubCategories } from '../../lib/api/sub-category';

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
  const {
    data: dataSubCategories,
    error: errorSubCategories,
    sendRequest: sendSubCategories,
    status: statusSubCategories,
  } = useHttp(getSubCategories, true);

  const [name, setName] = React.useState('');
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [quantity, setQuantity] = React.useState(undefined);
  const [describe, setDescribe] = React.useState('');
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
    sendRequest({
      name,
      category,
      subCategory,
      files,
      price,
      quantity,
    });
  };

  React.useEffect(() => {
    sendCategories();
    sendSubCategories();
  }, [sendCategories, sendSubCategories]);

  React.useEffect(() => {
    if (
      (statusCategories === 'completed' &&
        (!dataCategories || errorCategories)) ||
      (statusSubCategories === 'completed' &&
        (!dataSubCategories || errorSubCategories))
    ) {
      swal('L???i', '???? c?? l???i x???y ra', 'error');
      handleCloseAdd();
    } else if (
      statusSubCategories === 'completed' &&
      dataSubCategories &&
      statusCategories === 'completed' &&
      dataCategories
    ) {
      setSubCategories(dataSubCategories);
      setCategories(dataCategories);
    }
  }, [
    dataCategories,
    statusCategories,
    errorCategories,
    handleCloseAdd,
    statusSubCategories,
    dataSubCategories,
    errorSubCategories,
  ]);

  useEffect(() => {
    if (statusSubCategories === 'completed' && dataSubCategories) {
      const newSubCategories = [];
      for (let i = 0; i < dataSubCategories.length; i++) {
        if (dataSubCategories[i].category.id === category?.id) {
          newSubCategories.push(dataSubCategories[i]);
        }
      }
      setSubCategories(newSubCategories);
    }
  }, [dataSubCategories, category, statusSubCategories]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Th??nh c??ng', 'B???n ???? th??m s???n ph???m th??nh c??ng', 'success');
        handleAddProduct(data);
        handleCloseAdd();
      } else if (error) swal('Th???t b???i', '???? c?? l???i x???y ra', 'error');
    }
  }, [data, status, error, handleAddProduct, handleCloseAdd]);

  return (
    <Dialog maxWidth='md' open={true}>
      {status === 'pending' && <LinearProgress />}

      {statusCategories === 'pending' || statusSubCategories === 'pending' ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle>Th??m s???n ph???m</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                required
                id='name'
                label='T??n s???n ph???m'
                value={name}
                onChange={handleChangeName}
              />
              <TextField
                required
                type='number'
                id='price'
                label='Gi??'
                value={price}
                onChange={handleChangePrice}
              />
              <TextField
                required
                type='number'
                id='quantity'
                label='S??? l?????ng'
                value={quantity}
                onChange={handleChangeQuantity}
              />
              <Autocomplete
                id='tags-outlined'
                options={categories}
                getOptionLabel={(option) => option.name}
                value={category}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setCategory(newValue);
                  setSubCategory(null);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label='Ch???n danh m???c'
                    placeholder='Danh m???c'
                  />
                )}
              />
              <Autocomplete
                id='tags-outlined'
                options={subCategories}
                getOptionLabel={(option) => option.name}
                value={subCategory}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setSubCategory(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Ch???n danh m???c'
                    placeholder='Danh m???c'
                  />
                )}
              />
              <TextField
                required
                id='describe'
                label='M?? t???'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
              <Stack spacing={1}>
                <Typography variant='body2'>Ch???n h??nh ???nh</Typography>
              </Stack>
              <DropzoneImage onChange={handleChangeFiles} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant='contained'
              type='submit'
            >
              {status === 'pending' ? '??ang th??m...' : 'Th??m'}
            </Button>
            <Button variant='text' onClick={handleCloseAdd}>
              H???y b???
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default AddProductForm;
