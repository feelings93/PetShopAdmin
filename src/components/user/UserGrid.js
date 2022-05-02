import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import {  Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { UserContext } from '../../store/user-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const UserGrid = () => {
  const userCtx = useContext(UserContext);
  const {
    searchUsers,
    handleChangeEditUser,
    handleChangeActiveUser,
  } = userCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Họ tên',
      valueGetter: (params) => params.row.lastName + ' ' + params.row.firstName,
      width: 200,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'SĐT',
      width: 100,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 100,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actived',
      headerName: 'Trạng thái',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.actived ? 'Đang hoạt động' : 'Ngưng hoạt động'}
            variant={params.row.actived ? 'filled' : 'outlined'}
            color={params.row.actived ? 'success' : 'warning'}
            sx={{
              color: params.row.actived ? '#fff' : 'inherit',
            }}
          />
        );
      },
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction='row'>
            <IconButton onClick={partial(handleChangeEditUser, params.row)}>
              <Edit color='primary' />
            </IconButton>
            <Switch
              checked={params.row.actived}
              onChange={handleChangeActiveUser.bind(null, params.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            {/* <IconButton onClick={partial(handleChangeDelUser, params.row)}>
              <Delete />
            </IconButton> */}
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
            rows={searchUsers}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};
export default UserGrid;
