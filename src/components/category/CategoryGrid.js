import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { CategoryContext } from '../../store/category-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const CategoryGrid = () => {
  const categoryCtx = useContext(CategoryContext);
  const { searchCategories, handleChangeEditCategory } = categoryCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên danh mục',
      width: 200,
      editable: false,
    },
    {
      field: 'subCategories',
      headerName: 'Số lượng danh mục phụ',
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return params.row.subCategories.length;
      },
    },
    {
      field: 'products',
      headerName: 'Số sản phẩm',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.products.length;
      },
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction='row'>
            <IconButton onClick={partial(handleChangeEditCategory, params.row)}>
              <Edit color='primary' />
            </IconButton>
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
            rows={searchCategories}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
