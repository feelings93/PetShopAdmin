import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import useHttp from '../../hooks/use-http';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { editOrder } from '../../lib/api/order';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

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

const PaymentInfo = ({ order }) => {
  const { sendRequest, data, status, error } = useHttp(editOrder);
  const [paymentType, setPaymentType] = React.useState(
    paymentTypes.find((x) => x.label === order.paymentType)
  );

  const [edit, setEdit] = useState(false);
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    console.log({ id: order.id, paymentType: paymentType.label });
    sendRequest({ id: order.id, paymentType: paymentType.label });
  };

  const handleChangePaymentType = (e, value) => {
    setPaymentType(value);
  };
  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal(
        'Cập nhật thông tin thanh toán thành công',
        'Thành công',
        'success'
      );
      window.location.reload();
    };

    if (status === 'completed') {
      if (data) {
        showSuccessMsg();
      } else if (error) swal('Đã có lỗi xảy ra', 'Thất bại', 'error');
    }
  }, [status, data, error]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'pending' && <LinearProgress />}
      <Card variant='outlined'>
        <CardHeader
          title={<Typography variant='h6'>Thông tin thanh toán </Typography>}
          action={
            !edit ? (
              <Button
                variant='text'
                onClick={() => {
                  setEdit(true);
                }}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <Stack direction='row'>
                <Button
                  onClick={() => {
                    setEdit(false);
                  }}
                  variant='text'
                >
                  Hủy
                </Button>
                <Button type='submit' variant='contained'>
                  Lưu
                </Button>
              </Stack>
            )
          }
        />
        <Divider />
        <CardContent>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='subtitle1'>Phương thức thanh toán</Typography>

            <Autocomplete
              value={paymentType}
              onChange={handleChangePaymentType}
              disabled={!edit}
              fullWidth
              id='paymentType'
              getOptionLabel={(option) => option.label}
              options={paymentTypes}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  size='small'
                  label='Phương thức thanh toán'
                />
              )}
            />
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

PaymentInfo.propTypes = {
  order: PropTypes.shape(),
};

export default PaymentInfo;
