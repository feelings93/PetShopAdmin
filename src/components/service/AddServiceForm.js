import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';

import DropzoneImage from '../UI/Dropzone';

import { useForm } from 'react-hook-form';
import { ServiceContext } from '../../store/service-context';
import { createService } from '../../lib/api/service';
import { getEmployees } from '../../lib/api/employee';

const AddServiceForm = () => {
  const { register, handleSubmit } = useForm();
  const serviceCtx = useContext(ServiceContext);
  const { handleAddSerivce, handleCloseAdd } = serviceCtx;
  const { data, error, sendRequest, status } = useHttp(createService);
  const {
    data: dataEmployees,
    error: errorEmployees,
    sendRequest: sendEmployees,
    status: statusEmployees,
  } = useHttp(getEmployees, true);

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [files, setFiles] = React.useState([]);

  const handleChangeFiles = (files) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const onSubmit = (data) => {
    sendRequest({
      ...data,
      employees: selectedEmployees,
      files,
    });
  };

  useEffect(() => {
    sendEmployees();
  }, [sendEmployees]);

  useEffect(() => {
    if (statusEmployees === 'completed' && (!dataEmployees || errorEmployees)) {
      swal('Lỗi', 'Đã có lỗi xảy ra', 'error');
      handleCloseAdd();
    } else if (
      statusEmployees === 'completed' &&
      dataEmployees &&
      setEmployees(dataEmployees)
    ) {
    }
  }, [handleCloseAdd, statusEmployees, dataEmployees, errorEmployees]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm dịch vụ thành công', 'success');
        handleAddSerivce(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddSerivce, handleCloseAdd]);

  return (
    <Dialog maxWidth='md' open={true}>
      {status === 'pending' && <LinearProgress />}

      {statusEmployees === 'pending' ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Thêm dịch vụ</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                {...register('name')}
                required
                id='name'
                label='Tên dịch vụ'
              />

              <TextField
                {...register('price')}
                required
                type='number'
                id='price'
                label='Giá'
              />

              <Autocomplete
                multiple
                id='tags-outlined'
                options={employees}
                getOptionLabel={(option) =>
                  option.lastName + ' ' + option.firstName
                }
                value={selectedEmployees}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setSelectedEmployees(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Chọn nhân viên'
                    placeholder='Nhân viên'
                  />
                )}
              />
              <TextField
                {...register('describe')}
                required
                id='describe'
                label='Mô tả'
              />
              <Stack spacing={1}>
                <Typography variant='body2'>Chọn hình ảnh</Typography>
              </Stack>
              <DropzoneImage onChange={handleChangeFiles} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant='contained'
              type='submit'
            >
              {status === 'pending' ? 'Đang thêm...' : 'Thêm'}
            </Button>
            <Button variant='text' onClick={handleCloseAdd}>
              Hủy bỏ
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default AddServiceForm;
