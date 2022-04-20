import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { editProduct } from '../../lib/api/product';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import ProductDetailImages from './ProductDetailImages';

const ProductDetailCard = ({ product, categories = [] }) => {
  const { sendRequest, data, status, error } = useHttp(editProduct);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState(product.photos.map(() => null));

  const [photoUrls, setPhotoUrls] = useState(product.photos.map((x) => x.url));
  const [selectedCategories, setSelectedCategories] = React.useState(
    categories.filter((x) => {
      return product.categories.map((x) => x.id).includes(x.id);
    })
  );
  const handleAddImages = (files, urls) => {
    setFiles((prev) => [...prev, ...files]);
    setPhotoUrls((prev) => [...prev, ...urls]);
  };
  const handleDelImages = (index) => {
    console.log(index);
    const newFiles = [...files];
    const newPhotoUrls = [...photoUrls];
    newFiles.splice(index, 1);
    newPhotoUrls.splice(index, 1);
    setPhotoUrls(newPhotoUrls);
    setFiles(newFiles);
  };
  const onSubmit = (data) => {
    console.log({
      id: product.id,
      ...data,
      selectedCategories,
      files,
      photoUrls,
    });
    sendRequest({
      id: product.id,
      ...data,
      selectedCategories,
      files,
      photoUrls,
    });
  };

  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal(
        'Cập nhật thông tin sản phẩm thành công',
        'Thành công',
        'success'
      );
      window.location.reload();
    };
    if (status === 'completed') {
      if (data) {
        showSuccessMsg();
      } else if (error) swal('Đã có lỗi xảy ra', 'Thất bại', 'error');
    }
  }, [status, data, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'pending' && <LinearProgress />}
      <Card variant='outlined'>
        <CardHeader
          title={<Typography variant='h6'>Thông tin sản phẩm</Typography>}
          action={
            !edit ? (
              <Button
                variant='text'
                onClick={() => {
                  setEdit(true);
                }}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <Stack direction='row'>
                <Button
                  onClick={() => {
                    setEdit(false);
                    setPhotoUrls(product.photos.map((x) => x.url));
                    setFiles(product.photos.map(() => null));
                  }}
                  variant='text'
                >
                  Hủy
                </Button>
                <Button
                  disabled={status === 'pending'}
                  type='submit'
                  variant='contained'
                >
                  Lưu
                </Button>
              </Stack>
            )
          }
        />
        <Divider />
        <CardContent>
          <Grid container>
            <Grid item md={3} sm={12}>
              <ProductDetailImages
                onAdd={handleAddImages}
                onDelete={handleDelImages}
                images={photoUrls}
                setPhotoUrls={setPhotoUrls}
                edit={edit}
              />
            </Grid>
            <Grid item md={1} sm={0}></Grid>
            <Grid item md={8} sm={12}>
              <Stack spacing={2}>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Tên sản phẩm
                  </Typography>
                  <TextField
                    disabled={!edit}
                    defaultValue={product?.name}
                    {...register('name')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Danh mục
                  </Typography>
                  <Autocomplete
                    disabled={!edit}
                    multiple
                    fullWidth
                    id='tags-outlined'
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    value={selectedCategories}
                    onChange={(event, newValue) => {
                      setSelectedCategories(newValue);
                    }}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Giá
                  </Typography>
                  <TextField
                    disabled={!edit}
                    type='number'
                    defaultValue={product?.price}
                    {...register('price')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Số lượng
                  </Typography>
                  <TextField
                    type='number'
                    disabled={!edit}
                    defaultValue={product?.quantity}
                    {...register('quantity')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Mô tả
                  </Typography>
                  <TextField
                    disabled={!edit}
                    {...register('describe')}
                    fullWidth
                    defaultValue={product?.describe}
                    size='small'
                    multiline
                    minRows={4}
                    maxRows={8}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ProductDetailCard.propTypes = {
  product: PropTypes.shape(),
  categories: PropTypes.arrayOf(PropTypes.shape()),
};

export default ProductDetailCard;
