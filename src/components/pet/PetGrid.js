import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../../store/pet-context';

const PetGrid = () => {
  const petCtx = useContext(PetContext);
  const { searchPets } = petCtx;
  const navigate = useNavigate();
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên thú cưng',
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
      field: 'gender',
      headerName: 'Giới tính',
      width: 120,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Tuổi',
      width: 120,
      editable: false,
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
      field: 'type',
      headerName: 'Loại thú cưng',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack spacing={1}>
            <Chip key={params.row.type.id} label={params.row.type.name} />
          </Stack>
        );
      },
    },
    {
      field: 'breed',
      headerName: 'Giống',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack spacing={1}>
            <Chip key={params.row.breed.id} label={params.row.breed.name} />
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
            rows={searchPets}
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

export default PetGrid;
