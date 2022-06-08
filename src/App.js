import React from 'react';
import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import Overview from './pages/Overview';
import User from './pages/User';
import UserContextProvider from './store/user-context';
import OrderContextProvider from './store/order-context';
import OrderDetail from './pages/OrderDetail';
import ProductDetail from './pages/ProductDetail';
import Employee from './pages/Employee';
import EmployeeContextProvider from './store/employee-context';
import { useAuth } from './hooks/use-auth';
import PetDetail from './pages/PetDetail';
import ServiceContextProvider from './store/service-context';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';
import Customer from './pages/Customer';
import CustomerContextProvider from './store/customer-context';
import PetAndRelations from './pages/PetAndRelations';
import ProductAndRelations from './pages/ProductAndRelations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3AA3CC',
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
          },
          style: {
            color: '#fff',
          },
        },
      ],
    },
  },
});

function PrivateAdminOutlet() {
  const [data, status] = useAuth();
  if (status === 'pending') return <h1>Loading</h1>;
  return data ? <Outlet /> : <Navigate to='/login' />;
}

function RedirectWhenSignedInRoute() {
  const [data, status] = useAuth();
  if (status === 'pending') return <h1>Loading</h1>;
  return !data ? <Outlet /> : <Navigate to='/' />;
}

function App() {
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
            <Route path='product' element={<ProductAndRelations />} />
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
            <Route path='pet/:id' element={<PetDetail />} />
            <Route path='overview' element={<Overview />} />
            <Route
              path='employee'
              element={
                <EmployeeContextProvider>
                  <Employee />
                </EmployeeContextProvider>
              }
            />
            <Route path='pet' element={<PetAndRelations />} />
            <Route
              path='service'
              element={
                <ServiceContextProvider>
                  <Service />
                </ServiceContextProvider>
              }
            />
            <Route
              path='customer'
              element={
                <CustomerContextProvider>
                  <Customer />
                </CustomerContextProvider>
              }
            />
            <Route path='service/:id' element={<ServiceDetail />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
