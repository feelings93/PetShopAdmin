import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { getUsers } from '../lib/api/user';
import { UserContext } from '../store/user-context';
import UserGrid from '../components/user/UserGrid';
import AddUserForm from '../components/user/AddUserForm';
import EditUserForm from '../components/user/EditUserForm';
import DelUserForm from '../components/user/DelUserForm';
import ActiveUserForm from '../components/user/ActiveUserForm';
import LoadingBox from '../components/UI/LoadingBox';

const User = () => {
  const { data, error, status, sendRequest } = useHttp(getUsers, true);
  const userCtx = useContext(UserContext);
  const {
    setUsers,
    openAdd,
    openEdit,
    openDelete,
    openActive,
    handleOpenAdd,
    setQuery,
    query,
  } = userCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setUsers(data);
    }
  }, [data, status, setUsers]);

  if (status === 'pending') return <LoadingBox/>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <>
      <Stack
        mb={2}
        justifyContent='space-between'
        alignItems='center'
        direction='row'
      >
        <h3>Người dùng</h3>
        <Stack spacing={1} alignItems='center' direction='row'>
          <TextField
            size='small'
            id='search'
            label='Tìm kiếm'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOpenAdd}
            sx={{ color: '#fff' }}
            variant='contained'
            color='success'
          >
            Thêm
          </Button>
        </Stack>
      </Stack>
      <UserGrid />
      {openAdd && <AddUserForm />}
      {openEdit && <EditUserForm />}
      {openDelete && <DelUserForm />}
      {openActive && <ActiveUserForm />}
    </>
  );
};

export default User;
