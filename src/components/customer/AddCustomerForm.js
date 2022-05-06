import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { useForm } from 'react-hook-form';
import { CustomerContext } from '../../store/customer-context';
import { createCustomer } from '../../lib/api/customer';

const AddCustomerForm = () => {
  const { handleSubmit, register } = useForm();
  const customerCtx = useContext(CustomerContext);
  const { handleAddCustomer, handleCloseAdd, openAdd } = customerCtx;
  const { data, error, sendRequest, status } = useHttp(createCustomer);

  const onSubmit = (data) => {
    sendRequest({ ...data });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm khách hàng mới thành công', 'success');
        handleAddCustomer(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddCustomer, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm khách hàng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('name')}
              id='name'
              label='Họ tên'
              required
            />
            <TextField
              {...register('email')}
              id='email'
              label='Email'
              type='email'
              required
            />
            <TextField
              {...register('password')}
              id='password'
              type='password'
              required
              label='Mật khẩu'
            />

            <TextField
              {...register('phone')}
              id='phone'
              label='Số điện thoại'
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang thêm' : 'Thêm'}
          </Button>
          <Button variant='text' onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCustomerForm;
