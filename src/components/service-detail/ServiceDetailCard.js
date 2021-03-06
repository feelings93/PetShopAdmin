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
import { editService } from '../../lib/api/service';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import DetailImages from '../UI/DetailImages/DetailImages';

const ServiceDetailCard = ({ service, employees = [] }) => {
  const navigate = useNavigate();
  const { sendRequest, data, status, error } = useHttp(editService);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState(service.photos.map(() => null));
  const [photoUrls, setPhotoUrls] = useState(service.photos.map((x) => x.url));
  const [selectedEmployees, setSelectedEmployees] = useState(
    employees.filter((x) => {
      return service.employeeToServices
        .map((i) => i.employee.id)
        .includes(x.id);
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
    sendRequest({
      id: service.id,
      ...data,
      employees: selectedEmployees,
      files,
      photoUrls,
    });
  };

  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal(
        'C???p nh???t th??ng tin d???ch v??? th??nh c??ng',
        'Th??nh c??ng',
        'success'
      );
      navigate('/service');
    };
    if (status === 'completed') {
      if (data) {
        showSuccessMsg();
      } else if (error) swal('???? c?? l???i x???y ra', 'Th???t b???i', 'error');
    }
  }, [status, data, error, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'pending' && <LinearProgress />}
      <Card variant='outlined'>
        <CardHeader
          title={<Typography variant='h6'>Th??ng tin d???ch v???</Typography>}
          action={
            !edit ? (
              <Button
                variant='text'
                onClick={() => {
                  setEdit(true);
                }}
              >
                Ch???nh s???a
              </Button>
            ) : (
              <Stack direction='row'>
                <Button
                  onClick={() => {
                    setEdit(false);
                    setPhotoUrls(service.photos.map((x) => x.url));
                    setFiles(service.photos.map(() => null));
                  }}
                  variant='text'
                >
                  H???y
                </Button>
                <Button
                  disabled={status === 'pending'}
                  type='submit'
                  variant='contained'
                >
                  L??u
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
                    T??n d???ch v???
                  </Typography>
                  <TextField
                    required
                    disabled={!edit}
                    defaultValue={service?.name}
                    {...register('name')}
                    fullWidth
                    size='small'
                  />
                </Stack>

                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Nh??n vi??n l??m
                  </Typography>
                  <Autocomplete
                    disabled={!edit}
                    multiple
                    fullWidth
                    id='tags-outlined'
                    options={employees}
                    getOptionLabel={(option) =>
                      option.lastName + ' ' + option.firstName
                    }
                    value={selectedEmployees}
                    onChange={(event, newValue) => {
                      setSelectedEmployees(newValue);
                    }}
                    filterSelectedOptions
                    required
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    Gi??
                  </Typography>
                  <TextField
                    required
                    disabled={!edit}
                    type='number'
                    defaultValue={service?.price}
                    {...register('price')}
                    fullWidth
                    size='small'
                  />
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography width='200px' variant='subtitle1'>
                    M?? t???
                  </Typography>
                  <TextField
                    disabled={!edit}
                    {...register('describe')}
                    fullWidth
                    defaultValue={service?.describe}
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

ServiceDetailCard.propTypes = {
  service: PropTypes.shape(),
  employees: PropTypes.arrayOf(PropTypes.shape()),
};

export default ServiceDetailCard;
