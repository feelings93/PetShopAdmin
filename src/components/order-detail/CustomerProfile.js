import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { editOrder } from '../../lib/api/order';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import provinces from '../../utils/nested-divisions.json';

const CustomerProfile = ({ order }) => {
  const { sendRequest, data, status, error } = useHttp(editOrder);
  const [edit, setEdit] = useState(false);
  const [province, setProvince] = useState(
    provinces.find((x) => x.name === order.province)
  );
  const [district, setDistrict] = useState(
    (provinces.find((x) => x.name === order.province)?.districts || []).find(
      (x) => x.name === order.district
    )
  );
  const [commune, setCommune] = useState(
    (
      (provinces.find((x) => x.name === order.province)?.districts || []).find(
        (x) => x.name === order.district
      )?.wards || []
    ).find((x) => x.name === order.commune)
  );
  const { register, handleSubmit } = useForm();

  const handleChangeProvince = (e, value) => {
    setProvince(value);
    setDistrict(null);
    setCommune(null);
  };

  const handleChangeDistrict = (e, value) => {
    setDistrict(value);
    setCommune(null);
  };

  const handleChangeCommune = (e, value) => {
    setCommune(value);
  };

  const onSubmit = (data) => {
    sendRequest({
      id: order.id,
      ...data,
      province: province.name,
      district: district.name,
      commune: commune.name,
    });
  };
  useEffect(() => {
    const showSuccessMsg = async () => {
      await swal(
        'Cập nhật thông tin người nhận thành công',
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
          title={<Typography variant='h6'>Thông tin người nhận</Typography>}
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
          <Stack spacing={2}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Tên
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={order?.customerName}
                {...register('customerName')}
                required
                fullWidth
                size='small'
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Số điện thoại
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={order?.phone}
                {...register('phone')}
                required
                fullWidth
                size='small'
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Tỉnh, thành
              </Typography>
              <Autocomplete
                disabled={!edit}
                id='province'
                getOptionLabel={(option) => option.name}
                onChange={handleChangeProvince}
                value={province}
                fullWidth
                options={provinces}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Tỉnh, thành'
                    size='small'
                    required
                  />
                )}
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Quận, huyện
              </Typography>
              <Autocomplete
                id='district'
                disabled={!edit}
                fullWidth
                getOptionLabel={(option) => option.name}
                onChange={handleChangeDistrict}
                value={district}
                options={province?.districts || []}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Quận, huyện'
                    required
                    size='small'
                  />
                )}
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Phường, xã
              </Typography>
              <Autocomplete
                id='commune'
                disabled={!edit}
                getOptionLabel={(option) => option.name}
                onChange={handleChangeCommune}
                value={commune}
                fullWidth
                options={district?.wards || []}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label='Phường, xã'
                    required
                    size='small'
                  />
                )}
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Địa chỉ
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={order?.detailAddress}
                {...register('detailAddress')}
                required
                fullWidth
                size='small'
              />
            </Stack>
            <Stack direction='row' justifyContent='space-between'>
              <Typography width='200px' variant='subtitle1'>
                Ghi chú
              </Typography>
              <TextField
                disabled={!edit}
                {...register('note')}
                fullWidth
                defaultValue={order?.note}
                size='small'
                multiline
                minRows={4}
                maxRows={8}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

CustomerProfile.propTypes = {
  order: PropTypes.shape(),
};

export default CustomerProfile;
