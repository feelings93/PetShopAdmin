import React from 'react';
import Grid from '@mui/material/Grid';
import StatusCard from './StatusCard';

const StatusList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon='fa-solid fa-money-bill-transfer'
          title='Tổng thu nhập'
          count={10}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard icon='fa-solid fa-paw' title='Sản phẩm' count={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon='fa-solid fa-file-invoice'
          title='Đơn hàng'
          count={10}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard icon='fa-solid fa-user' title='Người dùng' count={10} />
      </Grid>
    </Grid>
  );
};

export default StatusList;
