import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { editCategory } from '../../lib/api/category';
import { CategoryContext } from '../../store/category-context';

const EditCategoryForm = () => {
  const categoryCtx = useContext(CategoryContext);
  const {
    editCateObj,
    handleEditCategory,
    handleCloseEdit,
    openEdit,
    categories,
  } = categoryCtx;
  const { data, error, sendRequest, status } = useHttp(editCategory);
  const [name, setName] = React.useState(editCateObj.name);
  const [parent, setParent] = React.useState(editCateObj.parent);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeParent = (e, value) => {
    setParent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ id: categoryCtx.editCateObj.id, name, parentId: parent?.id });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã chỉnh sửa danh mục  thành công', 'success');
        handleEditCategory(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditCategory, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editCateObj.id} />
            <TextField
              id='name'
              label='Tên danh mục'
              value={name}
              onChange={handleChangeName}
            />
            <Autocomplete
              id='parent'
              getOptionLabel={(option) => option.name}
              onChange={handleChangeParent}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              value={parent}
              options={categories.filter((x) => x.parent === null)}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label='Danh mục cha'
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            Cập nhật
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCategoryForm;
