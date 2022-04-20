import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { EmployeeContext } from '../../store/employee-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const EmployeeGrid = () => {
  const employeeCtx = useContext(EmployeeContext);
  const { searchEmployees, handleChangeEditEmployee } = employeeCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Họ',
      width: 200,
      editable: false,
    },
    {
      field: 'firstName',
      headerName: 'Tên',
      width: 200,
      editable: false,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 200,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 200,
      editable: false,
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
            <IconButton onClick={partial(handleChangeEditEmployee, params.row)}>
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
            rows={searchEmployees}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeGrid;
