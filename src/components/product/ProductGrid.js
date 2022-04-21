import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// import IconButton from '@mui/material/IconButton';
// import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { ProductContext } from '../../store/product-context';
import { useNavigate } from 'react-router-dom';

const ProductGrid = () => {
  const productCtx = useContext(ProductContext);
  const { searchProducts } = productCtx;
  const navigate = useNavigate();
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
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
            <Typography>{params.row.name}</Typography>
          </Stack>
        );
      },
    },

    {
      field: 'quantity',
      headerName: 'Số lượng',
      width: 120,
      editable: false,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 100,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Tình trạng',
      width: 200,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack spacing={1}>
            <Chip
              key={params.row.category.id}
              label={params.row.category.name}
            />
          </Stack>
        );
      },
    },
    {
      field: 'subCategory',
      headerName: 'Danh mục phụ',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack spacing={1}>
            <Chip
              key={params.row.subCategory.id}
              label={params.row.subCategory.name}
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyleGrid
            columns={columns}
            rows={searchProducts}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
            onRowClick={(params) => {
              navigate(`${params.row.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
