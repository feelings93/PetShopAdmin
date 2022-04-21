import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { BreedContext } from '../../store/breed-context';
import { editBreed } from '../../lib/api/breed';

const EditBreedForm = () => {
  const breedCtx = useContext(BreedContext);
  const { editBreedObj, handleEditBreed, handleCloseEdit, openEdit } = breedCtx;
  const { data, error, sendRequest, status } = useHttp(editBreed);
  const [name, setName] = React.useState(editBreedObj.name);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ id: breedCtx.editBreedObj.id, name });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa giống thú cưng  thành công',
          'success'
        );
        handleEditBreed(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditBreed, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chỉnh sửa giống thú cưng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editBreedObj.id} />
            <TextField
              required
              id='name'
              label='Tên giống thú cưng'
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
            {status === 'pending' ? 'Đang lưu' : 'Cập nhật'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditBreedForm;
