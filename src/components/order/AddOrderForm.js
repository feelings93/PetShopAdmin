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

const AddOrderForm = () => {
  const orderCtx = useContext(OrderContext);
  const { handleAddOrder, handleCloseAdd, openAdd, products } = orderCtx;
  const { data, error, sendRequest, status } = useHttp(createOrder);

  const [customerName, setCustomerName] = React.useState('');
  const [paymentType, setPaymentType] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState('');

  const [selectedProducts, setSelectedProducts] = React.useState([]);

  const [province, setProvince] = React.useState(null);
  const [districts, setDistricts] = React.useState([]);
  const [district, setDistrict] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [note, setNote] = React.useState('');

  const handleChangeCustomerName = (e) => {
    setCustomerName(e.target.value);
  };

  const handleChangePaymentType = (e, value) => {
    setPaymentType(value);
  };

  const handleChangeProduct = (e, value) => {
    setProduct(value);
    setQuantity('');
  };

  const handleChangeProvince = (e, value) => {
    setProvince(value);
    setDistricts(value?.districts || []);
    setDistrict(null);
  };

  const handleChangeDistrict = (e, value) => {
    setDistrict(value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
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

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      customerName,
      paymentType: paymentType.label,
      products: selectedProducts,
      province: province.name,
      district: district.name,
      address,
      phone,
      note,
    });
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
      <form onSubmit={handleSubmit}>
        <DialogTitle>Thêm đơn hàng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              required
              id='name'
              label='Tên khách hàng'
              value={customerName}
              onChange={handleChangeCustomerName}
            />
            {selectedProducts.length > 0 && (
              <ProductTable
                products={selectedProducts}
                onDelete={handleDeleteProduct}
              />
            )}
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
            <TextField
              required
              id='address'
              label='Địa chỉ'
              value={address}
              onChange={handleChangeAddress}
            />
            <TextField
              required
              id='phone'
              label='Số điện thoại'
              value={phone}
              onChange={handleChangePhone}
            />
            <TextField
              required
              id='note'
              label='Ghi chú'
              value={note}
              onChange={handleChangeNote}
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
