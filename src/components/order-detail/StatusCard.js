import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import useHttp from '../../hooks/use-http';
import { editOrder } from '../../lib/api/order';

const StatusCard = ({ order }) => {
  let variant;
  let color;
  switch (order.status) {
    case 'Chờ xử lý':
      variant = 'filled';
      color = 'default';
      break;
    case 'Đã xác nhận':
      variant = 'outlined';
      color = 'default';
      break;
    case 'Đang giao hàng':
      variant = 'outlined';
      color = 'info';
      break;
    case 'Đã giao':
      variant = 'outlined';
      color = 'success';
      break;
    case 'Đã hoàn thành':
      variant = 'filled';
      color = 'success';
      break;
    case 'Đã hủy':
      variant = 'filled';
      color = 'error';
      break;
    default:
      variant = 'filled';
      color = 'default';
      break;
  }
  const { sendRequest, data, status, error } = useHttp(editOrder);
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    sendRequest({ id: order.id, ...data });
  };
  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal('Cập nhật trạng thái thành công', 'Thành công', 'success');
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
          title={
            <Stack spacing={2} direction='row'>
              <Typography variant='h6'>Trạng thái đơn hàng</Typography>
              <Chip variant={variant} color={color} label={order?.status} />
            </Stack>
          }
          action={
            !edit ? (
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                variant='text'
              >
                Thay đổi trạng thái
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
          {edit && (
            <>
              <Typography variant='body2'>
                {`Trạng thái hiện tại là ${order?.status.toUpperCase()}. Thay đổi trạng thái thành:`}
              </Typography>
              <FormControl>
                <RadioGroup defaultValue={order?.status} row>
                  <FormControlLabel
                    value='Đã xác nhận'
                    {...register('status')}
                    control={<Radio />}
                    label='Đã xác nhận'
                  />
                  <FormControlLabel
                    {...register('status')}
                    value='Đang giao hàng'
                    control={<Radio />}
                    label='Đang giao hàng'
                  />
                  <FormControlLabel
                    {...register('status')}
                    value='Đã giao'
                    control={<Radio />}
                    label='Đã giao'
                  />
                  <FormControlLabel
                    value='Đã hoàn thành'
                    {...register('status')}
                    control={<Radio />}
                    label='Đã hoàn thành'
                  />
                  <FormControlLabel
                    {...register('status')}
                    value='Đã hủy'
                    control={<Radio />}
                    label='Đã hủy'
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </CardContent>
      </Card>
    </form>
  );
};
StatusCard.propTypes = {
  order: PropTypes.shape(),
};
export default StatusCard;
