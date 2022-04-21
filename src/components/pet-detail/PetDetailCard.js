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
import { editPet } from '../../lib/api/pet';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import DetailImages from '../UI/DetailImages/DetailImages';

const PetDetailCard = ({ pet, petTypes = [], allBreeds = [] }) => {
  const navigate = useNavigate();
  const { sendRequest, data, status, error } = useHttp(editPet);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const [gender, setGender] = useState(pet.gender);
  const [files, setFiles] = useState(pet.photos.map(() => null));
  const [photoUrls, setPhotoUrls] = useState(pet.photos.map((x) => x.url));
  const [type, setType] = useState(petTypes.find((x) => x.id === pet.type.id));
  const [breed, setSubCategory] = useState(
    allBreeds.find((x) => x.id === pet.breed.id)
  );
  const [breeds, setBreeds] = useState(() => {
    const newBreeds = [];
    for (let i = 0; i < allBreeds.length; i++) {
      if (allBreeds[i].type.id === type.id) {
        newBreeds.push(allBreeds[i]);
      }
    }
    return newBreeds;
  });

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
      id: pet.id,
      ...data,
      gender,
      type,
      breed,
      files,
      photoUrls,
    });
    sendRequest({
      id: pet.id,
      ...data,
      gender,
      type,
      breed,
      files,
      photoUrls,
    });
  };

  useEffect(() => {
    const newBreeds = [];
    for (let i = 0; i < allBreeds.length; i++) {
      if (allBreeds[i].type.id === type?.id) {
        newBreeds.push(allBreeds[i]);
      }
    }
    setBreeds(newBreeds);
  }, [allBreeds, type]);

  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal(
        'Cập nhật thông tin thú cưng thành công',
        'Thành công',
        'success'
      );
      navigate('/pet');
    };
    if (status === 'completed') {
      if (data) {
        showSuccessMsg();
      } else if (error) swal('Đã có lỗi xảy ra', 'Thất bại', 'error');
    }
  }, [status, data, error, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'pending' && <LinearProgress />}
      <Card variant='outlined'>
        <CardHeader
          title={<Typography variant='h6'>Thông tin thú cưng</Typography>}
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
                    setPhotoUrls(pet.photos.map((x) => x.url));
                    setFiles(pet.photos.map(() => null));
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
              <DetailImages
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
                    required
                    disabled={!edit}
                    defaultValue={pet?.name}
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
                    fullWidth
                    id='tags-outlined'
                    options={petTypes}
                    getOptionLabel={(option) => option.name}
                    value={type}
                    onChange={(event, newValue) => {
                      setType(newValue);
                      setSubCategory(null);
                    }}
                    filterSelectedOptions
                    required
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Danh mục phụ
                  </Typography>
                  <Autocomplete
                    disabled={!edit}
                    fullWidth
                    id='tags-outlined'
                    options={breeds}
                    getOptionLabel={(option) => option.name}
                    value={breed}
                    onChange={(event, newValue) => {
                      setSubCategory(newValue);
                    }}
                    filterSelectedOptions
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Giá
                  </Typography>
                  <TextField
                    required
                    disabled={!edit}
                    type='number'
                    defaultValue={pet?.price}
                    {...register('price')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Tuổi
                  </Typography>
                  <TextField
                    required
                    type='number'
                    disabled={!edit}
                    defaultValue={pet?.age}
                    {...register('age')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Giới tính
                  </Typography>
                  <Autocomplete
                    value={gender}
                    disabled={!edit}
                    fullWidth
                    onChange={(event, newValue) => {
                      setGender(newValue);
                    }}
                    id='pet-type'
                    options={['Đực', 'Cái']}
                    renderInput={(params) => (
                      <TextField required {...params} label='Giới tính' />
                    )}
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
                    defaultValue={pet?.describe}
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

export default PetDetailCard;
