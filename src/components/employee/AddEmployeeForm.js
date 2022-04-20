import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import useHttp from '../../hooks/use-http';
import { EmployeeContext } from '../../store/employee-context';
import { createEmployee } from '../../lib/api/employee';
import { useForm } from 'react-hook-form';

const AddEmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const employeeCtx = useContext(EmployeeContext);
  const { handleAddEmployee, handleCloseAdd, openAdd } = employeeCtx;
  const { data, error, sendRequest, status } = useHttp(createEmployee);
  const [gender, setGender] = useState(null);
  const onSubmit = (data) => sendRequest({ ...data, gender });

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm nhân viên mới thành công', 'success');
        handleAddEmployee(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddEmployee, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('lastName')}
              required
              id='lastName'
              label='Họ'
            />
            <TextField
              {...register('firstName')}
              required
              id='firstName'
              label='Tên'
            />
            <TextField
              {...register('phone')}
              required
              id='phone'
              label='Số điện thoại'
            />
            <Autocomplete
              value={gender}
              onChange={(event, newValue) => {
                setGender(newValue);
              }}
              id='pet-type'
              options={['Nam', 'Nữ']}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField required {...params} label='Giới tính' />
              )}
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

export default AddEmployeeForm;
