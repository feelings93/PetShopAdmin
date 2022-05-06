import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';
import useHttp from '../../hooks/use-http';
import { CustomerContext } from '../../store/customer-context';
import { editCustomer } from '../../lib/api/customer';

const ActiveCustomerForm = () => {
  const { sendRequest, status, data, error } = useHttp(editCustomer);
  const customerCtx = useContext(CustomerContext);
  const { handleCloseActive, handleEditCustomer, activeCustomerObj } = customerCtx;
  const { actived } = activeCustomerObj;
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        handleCloseActive();
        swal(
          `${actived ? 'Vô hiệu' : 'Kích hoạt'} thành công!`,
          `Bạn đã ${actived ? 'vô hiệu' : 'kích hoạt'} khách hàng thành công`,
          'success'
        );
        handleEditCustomer(data);
      } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
    }
  }, [data, error, status, handleCloseActive, handleEditCustomer, activeCustomerObj, actived]);
  const activeCustomersSubmitHandler = (event) => {
    event.preventDefault();
    const request = {
      id: activeCustomerObj.id,
      actived: !actived,
    };
    sendRequest(request);
  };
  return (
    <div>
      <Dialog
        open
        onClose={handleCloseActive}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <form onSubmit={activeCustomersSubmitHandler}>
          {status === 'pending' && <LinearProgress />}
          <DialogTitle id='alert-dialog-title'>Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {!actived
                ? 'Bạn có muốn kích hoạt khách hàng này không?'
                : 'Bạn có muốn vô hiệu hóa khách hàng này không?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant='contained'
              type='submit'
              autoFocus
            >
              {status === 'pending'
                ? `Đang ${actived ? 'vô hiệu' : 'kích hoạt'}...`
                : 'Xác nhận'}
            </Button>
            <Button onClick={handleCloseActive}>Hủy</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
ActiveCustomerForm.propTypes = {
  actived: PropTypes.bool,
};
export default ActiveCustomerForm;
