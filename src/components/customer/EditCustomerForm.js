import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { useForm } from 'react-hook-form';
import { CustomerContext } from '../../store/customer-context';
import { editCustomer } from '../../lib/api/customer';

const EditCustomerForm = () => {
  const { handleSubmit, register } = useForm();
  const customerCtx = useContext(CustomerContext);
  const { editCustomerObj, handleEditCustomer, handleCloseEdit, openEdit } =
    customerCtx;
  const { data, error, sendRequest, status } = useHttp(editCustomer);

  const onSubmit = (data) => {
    sendRequest({
      id: editCustomerObj.id,
      ...data,
    });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin khách hàng thành công',
          'success'
        );
        handleEditCustomer(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditCustomer, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin khách hàng</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editCustomerObj.id} />
            <TextField
              {...register('name')}
              id='name'
              label='Họ tên'
              defaultValue={editCustomerObj.name}
            />
            <TextField
              {...register('email')}
              disabled
              id='email'
              label='Email'
              defaultValue={editCustomerObj.email}
            />
            <TextField
              {...register('phone')}
              id='phone'
              label='Số điện thoại'
              defaultValue={editCustomerObj.phone}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang lưu' : 'Xác nhận'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCustomerForm;
