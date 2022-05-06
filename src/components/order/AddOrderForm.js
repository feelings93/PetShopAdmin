import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import useHttp from '../../hooks/use-http';
import { OrderContext } from '../../store/order-context';
import { createOrder } from '../../lib/api/order';
import ProductTable from './ProductTable';
import { AddCircle } from '@mui/icons-material';
import provinces from '../../utils/nested-divisions.json';
import { useForm } from 'react-hook-form';
import PetTable from './PetTable';
import ServiceTable from './ServiceTable';

const paymentTypes = [
  {
    id: 1,
    label: 'Thanh toán khi nhận hàng',
  },
  {
    id: 2,
    label: 'Chuyển khoản',
  },
];

const orderTypes = [
  {
    id: 1,
    label: 'Online',
  },
  {
    id: 2,
    label: 'Offline',
  },
];

const AddOrderForm = () => {
  const { handleSubmit, register } = useForm();
  const orderCtx = useContext(OrderContext);
  const { handleAddOrder, handleCloseAdd, openAdd, products, pets, services } =
    orderCtx;
  const { data, error, sendRequest, status } = useHttp(createOrder);
  const [orderType, setOrderType] = React.useState(null);
  const [paymentType, setPaymentType] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [pet, setPet] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [employee, setEmployee] = React.useState(null);
  // const [customer, setCustomer] = React.useState(null);
  const [quantity, setQuantity] = React.useState('');
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedPets, setSelectedPets] = React.useState([]);
  const [selectedServices, setSelectedServices] = React.useState([]);

  const [province, setProvince] = React.useState(null);
  const [districts, setDistricts] = React.useState([]);
  const [district, setDistrict] = React.useState(null);
  const [communes, setCommunes] = React.useState([]);
  const [commune, setCommune] = React.useState(null);

  const handleChangeOrderType = (e, value) => {
    setOrderType(value);
  };

  const handleChangePaymentType = (e, value) => {
    setPaymentType(value);
  };

  const handleChangePet = (e, value) => {
    setPet(value);
  };

  const handleChangeProduct = (e, value) => {
    setProduct(value);
    setQuantity('');
  };

  const handleChangeService = (e, value) => {
    setService(value);
    setEmployee(null);
  };

  // const handleChangeCustomer = (e, value) => {
  //   setCustomer(value);
  // };

  const handleChangeProvince = (e, value) => {
    setProvince(value);
    setDistricts(value?.districts || []);
    setDistrict(null);
    setCommunes([]);
    setCommune(null);
  };

  const handleChangeDistrict = (e, value) => {
    setDistrict(value);
    setCommunes(value?.wards || []);
    setCommune(null);
  };

  const handleChangeCommune = (e, value) => {
    setCommune(value);
  };

  const handleChangeQuantity = (e) => {
    const quantity = e.target.value;
    if (
      (quantity > 0 &&
        quantity <=
          product.quantity -
            (selectedProducts.find((x) => x.productId === product.id)
              ?.quantity || 0)) ||
      !quantity
    )
      setQuantity(quantity);
  };

  const handleAddPet = () => {
    if (!pet) {
      swal('Lỗi', 'Vui lòng nhập đầy đủ thông tin thú cưng');
      return;
    }
    const petAdd = selectedPets.find((x) => x.petId === pet.id);
    if (petAdd) {
      swal('Lỗi', 'Thú cưng này đã được thêm rồi!');
      return;
    } else
      setSelectedPets((prev) => [
        ...prev,
        {
          petId: pet.id,
          name: pet.name,
          price: pet.price,
        },
      ]);
    setPet(null);
  };

  const handleDeletePet = (id) => {
    const newPets = selectedPets.filter((x) => x.petId !== id);
    setSelectedPets(newPets);
  };

  const handleAddService = () => {
    if (!service || !employee) {
      swal('Lỗi', 'Vui lòng nhập đầy đủ thông tin dịch vụ');
      return;
    }

    setSelectedServices((prev) => [
      ...prev,
      {
        serviceId: service.id,
        name: service.name,
        price: service.price,
        employee: employee,
      },
    ]);
    setService(null);
    setEmployee(null);
  };

  const handleDeleteService = (id) => {
    const newServices = selectedServices.filter((x) => x.petId !== id);
    setSelectedServices(newServices);
  };

  const handleAddProduct = () => {
    if (!product || !quantity) {
      swal('Lỗi', 'Vui lòng nhập đầy đủ thông tin sản phẩm');
      return;
    }
    const productAdd = selectedProducts.find((x) => x.productId === product.id);
    if (productAdd) {
      setSelectedProducts((prev) => {
        const index = prev.findIndex((x) => x.productId === product.id);
        const newProducts = [...prev];
        newProducts[index].quantity = +newProducts[index].quantity + +quantity;
        return newProducts;
      });
    } else
      setSelectedProducts((prev) => [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: +quantity,
          price: product.price,
        },
      ]);
    setProduct(null);
    setQuantity('');
  };

  const handleDeleteProduct = (id) => {
    console.log(id);
    const newProducts = selectedProducts.filter((x) => x.productId !== id);
    setSelectedProducts(newProducts);
  };

  const onSubmit = (data) => {
    if (
      selectedPets.length === 0 &&
      selectedServices.length === 0 &&
      selectedProducts.length === 0
    )
      swal('Lỗi', 'Vui lòng chọn mặt hàng!');
    else {
      sendRequest({
        orderType: orderType.label,
        paymentType: paymentType.label,
        products: selectedProducts.map((x) => ({
          id: x.productId,
          quantity: x.quantity,
        })),
        pets: selectedPets.map((x) => ({ id: x.petId })),
        services: selectedServices.map((x) => ({
          id: x.serviceId,
          doneBy: x.employee.id,
        })),
        province: province.name,
        district: district.name,
        commune: commune.name,
        ...data,
      });
    }
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm đơn hàng mới thành công', 'success');
        handleAddOrder(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddOrder, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm đơn hàng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              required
              id='name'
              label='Tên khách hàng'
              {...register('customerName')}
            />
            <TextField
              required
              id='email'
              label='Email'
              type='email'
              {...register('email')}
            />
            {selectedProducts.length > 0 && (
              <ProductTable
                products={selectedProducts}
                onDelete={handleDeleteProduct}
              />
            )}
            {selectedPets.length > 0 && (
              <PetTable pets={selectedPets} onDelete={handleDeletePet} />
            )}
            {selectedServices.length > 0 && (
              <ServiceTable
                services={selectedServices}
                onDelete={handleDeleteService}
              />
            )}
            <Stack spacing={1} direction='row'>
              <Autocomplete
                sx={{ width: '450px' }}
                id='product'
                getOptionLabel={(option) =>
                  'Id: ' + option.id + ' | ' + option.name
                }
                onChange={handleChangePet}
                value={pet}
                options={pets}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Thú cưng'
                  />
                )}
              />
              <IconButton onClick={handleAddPet} color='primary'>
                <AddCircle />
              </IconButton>
            </Stack>
            <Stack spacing={1} direction='row'>
              <Autocomplete
                sx={{ width: '450px' }}
                id='product'
                getOptionLabel={(option) =>
                  'Id: ' +
                  option.id +
                  ' | ' +
                  option.name +
                  ' | Số lượng: ' +
                  option.quantity
                }
                onChange={handleChangeProduct}
                value={product}
                options={products}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Sản phẩm'
                  />
                )}
              />
              <TextField
                label='Số lượng'
                // sx={{ width: '150px' }}
                type='number'
                value={quantity}
                onChange={handleChangeQuantity}
              />
              <IconButton onClick={handleAddProduct} color='primary'>
                <AddCircle />
              </IconButton>
            </Stack>
            <Stack spacing={1} direction='row'>
              <Autocomplete
                sx={{ width: '450px' }}
                id='product'
                getOptionLabel={(option) =>
                  'Id: ' + option.id + ' | ' + option.name
                }
                onChange={handleChangeService}
                value={service}
                options={services}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Dịch vụ'
                  />
                )}
              />
              <Autocomplete
                sx={{ width: '450px' }}
                id='employee'
                getOptionLabel={(option) =>
                  'Id: ' +
                  option.id +
                  ' | ' +
                  option.lastName +
                  ' ' +
                  option.firstName
                }
                onChange={(e, value) => setEmployee(value)}
                value={employee}
                options={
                  service?.employeeToServices
                    ? service?.employeeToServices.map((x) => x.employee)
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Nhân viên thực hiện'
                  />
                )}
              />
              <IconButton onClick={handleAddService} color='primary'>
                <AddCircle />
              </IconButton>
            </Stack>
            <Autocomplete
              id='orderType'
              getOptionLabel={(option) => option.label}
              onChange={handleChangeOrderType}
              value={orderType}
              options={orderTypes}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Kiểu đơn hàng'
                />
              )}
            />
            <Autocomplete
              id='paymentType'
              getOptionLabel={(option) => option.label}
              onChange={handleChangePaymentType}
              value={paymentType}
              options={paymentTypes}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Phương thức thanh toán'
                />
              )}
            />
            <Autocomplete
              id='province'
              getOptionLabel={(option) => option.name}
              onChange={handleChangeProvince}
              value={province}
              options={provinces}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Tỉnh, thành'
                />
              )}
            />

            <Autocomplete
              id='district'
              getOptionLabel={(option) => option.name}
              onChange={handleChangeDistrict}
              value={district}
              options={districts}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Quận, huyện'
                />
              )}
            />
            <Autocomplete
              id='commune'
              getOptionLabel={(option) => option.name}
              onChange={handleChangeCommune}
              value={commune}
              options={communes}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Phường, xã'
                />
              )}
            />
            <TextField
              required
              id='address'
              label='Địa chỉ'
              {...register('detailAddress')}
            />
            <TextField
              required
              id='phone'
              label='Số điện thoại'
              {...register('phone')}
            />
            <TextField
              required
              id='note'
              label='Ghi chú'
              {...register('note')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit'>
            Thêm
          </Button>
          <Button variant='text' onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddOrderForm;
