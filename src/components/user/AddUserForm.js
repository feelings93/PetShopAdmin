import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { UserContext } from '../../store/user-context';
import { createUser } from '../../lib/api/user';
import { useForm } from 'react-hook-form';

const options = [
  { label: 'Admin', id: 1 },
  { label: 'Quản lý', id: 2 },
];

const AddUserForm = () => {
  const { handleSubmit, register } = useForm();
  const userCtx = useContext(UserContext);
  const { handleAddUser, handleCloseAdd, openAdd } = userCtx;
  const { data, error, sendRequest, status } = useHttp(createUser);
  const [role, setRole] = React.useState(null);

  const handleChangeRole = (e, value) => {
    setRole(value);
  };

  const onSubmit = (data) => {
    sendRequest({ ...data, role: role.label });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm người dùng mới thành công', 'success');
        handleAddUser(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddUser, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('lastName')}
              id='lastName'
              label='Họ'
              required
            />
            <TextField
              {...register('firstName')}
              id='firstName'
              label='Tên'
              required
            />
            <TextField
              {...register('email')}
              id='email'
              label='Email'
              type='email'
              required
            />
            <TextField
              {...register('password')}
              id='password'
              type='password'
              required
              label='Password'
            />
            <Autocomplete
              disablePortal
              id='role'
              options={options}
              value={role}
              onChange={handleChangeRole}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField required {...params} label='Vai trò' />
              )}
            />
            <TextField
              {...register('phone')}
              id='phone'
              label='Số điện thoại'
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang thêm' : 'Thêm'}
          </Button>
          <Button variant='text' onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserForm;
