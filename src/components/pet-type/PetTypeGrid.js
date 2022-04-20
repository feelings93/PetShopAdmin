import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { PetTypeContext } from '../../store/pet-type-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const PetTypeGrid = () => {
  const petTypeCtx = useContext(PetTypeContext);
  const { searchPetTypes, handleChangeEditPetType } = petTypeCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên lọai thú cưng',
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
      field: 'breeds',
      headerName: 'Số giống',
      width: 200,
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return params.row.breeds.length;
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
            <IconButton onClick={partial(handleChangeEditPetType, params.row)}>
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
            rows={searchPetTypes}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default PetTypeGrid;
