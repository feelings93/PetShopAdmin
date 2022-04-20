import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chart from 'react-apexcharts';

const vi = {
  name: 'vi',
  options: {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    toolbar: {
      exportToSVG: 'Tải dạng SVG',
      exportToPNG: 'Tải dạng PNG',
      exportToCSV: 'Tải dạng CSV',
      menu: 'Menu',
      selection: 'Selection',
      selectionZoom: 'Selection Zoom',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      pan: 'Panning',
      reset: 'Reset Zoom',
    },
  },
};
const initChartOptions = {
  series: [
    {
      name: 'Thu nhập trong tháng',
      data: ['3000000', '10000000'],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
      id: 'hey',
      defaultLocale: 'vi',
      locales: [vi],
      toolbar: {
        export: {
          csv: {
            headerCategory: 'Năm',
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['2021', '2022'],
      // tickPlacement: "between",
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: true,
    },
  },
};

const ChartSaleMonth = () => {
  const [options, setOptions] = useState(initChartOptions.options);
  const [series, setSeries] = useState(initChartOptions.series);

  return (
    <Box
      height='100%'
      width='100%'
      sx={{
        boxShadow: 3,
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
    >
      <Chart options={options} series={series} type='bar' height='100%' />
    </Box>
  );
};

export default ChartSaleMonth;
