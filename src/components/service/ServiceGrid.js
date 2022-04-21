import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../store/service-context';

const ServiceGrid = () => {
  const serviceCtx = useContext(ServiceContext);
  const { searchServices } = serviceCtx;
  const navigate = useNavigate();
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên dịch vụ',
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
      field: 'price',
      headerName: 'Giá',
      width: 100,
      editable: false,
    },

    {
      field: 'employees',
      headerName: 'Nhân viên làm',
      sortable: false,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return params.row.employeeToServices.map((x) => (
          <Stack spacing={1}>
            <Chip
              key={x.id}
              label={x.employee.lastName + ' ' + x.employee.firstName}
            />
          </Stack>
        ));
      },
    },
    {
      field: 'describe',
      headerName: 'Mô tả',
      width: 100,
      editable: false,
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyleGrid
            disableVirtualization
            columns={columns}
            rows={searchServices}
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

export default ServiceGrid;
