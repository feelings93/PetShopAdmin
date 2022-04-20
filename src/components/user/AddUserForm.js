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

const options = [
  { label: 'admin', id: 1 },
  { label: 'user', id: 2 },
];

const AddUserForm = () => {
  const userCtx = useContext(UserContext);
  const { handleAddUser, handleCloseAdd, openAdd } = userCtx;
  const { data, error, sendRequest, status } = useHttp(createUser);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [role, setRole] = React.useState(null);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
    sendRequest({ name, email, password, phone, address, role: role.label });
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
      <form onSubmit={handleSubmit}>
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              id='name'
              label='Họ tên'
              required
              value={name}
              onChange={handleChangeName}
            />
            <TextField
              id='email'
              label='Email'
              type='email'
              required
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField
              id='password'
              type='password'
              required
              label='Password'
              value={password}
              onChange={handleChangePassword}
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
