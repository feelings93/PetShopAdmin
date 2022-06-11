import moment from 'moment';
import React from 'react';

import StyleGrid from '../UI/StyleGrid/StyleGrid';


const ReservationGrid = ({reservations}) => {

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'customerName',
      headerName: 'Tên khách hàng',
      width: 240,
      editable: false,
    },

    {
      field: 'phoneNumber',
      headerName: 'SĐT',
      width: 150,
      editable: false,
    },
    {
      field: 'reserveDate',
      headerName: 'Thời gian đặt',
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return moment(params.row?.reserveDate).format('HH:mm DD-MM-yyyy');
      },
    },
    {
      field: 'serviceName',
      headerName: 'Dịch vụ yêu cầu',
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return params.row?.service?.name;
      },
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyleGrid
            disableVirtualization
            columns={columns}
            rows={reservations}
            disableColumnMenu
            disableSelectionOnClick
            rowsPerPageOptions={[5, 25, 50]}
            // onRowClick={(params) => {
            //   navigate(`${params.row.id}`);
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationGrid;
