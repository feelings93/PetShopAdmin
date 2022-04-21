import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { SubCategoryContext } from '../../store/sub-category';
import { editSubCategory } from '../../lib/api/sub-category';

const EditSubCategoryForm = () => {
  const subCategoryCtx = useContext(SubCategoryContext);
  const {
    editSubCategoryObj,
    handleEditSubCategory,
    handleCloseEdit,
    openEdit,
  } = subCategoryCtx;
  const { data, error, sendRequest, status } = useHttp(editSubCategory);
  const [name, setName] = React.useState(editSubCategoryObj.name);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ id: subCategoryCtx.editSubCategoryObj.id, name });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa danh mục phụ thành công',
          'success'
        );
        handleEditSubCategory(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditSubCategory, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chỉnh sửa danh mục phụ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              id='id'
              label='Id'
              disabled
              value={editSubCategoryObj.id}
            />
            <TextField
              required
              id='name'
              label='Tên danh mục phụ'
              value={name}
              onChange={handleChangeName}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang lưu...' : 'Cập nhật'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditSubCategoryForm;
