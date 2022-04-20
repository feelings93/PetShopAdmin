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
import { BreedContext } from '../../store/breed-context';
import { createBreed } from '../../lib/api/breed';
import { getPetTypes } from '../../lib/api/pet-type';

const AddBreedForm = () => {
  const breedCtx = useContext(BreedContext);
  const { handleAddBreed, handleCloseAdd, openAdd } = breedCtx;
  const { data, error, sendRequest, status } = useHttp(createBreed);
  const [petTypes, setPetTypes] = React.useState([]);
  const [petType, setPetType] = React.useState(null);
  const {
    data: dataPetTypes,
    error: errorPetTypes,
    sendRequest: sendPetTypes,
    status: statusPetTypes,
  } = useHttp(getPetTypes, true);
  const [name, setName] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ name, typeId: petType.id });
  };

  React.useEffect(() => {
    sendPetTypes();
  }, [sendPetTypes]);

  React.useEffect(() => {
    if (statusPetTypes === 'completed' && dataPetTypes) {
      setPetTypes(dataPetTypes);
    } else if (statusPetTypes === 'error' && errorPetTypes) {
      swal('Lỗi', 'Đã có lỗi xảy ra', 'error');
      handleCloseAdd();
    }
  }, [
    dataPetTypes,
    statusPetTypes,
    setPetTypes,
    errorPetTypes,
    handleCloseAdd,
  ]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm giống thú cưng mới thành công',
          'success'
        );
        handleAddBreed(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddBreed, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      {statusPetTypes === 'pending' ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle>Thêm giống thú cưng</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                required
                id='name'
                label='Tên giống thú cưng'
                value={name}
                onChange={handleChangeName}
              />
              <Autocomplete
                value={petType}
                onChange={(event, newValue) => {
                  setPetType(newValue);
                }}
                id='pet-type'
                options={petTypes}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField required {...params} label='Loại thú cưng' />
                )}
              />
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

export default AddBreedForm;
