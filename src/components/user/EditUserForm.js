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
import Autocomplete from '@mui/material/Autocomplete';
import useHttp from '../../hooks/use-http';
import { editUser } from '../../lib/api/user';
import { UserContext } from '../../store/user-context';
import { useForm } from 'react-hook-form';

const options = [
  { label: 'Admin', id: 1 },
  { label: 'Quản lý', id: 2 },
];

const EditUserForm = () => {
  const { handleSubmit, register } = useForm();
  const userCtx = useContext(UserContext);
  const { editUserObj, handleEditUser, handleCloseEdit, openEdit } = userCtx;
  const { data, error, sendRequest, status } = useHttp(editUser);
  const [role, setRole] = React.useState(
    options.find((x) => x.label === editUserObj.role)
  );

  const onSubmit = (data) => {
    sendRequest({
      id: editUserObj.id,
      ...data,
      role: role.label,
    });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin người dùng thành công',
          'success'
        );
        handleEditUser(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditUser, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editUserObj.id} />
            <TextField
              {...register('lastName')}
              id='lastName'
              label='Họ'
              defaultValue={editUserObj.lastName}
            />
            <TextField
              {...register('firstName')}
              id='firstName'
              label='Tên'
              defaultValue={editUserObj.firstName}
            />
            <TextField
              {...register('email')}
              disabled
              id='email'
              label='Email'
              defaultValue={editUserObj.email}
            />
            <TextField
              {...register('phone')}
              id='phone'
              label='Số điện thoại'
              defaultValue={editUserObj.phone}
            />
            <Autocomplete
              disablePortal
              id='role'
              options={options}
              value={role}
              onChange={(e, value) => setRole(value)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField required {...params} label='Vai trò' />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang lưu' : 'Xác nhận'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserForm;
