import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { EmployeeContext } from '../../store/employee-context';
import { editEmployee } from '../../lib/api/employee';
import { useForm } from 'react-hook-form';

const EditEmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const employeeCtx = useContext(EmployeeContext);
  const { editEmployeeObj, handleEditEmployee, handleCloseEdit, openEdit } =
    employeeCtx;
  const { data, error, sendRequest, status } = useHttp(editEmployee);

  const [gender, setGender] = useState(editEmployeeObj.gender);

  const onSubmit = (data) =>
    sendRequest({ id: editEmployeeObj.id, ...data, gender });

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã chỉnh sửa nhân viên  thành công', 'success');
        handleEditEmployee(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditEmployee, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editEmployeeObj.id} />
            <TextField
              {...register('lastName')}
              required
              id='lastName'
              label='Họ'
              defaultValue={editEmployeeObj.lastName}
            />
            <TextField
              {...register('firstName')}
              required
              id='firstName'
              label='Tên'
              defaultValue={editEmployeeObj.firstName}
            />
            <TextField
              {...register('phone')}
              required
              id='phone'
              label='Số điện thoại'
              defaultValue={editEmployeeObj.phone}
            />
            <Autocomplete
              value={gender}
              onChange={(event, newValue) => {
                setGender(newValue);
              }}
              id='gender'
              options={['Nam', 'Nữ']}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField required {...params} label='Giới tính' />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang lưu' : 'Cập nhật'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEmployeeForm;
