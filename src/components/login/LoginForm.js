import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import {
  AlternateEmail,
  RemoveRedEye,
  VisibilityOff,
} from '@mui/icons-material';

import swal from 'sweetalert';
import useHttp from '../../hooks/use-http';
import { login } from '../../lib/api/auth';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { data, error, status, sendRequest } = useHttp(login);
  const { handleSubmit, register } = useForm();
  const [isShowPass, setIsShowPass] = React.useState(false);

  const handleShowPass = () => {
    setIsShowPass((prev) => !prev);
  };

  const onSubmit = (data) => {
    sendRequest(data);
  };
  React.useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        console.log(data);
        window.localStorage.setItem('accessToken', data.accessToken);
        window.location.reload();
      } else {
        swal('Đã có lỗi xảy ra', error, 'error');
      }
    }
  }, [data, error, status]);

  return (
    <Box
      px={3}
      py={4}
      maxWidth='322px'
      display='flex'
      m='auto'
      flexDirection='column'
      sx={{ backgroundColor: '#fff', borderRadius: 4 }}
      justifyContent='space-between'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' spacing={4}>
          <Typography variant='h6'>Đăng nhập</Typography>
          <TextField
            {...register('email')}
            type='email'
            id='email'
            label='Email'
            variant='outlined'
            size='medium'
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('password')}
            type={isShowPass ? 'text' : 'password'}
            id='password'
            label='Password'
            required
            size='medium'
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton sx={{ p: 0 }} onClick={handleShowPass}>
                    {isShowPass ? <VisibilityOff /> : <RemoveRedEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            size='large'
            variant='contained'
            disabled={status === 'pending'}
          >
            {status === 'pending' ? 'Đang đăng nhập' : 'Đăng nhập'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
