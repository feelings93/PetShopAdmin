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

const options = [
  { label: 'admin', id: 1 },
  { label: 'user', id: 2 },
];

const EditUserForm = () => {
  const userCtx = useContext(UserContext);
  const { editUserObj, handleEditUser, handleCloseEdit, openEdit } = userCtx;
  const { data, error, sendRequest, status } = useHttp(editUser);
  const [name, setName] = React.useState(editUserObj.name);
  const [phone, setPhone] = React.useState(editUserObj.phone || '');
  const [address, setAddress] = React.useState(editUserObj.address || '');
  const [role, setRole] = React.useState(
    options.find((x) => x.label === editUserObj.role)
  );
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeRole = (e, value) => {
    setRole(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      id: editUserObj.id,
      name,
      email: editUserObj.email,
      phone,
      address,
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
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editUserObj.id} />
            <TextField
              id='name'
              label='Họ tên'
              value={name}
              onChange={handleChangeName}
            />
            <TextField
              disabled
              id='email'
              label='Email'
              value={editUserObj.email}
            />
            <TextField
              id='phone'
              label='Số điện thoại'
              value={phone}
              onChange={handleChangePhone}
            />
            <TextField
              id='address'
              label='Địa chỉ'
              value={address}
              onChange={handleChangeAddress}
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
