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
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';

import DropzoneImage from '../UI/Dropzone';
import { PetContext } from '../../store/pet-context';
import { createPet } from '../../lib/api/pet';
import { getBreeds } from '../../lib/api/breed';
import { getPetTypes } from '../../lib/api/pet-type';
import { useForm } from 'react-hook-form';

const AddPetForm = () => {
  const { register, handleSubmit } = useForm();
  const petCtx = useContext(PetContext);
  const { handleAddPet, handleCloseAdd } = petCtx;
  const { data, error, sendRequest, status } = useHttp(createPet);
  const {
    data: dataBreeds,
    error: errorBreeds,
    sendRequest: sendBreeds,
    status: statusBreeds,
  } = useHttp(getBreeds, true);
  const {
    data: dataPetTypes,
    error: errorPetTypes,
    sendRequest: sendPetTypes,
    status: statusPetTypes,
  } = useHttp(getPetTypes, true);

  const [type, setType] = useState(null);
  const [types, setTypes] = useState([]);
  const [breed, setBreed] = useState(null);
  const [gender, setGender] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [files, setFiles] = React.useState([]);

  const handleChangeFiles = (files) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const onSubmit = (data) => {
    sendRequest({
      ...data,
      gender,
      type,
      breed,
      files,
    });
  };

  React.useEffect(() => {
    sendBreeds();
    sendPetTypes();
  }, [sendBreeds, sendPetTypes]);

  React.useEffect(() => {
    if (
      (statusBreeds === 'completed' && (!dataBreeds || errorBreeds)) ||
      (statusPetTypes === 'completed' && (!dataPetTypes || errorPetTypes))
    ) {
      swal('L???i', '???? c?? l???i x???y ra', 'error');
      handleCloseAdd();
    } else if (
      statusPetTypes === 'completed' &&
      dataPetTypes &&
      statusBreeds === 'completed' &&
      dataBreeds
    ) {
      setBreeds(dataBreeds);
      setTypes(dataPetTypes);
    }
  }, [
    dataBreeds,
    statusBreeds,
    errorBreeds,
    handleCloseAdd,
    statusPetTypes,
    dataPetTypes,
    errorPetTypes,
  ]);

  useEffect(() => {
    if (statusBreeds === 'completed' && dataBreeds) {
      const newBreeds = [];
      for (let i = 0; i < dataBreeds.length; i++) {
        if (dataBreeds[i].type.id === type?.id) {
          newBreeds.push(dataBreeds[i]);
        }
      }
      setBreeds(newBreeds);
    }
  }, [dataBreeds, statusBreeds, type]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Th??nh c??ng', 'B???n ???? th??m th?? c??ng th??nh c??ng', 'success');
        handleAddPet(data);
        handleCloseAdd();
      } else if (error) swal('Th???t b???i', '???? c?? l???i x???y ra', 'error');
    }
  }, [data, status, error, handleAddPet, handleCloseAdd]);

  return (
    <Dialog maxWidth='md' open={true}>
      {status === 'pending' && <LinearProgress />}

      {statusBreeds === 'pending' || statusPetTypes === 'pending' ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Th??m th?? c??ng</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                {...register('name')}
                required
                id='name'
                label='T??n th?? c??ng'
              />

              <TextField
                {...register('age')}
                required
                type='number'
                id='age'
                label='Tu???i'
              />
              <Autocomplete
                value={gender}
                onChange={(event, newValue) => {
                  setGender(newValue);
                }}
                id='pet-type'
                options={['?????c', 'C??i']}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField required {...params} label='Gi???i t??nh' />
                )}
              />
              <TextField
                {...register('price')}
                required
                type='number'
                id='price'
                label='Gi??'
              />
              <Autocomplete
                id='tags-outlined'
                options={types}
                getOptionLabel={(option) => option.name}
                value={type}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setType(newValue);
                  setBreed(null);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label='Ch???n lo???i th?? c??ng'
                    placeholder='Lo???i th?? c??ng'
                  />
                )}
              />
              <Autocomplete
                id='tags-outlined'
                options={breeds}
                getOptionLabel={(option) => option.name}
                value={breed}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setBreed(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Ch???n gi???ng'
                    placeholder='Gi???ng'
                  />
                )}
              />
              <TextField
                {...register('describe')}
                required
                id='describe'
                label='M?? t???'
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

export default AddPetForm;
