import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import StyleGrid from '../UI/StyleGrid/StyleGrid';

const months = [
  { id: 1, label: 'Tháng 1' },
  { id: 2, label: 'Tháng 2' },
  { id: 3, label: 'Tháng 3' },
  { id: 4, label: 'Tháng 4' },
  { id: 5, label: 'Tháng 5' },
  { id: 6, label: 'Tháng 6' },
  { id: 7, label: 'Tháng 7' },
  { id: 8, label: 'Tháng 8' },
  { id: 9, label: 'Tháng 9' },
  { id: 10, label: 'Tháng 10' },
  { id: 11, label: 'Tháng 11' },
  { id: 12, label: 'Tháng 12' },
];
const years = [
  { id: 1, label: 'Năm 2021' },
  { id: 2, label: 'Năm 2022' },
];
const TopProductQuantity = () => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const columns = [
    {
      field: 'top',
      headerName: 'Xếp hạng',
      align: 'center',
      editable: false,
      renderCell: (params) => {
        const top = params.api.getRowIndex(params.row.id) + 1;
        if (top > 3) return top;
        return (
          <Avatar
            sx={{ width: '50px', height: '50px' }}
            src={
              top === 1
                ? 'https://vndc.io/wp-content/themes/dvb/assets/images/icon/icon_gold.svg'
                : top === 2
                ? 'https://vndc.io/wp-content/themes/dvb/assets/images/icon/icon_silver.svg'
                : 'https://vndc.io/wp-content/themes/dvb/assets/images/icon/icon_bronze.svg'
            }
          />
        );
      },
    },

    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      width: 240,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction='row' alignItems='center' width='100%' spacing={2}>
            <Avatar
              sx={{ width: '50px', height: '50px' }}
              src={
                params.row.photos[0]?.url ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkH-JPzVPj5TVAyg1OIKjMRbagTYcJIegBwc7KOUlWBA6xPbSD7Za_TIk-_D5xJC3rAs8&usqp=CAU'
              }
              variant='square'
            />
            <Typography variant='body2'>{params.row.name}</Typography>
          </Stack>
        );
      },
    },

    {
      field: 'quantity',
      headerName: 'Tổng tiền bán',
      width: 120,
      editable: false,
      headerAlign: 'right',
      align: 'right',
    },

    {
      field: 'quantity',
      headerName: 'Số lượng',
      width: 120,
      editable: false,
      headerAlign: 'right',
      align: 'right',
    },
  ];
  return (
    <Card sx={{ boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px' }}>
      <CardContent>
        <Stack spacing={2}>
          {' '}
          <Typography variant='h6'>Top sản phẩm bán chạy</Typography>
          <Stack spacing={2} direction='row'>
            <Autocomplete
              value={year}
              onChange={(e, value) => {
                setYear(value);
              }}
              id='year'
              sx={{ width: '130px' }}
              getOptionLabel={(option) => option.label}
              options={years}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  size='small'
                  label='Chọn năm'
                />
              )}
            />
            <Autocomplete
              sx={{ width: '130px' }}
              value={month}
              onChange={(e, value) => {
                setMonth(value);
              }}
              id='month'
              getOptionLabel={(option) => option.label}
              options={months}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  size='small'
                  label='Chọn tháng'
                />
              )}
            />
          </Stack>
          <div style={{ height: 500, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <StyleGrid
                  columns={columns}
                  rows={data}
                  disableColumnMenu
                  disableSelectionOnClick
                  rowsPerPageOptions={[5, 25, 50]}
                />
              </div>
            </div>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
const data = [
  {
    id: 1,
    name: 'Cho alaska Đăk Lăk',
    status: 'Hết hàng',
    price: 3000000,
    quantity: 0,
    describe: 'Mô tả alaska',
    photos: [],
    categories: [],
  },
  {
    id: 2,
    name: 'Cho alaska de thuong',
    status: 'Còn hàng',
    price: 3000000,
    quantity: 1,
    describe: '',
    photos: [
      {
        id: 66,
        url: 'https://vnn-imgs-f.vgcloud.vn/2020/04/14/00/suzy-tinh-dau-quoc-dan-so-huu-khoi-tai-san-chuc-trieu-do-38.jpg',
      },
    ],
    categories: [],
  },
  {
    id: 3,
    name: 'Chó corgi mũm mĩm',
    status: 'Hết hàng',
    price: 500000,
    quantity: 0,
    describe: 'Mô tả chó corgi',
    photos: [
      {
        id: 64,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F3%2Fcho-corgi-1.jpg?alt=media&token=a8f7a9d2-086f-4cf4-91dd-7d619cec66bc',
      },
    ],
    categories: [
      { id: 1, name: 'Danh mục chó' },
      { id: 8, name: 'Chó corgi' },
    ],
  },
  {
    id: 9,
    name: 'Chó corgi dễ thương',
    status: 'Hết hàng',
    price: 30000000,
    quantity: 0,
    describe: '',
    photos: [
      {
        id: 45,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F9%2Fchi-phi-xay-phong-tro-12m2.png?alt=media&token=63602a2a-abdc-4452-908f-16b0af1679d4',
      },
      {
        id: 46,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F9%2Fnuoi-cho-alaska-co-kho-khong-tu-a-z-cach-nuoi-cho-alaska-hieu-qua-202104131446268011.jpg?alt=media&token=4c98adaa-8683-480a-abc7-dcbb1c8e405f',
      },
      {
        id: 47,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F9%2Fph%C3%B2ng%20tr%E1%BB%8D%20%C4%91%E1%BA%B9p.jpg?alt=media&token=1bf61fa0-d66c-4f23-a2f3-3bb2644de370',
      },
      {
        id: 48,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F9%2Fthiet-ke-phong-tro-12m2-co-gac-lung-can-dam-bao-nhung-dieu-gi-1.jpg?alt=media&token=c3ed79e4-dec0-4fe7-a0fa-4e78e39b86d5',
      },
      {
        id: 49,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2F9%2Fz2216753992450-eb92e4fa0fc7f15a039bf4a9ea4a0856_1607398015.jpg?alt=media&token=c73b6117-d60a-4728-b2ce-1cbba71e82c9',
      },
    ],
    categories: [],
  },
  {
    id: 10,
    name: 'Mèo Việt xịn',
    status: 'Còn hàng',
    price: 30000000,
    quantity: 1,
    describe: '',
    photos: [
      {
        id: 20,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fsaigon_backstreets.jpg?alt=media&token=af7eff44-0526-4f59-b9cc-8e3d337eac48',
      },
      {
        id: 21,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fvegan_tour_3.jpg?alt=media&token=90e206d5-7b27-4d44-9081-acc6b509e630',
      },
      {
        id: 22,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fhero-about.jpg?alt=media&token=2e59f77b-7259-4eb4-a33a-b05dce2b7b0b',
      },
    ],
    categories: [
      { id: 2, name: 'Danh mục mèo' },
      { id: 17, name: 'mèo Việtt' },
    ],
  },
  {
    id: 11,
    name: 'Chó alaska víp',
    status: 'Còn hàng',
    price: 10000000,
    quantity: 1,
    describe: '',
    photos: [
      {
        id: 68,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fnuoi-cho-alaska-co-kho-khong-tu-a-z-cach-nuoi-cho-alaska-hieu-qua-202104131446268011.jpg?alt=media&token=56c5e521-2a1a-4d03-bce4-5cb7d4ea1f82',
      },
      {
        id: 69,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=056caebe-bd60-42d0-85c3-c19aaea9b69c',
      },
    ],
    categories: [
      { id: 1, name: 'Danh mục chó' },
      { id: 6, name: 'Chó Alaska Malamute' },
    ],
  },
  {
    id: 12,
    name: 'Chó alaska víp loại 1',
    status: 'Còn hàng',
    price: 10000000,
    quantity: 1,
    describe: '',
    photos: [
      {
        id: 25,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fnuoi-cho-alaska-co-kho-khong-tu-a-z-cach-nuoi-cho-alaska-hieu-qua-202104131446268011.jpg?alt=media&token=a84bb865-5f91-4062-b1ba-43abe89e3d7c',
      },
      {
        id: 26,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=bf2b5951-157b-4aae-b4b5-77d2ec791c3f',
      },
    ],
    categories: [
      { id: 1, name: 'Danh mục chó' },
      { id: 6, name: 'Chó Alaska Malamute' },
    ],
  },
  {
    id: 13,
    name: 'Tỉa lông',
    status: 'Còn hàng',
    price: 300000,
    quantity: 9992,
    describe: '',
    photos: [
      {
        id: 27,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2Fundefinedt%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=d743c284-03f9-4e70-888f-0fd25209ce2b',
      },
    ],
    categories: [{ id: 9, name: 'Dịch vụ' }],
  },
  {
    id: 14,
    name: 'Vệ sinh toàn thân',
    status: 'Còn hàng',
    price: 1000000,
    quantity: 9999999,
    describe: 'undefined',
    photos: [
      {
        id: 70,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2Fundefinedz2216753992450-eb92e4fa0fc7f15a039bf4a9ea4a0856_1607398015.jpg?alt=media&token=f23eb314-437b-465d-8070-00e73e371b05',
      },
    ],
    categories: [{ id: 9, name: 'Dịch vụ' }],
  },
  {
    id: 15,
    name: 'Chó bull nhập khẩu',
    status: 'Còn hàng',
    price: 30000000,
    quantity: 1,
    describe: 'undefined',
    photos: [
      {
        id: 77,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2Fundefinedcho-corgi-1.jpg?alt=media&token=dbc452aa-a29c-4d3c-b1d7-554fd105c6d2',
      },
      {
        id: 78,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2Fundefinedkinh-nghiem-tim-phong-tro-gia-re-top-xx-website-t.jpg?alt=media&token=6ea0c76a-e7fd-41c1-ad42-4412fb02ce54',
      },
      {
        id: 79,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2FundefinedNguyenCaoCuong_CMND_Truoc.jpg?alt=media&token=d6a4c907-9557-4852-896d-f0b1c2530a67',
      },
      {
        id: 80,
        url: 'https://firebasestorage.googleapis.com/v0/b/doan1-343302.appspot.com/o/images%2Fproducts%2Fundefinednuoi-cho-alaska-co-kho-khong-tu-a-z-cach-nuoi-cho-alaska-hieu-qua-202104131446268011.jpg?alt=media&token=a068448a-7f19-446a-b2c9-642c202e4bf6',
      },
    ],
    categories: [
      { id: 1, name: 'Danh mục chó' },
      { id: 11, name: 'Chó bull pháp' },
    ],
  },
];
export default TopProductQuantity;
