import React from 'react';
import Grid from '@mui/material/Grid';
import StatusList from '../components/overview/StatusList';
import ChartSaleMonth from '../components/overview/ChartSaleMonth';
import TopProductQuantity from '../components/overview/TopProductQuantity';
import TopProductSale from '../components/overview/TopProductSale';

const Overview = () => {
  return (
    <Grid container spacing={4}>
      <Grid md={6} item>
        <StatusList />
      </Grid>
      <Grid item md={6} sm={12}>
        <ChartSaleMonth />
      </Grid>
      <Grid item md={6} sm={12}>
        <TopProductQuantity />
      </Grid>
      <Grid item md={6} sm={12}>
        <TopProductSale />
      </Grid>
    </Grid>
  );
};

export default Overview;
