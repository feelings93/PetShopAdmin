import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { BreedContext } from '../../store/breed-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const BreedGrid = () => {
  const breedCtx = useContext(BreedContext);
  const { searchBreeds, handleChangeEditBreed } = breedCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên giống thú cưng',
      width: 200,
      editable: false,
    },
    {
      field: 'pets',
      headerName: 'Số thú cưng',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.pets.length;
      },
    },
    {
      field: 'type',
      headerName: 'Thuộc loại',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.type?.name;
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
            <IconButton onClick={partial(handleChangeEditBreed, params.row)}>
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
            rows={searchBreeds}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default BreedGrid;
