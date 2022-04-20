import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { updateProfile } from '../../lib/api/auth';
import useHttp from '../../hooks/use-http';
import LinearProgress from '@mui/material/LinearProgress';
import { useForm } from 'react-hook-form';

const EditProfileForm = ({ onClose, editUser }) => {
  const { sendRequest, status, data, error } = useHttp(updateProfile);
  const { register, handleSubmit } = useForm();

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        onClose();
        swal(
          'Cập nhật thành công!',
          'Bạn đã cập nhật thông tin cá nhân thành công',
          'success'
        );
        window.location.reload();
      } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
    }
  }, [data, error, status, onClose]);

  const onSubmit = (data) => sendRequest(data);
  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {status === 'pending' && <LinearProgress />}
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: '300px' }}>
            <TextField
              {...register('lastName')}
              required
              autoFocus
              margin='dense'
              id='lastName'
              label='Họ'
              type='text'
              variant='outlined'
              defaultValue={editUser.lastName}
            />
            <TextField
              {...register('firstName')}
              required
              autoFocus
              margin='dense'
              id='firstName'
              label='Tên'
              type='text'
              variant='outlined'
              defaultValue={editUser.firstName}
            />
            <TextField
              {...register('phone')}
              required
              autoFocus
              margin='dense'
              id='phone'
              label='Tên'
              type='text'
              variant='outlined'
              defaultValue={editUser.phone}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            type='submit'
            variant='contained'
          >
            {status === 'pending' ? 'Đang lưu...' : 'Xác nhận'}
          </Button>
          <Button onClick={onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditProfileForm.propTypes = {
  onClose: PropTypes.func,
  editUser: PropTypes.shape(),
};

export default EditProfileForm;
