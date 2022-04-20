import React from 'react';
import Box from '@mui/material/Box';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
  console.log('login');
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#09101D',
        display: 'flex',
        width: '100vw',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
