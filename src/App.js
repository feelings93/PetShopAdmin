import React from 'react';
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
import OrderContextProvider from './store/order-context';
import OrderDetail from './pages/OrderDetail';
import ProductDetail from './pages/ProductDetail';
import PetType from './pages/PetType';
import PetTypeContextProvider from './store/pet-type-context';
import BreedContextProvider from './store/breed-context';
import Breed from './pages/Breed';
import SubCategoryContextProvider from './store/sub-category';
import SubCategory from './pages/SubCategory';
import Employee from './pages/Employee';
import EmployeeContextProvider from './store/employee-context';
import { useAuth } from './hooks/use-auth';
import PetContextProvider from './store/pet-context';
import Pet from './pages/Pet';
import PetDetail from './pages/PetDetail';
import ServiceContextProvider from './store/service-context';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';

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
            <Route path='pet/:id' element={<PetDetail />} />
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
              path='breed'
              element={
                <BreedContextProvider>
                  <Breed />
                </BreedContextProvider>
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
            <Route
              path='sub-category'
              element={
                <SubCategoryContextProvider>
                  <SubCategory />
                </SubCategoryContextProvider>
              }
            />
            <Route
              path='employee'
              element={
                <EmployeeContextProvider>
                  <Employee />
                </EmployeeContextProvider>
              }
            />
            <Route
              path='pet'
              element={
                <PetContextProvider>
                  <Pet />
                </PetContextProvider>
              }
            />
            <Route
              path='service'
              element={
                <ServiceContextProvider>
                  <Service />
                </ServiceContextProvider>
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
