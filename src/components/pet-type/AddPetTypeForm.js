import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { PetTypeContext } from '../../store/pet-type-context';
import { createPetType } from '../../lib/api/pet-type';

const AddPetTypeForm = () => {
  const petTypeCtx = useContext(PetTypeContext);
  const { handleAddPetType, handleCloseAdd, openAdd } = petTypeCtx;
  const { data, error, sendRequest, status } = useHttp(createPetType);
  const [name, setName] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ name });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm loại thú cưng mới thành công',
          'success'
        );
        handleAddPetType(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddPetType, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Thêm loại thú cưng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              required
              id='name'
              label='Tên loại thú cưng'
              value={name}
              onChange={handleChangeName}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang thêm...' : 'Thêm'}
          </Button>
          <Button variant='text' onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPetTypeForm;
