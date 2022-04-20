import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { SubCategoryContext } from '../../store/sub-category';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const SubCategoryGrid = () => {
  const subCategoryCtx = useContext(SubCategoryContext);
  const { searchSubCategories, handleChangeEditSubCategory } = subCategoryCtx;
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
      field: 'products',
      headerName: 'Số lượng sản phẩm',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.products.length;
      },
    },
    {
      field: 'category',
      headerName: 'Thuộc danh mục',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.category?.name;
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
            <IconButton
              onClick={partial(handleChangeEditSubCategory, params.row)}
            >
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
            rows={searchSubCategories}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryGrid;
