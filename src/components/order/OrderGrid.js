import React, { useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { OrderContext } from '../../store/order-context';
import { useNavigate } from 'react-router-dom';
const OrderGrid = () => {
  const navigate = useNavigate();
  const orderCtx = useContext(OrderContext);
  const { handleChangeEditOrder, searchOrders } = orderCtx;

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'customerName',
      headerName: 'Tên khách hàng',
      width: 200,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'SĐT',
      width: 120,
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Tổng cộng',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Tình trạng',
      renderCell: (params) => {
        let variant;
        let color;
        switch (params.row?.status) {
          case 'Chờ xử lý':
            variant = 'filled';
            color = 'default';
            break;
          case 'Đã xác nhận':
            variant = 'outlined';
            color = 'default';
            break;
          case 'Đang giao hàng':
            variant = 'outlined';
            color = 'info';
            break;
          case 'Đã giao':
            variant = 'outlined';
            color = 'success';
            break;
          case 'Đã hoàn thành':
            variant = 'filled';
            color = 'success';
            break;
          case 'Đã hủy':
            variant = 'filled';
            color = 'error';
            break;
        }
        return (
          <Chip variant={variant} color={color} label={params.row?.status} />
        );
      },
      width: 150,
      editable: false,
    },
    {
      field: 'paymentType',
      headerName: 'Phương thức thanh toán',
      width: 200,
      editable: false,
    },
    {
      field: 'paymentStatus',
      headerName: 'Tình trạng thanh toán',
      width: 200,
      editable: false,
    },
    {
      field: 'detailAddress',
      headerName: 'Địa chỉ',
      width: 100,
      editable: false,
    },
    {
      field: 'commune',
      headerName: 'Phường, xã',
      width: 120,
      editable: false,
    },
    {
      field: 'district',
      headerName: 'Quận, huyện',
      width: 140,
      editable: false,
    },
    {
      field: 'province',
      headerName: 'Tỉnh, thành',
      width: 120,
      editable: false,
    },
    {
      field: 'action',
      sortable: false,
      headerName: 'Thao tác',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <IconButton onClick={handleChangeEditOrder.bind(params.row)}>
            <Edit color='primary' />
          </IconButton>
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
            rows={searchOrders}
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

export default OrderGrid;
