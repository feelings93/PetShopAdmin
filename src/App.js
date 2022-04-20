import React, { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import Order from './pages/Order';
import Overview from './pages/Overview';
import CategoryContextProvider from './store/category-context';
import User from './pages/User';
import UserContextProvider from './store/user-context';
import ProductContextProvider from './store/product-context';
import { AuthContext } from './store/auth-context';
import OrderContextProvider from './store/order-context';
import OrderDetail from './pages/OrderDetail';
import ProductDetail from './pages/ProductDetail';
import useHttp from './hooks/use-http';
import { getProfile } from './lib/api/auth';
import PetType from './pages/PetType';
import PetTypeContextProvider from './store/pet-type-context';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Inter, san-serif',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'contained',
            style: {
              color: '#fff',
            },
          },
        },
      ],
    },
  },
});

function PrivateAdminOutlet() {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  return user ? <Outlet /> : <Navigate to='/login' />;
}

function RedirectWhenSignedInRoute() {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  return !user ? <Outlet /> : <Navigate to='/' />;
}

function App() {
  const authCtx = useContext(AuthContext);
  const { setUser, user } = authCtx;
  const { data, status, sendRequest } = useHttp(getProfile, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      }
    }
  }, [data, status, setUser]);
  if (status === 'pending') return <h1>Loading</h1>;
  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<RedirectWhenSignedInRoute />}>
          <Route exact path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateAdminOutlet />}>
          <Route exact path='/' element={<MainLayout />}>
            <Route path='' element={<Navigate to='overview' />} />
            <Route
              path='product'
              element={
                <ProductContextProvider>
                  <Product />
                </ProductContextProvider>
              }
            />
            <Route
              path='user'
              element={
                <UserContextProvider>
                  <User />
                </UserContextProvider>
              }
            />
            <Route
              path='order'
              element={
                <OrderContextProvider>
                  <Order />
                </OrderContextProvider>
              }
            />
            <Route path='order/:id' element={<OrderDetail />} />
            <Route path='product/:id' element={<ProductDetail />} />

            <Route path='overview' element={<Overview />} />
            <Route
              path='pet-type'
              element={
                <PetTypeContextProvider>
                  <PetType />
                </PetTypeContextProvider>
              }
            />
            <Route
              path='category'
              element={
                <CategoryContextProvider>
                  <Category />
                </CategoryContextProvider>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
